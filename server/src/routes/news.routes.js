import { Router } from "express";

import { getLatestNews, getIndiaNews } from "../controllers/news.controller.js";

const router = Router();

router.get("/latest", getLatestNews);

router.get("/india", getIndiaNews);

export default router;
