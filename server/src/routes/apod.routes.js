import { Router } from "express";

import { getAPOD } from "../controllers/apod.controller.js";

const router = Router();

router.get("/", getAPOD);

export default router;
