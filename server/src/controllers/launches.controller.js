import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

import { fetchLaunches } from "../services/launches.service.js";

export const getLaunches = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 10;

  const offset = Number(req.query.offset) || 0;

  const launches = await fetchLaunches(limit, offset);

  return res
    .status(200)
    .json(new ApiResponse(200, launches, "Launches fetched successfully"));
});
