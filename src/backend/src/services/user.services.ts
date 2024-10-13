import querystring from "querystring";
import {
  doesAccessIdTokenExist,
  getIdTokenAuthStatus,
  getAccessTokenAuthStatus,
  getUserFromIdToken,
} from "../utils/user.utils";
import { HttpException } from "../utils/error.utils";
import OAUTH2_CLIENT, { OAUTH_CLIENT_ID } from "../utils/oauth_client";
import prisma from "../prisma/prisma";

export default class UserService {
  static authClientCredentials = {
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  };

  /**
   * Exchanges auth code for access, id, and refresh token
   *
   * @param code auth code
   * @param scope auth scope
   * @throws HttpException if error generating credentials
   * @returns new auth status, or error
   */
  static async loginWithCode(code: string, scope: string) {
    if (!code || !scope)
      throw new HttpException(401, "Must provide a code and scope to login");

    const data = {
      ...this.authClientCredentials,
      grant_type: "authorization_code",
      code: code,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI,
    };

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: querystring.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error || "Unknown error";
        throw new HttpException(
          401,
          `Bad token request from Google OAuth: ${errorMessage}`
        );
      }

      const auth = await response.json();
      await getUserFromIdToken(auth.id_token);

      return {
        success: true,
        refreshToken: auth.refresh_token,
        idToken: auth.id_token,
        accessToken: auth.access_token,
        expiresIn: auth.expires_in,
      };
    } catch (error) {
      throw new HttpException(401, "Bad token request");
    }
  }

  /**
   * Exchanges refresh token for access, and id token
   *
   * @param refreshToken auth refresh token
   * @throws HttpException if error generating credentials
   * @returns new auth status, or error
   */
  static async loginWithRefreshToken(refreshToken: string) {
    const data = {
      ...this.authClientCredentials,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: querystring.stringify(data),
      });

      if (!response.ok) {
        throw new HttpException(401, "Bad token request");
      }

      const auth = await response.json();

      return {
        success: true,
        idToken: auth.id_token,
        accessToken: auth.access_token,
        expiresIn: auth.expires_in,
      };
    } catch (error) {
      throw new HttpException(401, "Bad token request");
    }
  }

  /**
   * Verifies an access token
   *
   * @param accessToken auth access token
   * @param idToken auth id token
   * @param refreshToken auth refresh token
   * @throws AccessDeniedException if bad access token
   * @returns access token auth status
   */
  static async verifyAccessToken(
    accessToken: string,
    idToken: string,
    refreshToken: string
  ) {
    doesAccessIdTokenExist(accessToken, idToken, refreshToken);
    await getIdTokenAuthStatus(idToken);
    return await getAccessTokenAuthStatus(accessToken);
  }
}
