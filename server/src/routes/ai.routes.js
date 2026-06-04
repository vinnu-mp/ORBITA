import { Router } from "express";

import { explainContent, chatWithAI } from "../controllers/ai.controller.js";

const router = Router();

router.post("/explain", explainContent);
router.post("/chat", chatWithAI);

export default router;
