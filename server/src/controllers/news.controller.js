import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

import { fetchLatestNews, fetchIndiaNews } from "../services/news.service.js";

export const getLatestNews = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 12;
  const offset = Number(req.query.offset) || 0;

  const news = await fetchLatestNews(limit, offset);

  return res
    .status(200)
    .json(new ApiResponse(200, news, "Latest news fetched successfully"));
});

export const getIndiaNews = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 12;
  const offset = Number(req.query.offset) || 0;
  const news = await fetchIndiaNews();

  return res
    .status(200)
    .json(new ApiResponse(200, news, "India news fetched successfully"));
});
