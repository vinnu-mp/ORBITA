import axios from "axios";
import { BREVO_API_KEY, BREVO_API_URL } from "./email.config.js";
import verificationEmailTemplate from "../templates/verificationEmailTemplate.js";
import welcomeEmailTemplate from "../templates/welcomeEmailTemplate.js";

export const sendVerificationEmail = async (email, username, otp) => {
  try {
    await axios.post(
      BREVO_API_URL,
      {
        sender: { name: "Orbita", email: "orbita2277@gmail.com" },
        to: [{ email }],
        subject: "Verify Your Orbita Account",
        htmlContent: verificationEmailTemplate(username, otp),
      },
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  try {
    await axios.post(
      BREVO_API_URL,
      {
        sender: { name: "Orbita", email: "orbita2277@gmail.com" },
        to: [{ email }],
        subject: "Welcome to Orbita!",
        htmlContent: welcomeEmailTemplate(username),
      },
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
