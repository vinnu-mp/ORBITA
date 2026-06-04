import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middeware.js";
import {
  refreshAccessToken,
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, getCurrentUser);
router.post("/verify-email", verifyEmail);

export default router;
