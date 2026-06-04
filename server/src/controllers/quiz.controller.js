import QuizAttempt from "../models/quizAttempt.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/apiResponse.js";

import { ApiError } from "../utils/apiError.js";

export const saveQuizAttempt = asyncHandler(async (req, res) => {
  const { category, score, totalQuestions } = req.body;

  if (!category || score === undefined || !totalQuestions) {
    throw new ApiError(400, "All fields are required");
  }

  const percentage = Math.round((score / totalQuestions) * 100);

  const attempt = await QuizAttempt.create({
    user: req.user._id,

    category,

    score,

    totalQuestions,

    percentage,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, attempt, "Quiz attempt saved successfully"));
});

export const getQuizStats = asyncHandler(async (req, res) => {
  const attempts = await QuizAttempt.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  const totalAttempts = attempts.length;

  const totalScore = attempts.reduce((acc, item) => acc + item.score, 0);

  const totalQuestions = attempts.reduce(
    (acc, item) => acc + item.totalQuestions,
    0,
  );

  const averagePercentage =
    totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalAttempts,
        averagePercentage,
        attempts,
      },
      "Quiz stats fetched successfully",
    ),
  );
});
