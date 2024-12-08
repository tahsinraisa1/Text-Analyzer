import dotenv from "dotenv";
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || "";
export const googleClientId = process.env.OAUTH_CLIENT_ID || "";
export const googleClientSecret = process.env.OAUTH_CLIENT_SECRET || "";
