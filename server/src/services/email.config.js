import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);
