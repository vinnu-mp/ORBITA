import { Router } from "express";

import { getLaunches } from "../controllers/launches.controller.js";

const router = Router();

router.get("/", getLaunches);

export default router;
