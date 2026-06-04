import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

import { fetchAPOD } from "../services/apod.service.js";

export const getAPOD = asyncHandler(async (_, res) => {
  const apod = await fetchAPOD();

  return res
    .status(200)
    .json(new ApiResponse(200, apod, "APOD fetched successfully"));
});
