import { Router } from "express";

import {
  saveQuizAttempt,
  getQuizStats,
} from "../controllers/quiz.controller.js";

import { verifyJWT } from "../middlewares/auth.middeware.js";

const router = Router();

router.post("/attempt", verifyJWT, saveQuizAttempt);

router.get("/stats", verifyJWT, getQuizStats);

export default router;
