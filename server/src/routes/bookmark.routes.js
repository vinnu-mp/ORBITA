import { Router } from "express";

import {
  bookmarkNews,
  removeBookmarkedNews,
  getBookmarkedNews,
  bookmarkQuestion,
  getBookmarkedQuestions,
  removeBookmarkedQuestion,
} from "../controllers/bookmark.controller.js";

import { verifyJWT } from "../middlewares/auth.middeware.js";

const router = Router();

router.use(verifyJWT);

router.post("/news", bookmarkNews);

router.get("/news", getBookmarkedNews);

router.delete("/news/:newsId", removeBookmarkedNews);

router.post("/question", bookmarkQuestion);

router.get("/question", getBookmarkedQuestions);

router.delete("/question/:questionId", removeBookmarkedQuestion);

export default router;
