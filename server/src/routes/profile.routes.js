import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middeware.js";

import { getProfile } from "../controllers/profile.controller.js";

const router = Router();

router.get("/", verifyJWT, getProfile);

export default router;
