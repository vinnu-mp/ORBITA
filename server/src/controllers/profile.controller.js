import User from "../models/user.model.js";

import QuizAttempt from "../models/quizAttempt.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/apiResponse.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "username fullname email createdAt bookmarkedNews bookmarkedQuestions",
  );

  const attempts = await QuizAttempt.find({
    user: req.user._id,
  });

  const quizzesAttempted = attempts.length;

  const totalScore = attempts.reduce((acc, item) => acc + item.score, 0);

  const totalQuestions = attempts.reduce(
    (acc, item) => acc + item.totalQuestions,
    0,
  );

  const averageScore =
    totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  const profileData = {
    user: {
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      createdAt: user.createdAt,
    },

    stats: {
      quizzesAttempted,

      averageScore,

      bookmarkedNewsCount: user.bookmarkedNews.length,

      bookmarkedQuestionsCount: user.bookmarkedQuestions.length,
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(200, profileData, "Profile fetched successfully"));
});
