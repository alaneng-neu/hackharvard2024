import { OAuth2Client } from "google-auth-library";
import { HttpException } from "./error.utils";

export const OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
if (!OAUTH_CLIENT_ID) throw new HttpException(500, "No OAuth client ID found");

const OAUTH2_CLIENT = new OAuth2Client(OAUTH_CLIENT_ID);
export default OAUTH2_CLIENT;
