import { Response } from "express";
import { AccessDeniedException } from "./error.utils";
import { verifyAccessToken, verifyIdToken } from "./tokens.utils";
import { Prisma } from "@prisma/client";
import OAUTH2_CLIENT, { OAUTH_CLIENT_ID } from "./oauth_client";
import prisma from "../prisma/prisma";
import { userQueryArgs } from "../prisma-query-args/user.query-args";

const COOKIE_SETTINGS = JSON.parse(process.env.COOKIE_SETTINGS || null) || {
  httpOnly: true,
  secure: false,
  sameSite: "none",
  path: "/",
};

/**
 * Creates a cookie
 *
 * @param res Express Response
 * @param cookieName the cookie name
 * @param cookieValue the value of the cookie
 * @param maxAge the max age of the cookie in ms
 */
export const createCookie = (
  res: Response,
  cookieName: string,
  cookieValue: string,
  maxAge: number
) => {
  res.cookie(cookieName, cookieValue, {
    ...COOKIE_SETTINGS,
    maxAge,
  });
};

/**
 * Checks if user access and id token exist
 *
 * @param accessToken auth access token
 * @param idToken auth id token
 * @param refreshToken auth refresh token
 * @throws AccessDeniedException if no access or id token
 */
export const doesAccessIdTokenExist = (
  accessToken: string,
  idToken: string,
  refreshToken: string
) => {
  if (!accessToken || !idToken) {
    throw new AccessDeniedException(
      401,
      `Invalid access token or id token${
        refreshToken ? ". Retry with refresh token" : ""
      }`,
      refreshToken ? true : false
    );
  }
};

/**
 * Gets the auth status of a user's id token
 *
 * @param idToken auth id token
 * @throws AccessDeniedException if bad id token
 */
export const getIdTokenAuthStatus = async (idToken: string) => {
  await verifyIdToken(idToken);
};

/**
 * Gets the auth status of a user's access token
 *
 * @param accessToken auth access token
 * @param userId a user id to verify against the access token
 * @throws AccessDeniedException if bad access token
 * @returns status of the access token
 */
export const getAccessTokenAuthStatus = async (
  accessToken: string,
  userId?: string
) => {
  const accessTokenStatus = await verifyAccessToken(accessToken);

  if (userId && accessTokenStatus.id !== userId)
    throw new AccessDeniedException(401, "Unauthorized", false);

  return accessTokenStatus;
};

/**
 * Given an id token, validates it and returns the user
 *
 * @param idToken an oauth id token
 * @returns a user object
 */
export const getUserFromIdToken = async (
  idToken: string
): Promise<Prisma.UserGetPayload<typeof userQueryArgs>> => {
  const ticket = await OAUTH2_CLIENT.verifyIdToken({
    idToken: idToken,
    audience: OAUTH_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const googleId = payload["sub"];

  // Return an existing user
  const user = await prisma.user.findUnique({
    where: { googleId },
    ...userQueryArgs,
  });
  if (user) return user;

  // Generate a new user
  const newUser = await prisma.user.create({
    data: {
      googleId,
      name: payload.name,
      email: payload.email,
    },
    ...userQueryArgs,
  });
  return newUser;
};
