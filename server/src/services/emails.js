import { transporter } from "./email.config.js";
import verificationEmailTemplate from "../templates/verificationEmailTemplate.js";
import welcomeEmailTemplate from "../templates/welcomeEmailTemplate.js";

export const sendVerificationEmail = async (email, username, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Orbita Account",
      html: verificationEmailTemplate(username, otp),
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Orbita!",
      html: welcomeEmailTemplate(username),
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
