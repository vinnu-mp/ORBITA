import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

export const bookmarkNews = asyncHandler(async (req, res) => {
  const { newsId, title, image, description, source, officialUrl } = req.body;

  if (!newsId || !title) {
    throw new ApiError(400, "News data is required");
  }

  const user = await User.findById(req.user._id);

  const alreadyExists = user.bookmarkedNews.some(
    (item) => item.newsId === newsId,
  );

  if (alreadyExists) {
    throw new ApiError(400, "News already bookmarked");
  }

  user.bookmarkedNews.push({
    newsId,
    title,
    image,
    description,
    source,
    officialUrl,
  });

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, user.bookmarkedNews, "News bookmarked successfully"),
    );
});

export const removeBookmarkedNews = asyncHandler(async (req, res) => {
  const { newsId } = req.params;

  const user = await User.findById(req.user._id);

  user.bookmarkedNews = user.bookmarkedNews.filter(
    (item) => item.newsId !== newsId,
  );

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.bookmarkedNews,
        "Bookmark removed successfully",
      ),
    );
});

export const getBookmarkedNews = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("bookmarkedNews");

  return res
    .status(200)
    .json(new ApiResponse(200, user.bookmarkedNews, "Bookmarked news fetched"));
});

export const bookmarkQuestion = asyncHandler(async (req, res) => {
  const {
    questionId,
    category,
    question,
    options,
    answer,
    explanation,
    difficulty,
  } = req.body;

  const user = await User.findById(req.user._id);

  const alreadyExists = user.bookmarkedQuestions.some(
    (item) => item.questionId === questionId,
  );

  if (alreadyExists) {
    throw new ApiError(400, "Question already bookmarked");
  }

  user.bookmarkedQuestions.push({
    questionId,
    category,
    question,
    options,
    answer,
    explanation,
    difficulty,
  });

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.bookmarkedQuestions,
        "Question bookmarked successfully",
      ),
    );
});

export const getBookmarkedQuestions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("bookmarkedQuestions");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.bookmarkedQuestions,
        "Bookmarked questions fetched",
      ),
    );
});

export const removeBookmarkedQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  const user = await User.findById(req.user._id);

  user.bookmarkedQuestions = user.bookmarkedQuestions.filter(
    (item) => item.questionId !== Number(questionId),
  );

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.bookmarkedQuestions,
        "Question bookmark removed",
      ),
    );
});
