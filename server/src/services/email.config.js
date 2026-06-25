import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const BREVO_API_KEY = process.env.BREVO_API_KEY;
export const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
