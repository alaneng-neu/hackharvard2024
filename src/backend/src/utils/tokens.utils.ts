import { AccessDeniedException } from "../utils/error.utils";
import OAUTH2_CLIENT, { OAUTH_CLIENT_ID } from "./oauth_client";

/**
 * Verifies an access token
 *
 * @param accessToken google access token to be verified
 * @throws AccessDeniedException if bad access token
 * @returns status of the access token
 */
export async function verifyAccessToken(accessToken: string) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
  );

  if (!response.ok) {
    throw new AccessDeniedException(
      401,
      "Unauthenticated access token or id token. Retry with refresh token",
      true
    );
  }

  const data = await response.json();
  if (data?.code === 401 && data?.status === "UNAUTHENTICATED") {
    throw new AccessDeniedException(
      401,
      "Unauthenticated access token or id token. Retry with refresh token",
      true
    );
  }

  return data;
}

/**
 * Verifies an id token
 *
 * @param idToken google id token to be verified
 * @throws AccessDeniedException if bad id token
 */
export async function verifyIdToken(idToken: string) {
  try {
    const ticket = await OAUTH2_CLIENT.verifyIdToken({
      idToken: idToken,
      audience: OAUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (payload.aud !== OAUTH_CLIENT_ID)
      throw new AccessDeniedException(401, "Bad ID token: bad audience", true);
  } catch (error) {
    if (error?.status == 401) throw error;

    throw new AccessDeniedException(500, "Could not verify id token", true);
  }
}
