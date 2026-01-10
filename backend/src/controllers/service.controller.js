import { ServicePage } from "../models/Service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getServicePage = asyncHandler(async (req, res) => {
  const page = await ServicePage.findOne();

  if (!page) {
    throw new ApiError(404, "Service page not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, page, "Service page fetched successfully"));
});

export const updateServicePage = asyncHandler(async (req, res) => {
  const page = await ServicePage.findOneAndUpdate(
    {},
    { $set: req.body },
    { new: true, runValidators: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, page, "Service page updated successfully"));
});

export const updateServiceHero = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    updates[`hero.${key}`] = value;
  }

  const page = await ServicePage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, runValidators: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, page.hero, "Service hero updated"));
});

export const updateServicesList = asyncHandler(async (req, res) => {
  if (!Array.isArray(req.body)) {
    throw new ApiError(400, "Services must be an array");
  }

  const page = await ServicePage.findOneAndUpdate(
    {},
    { $set: { services: req.body } },
    { new: true, runValidators: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, page.services, "Services updated"));
});

export const updateServiceProcess = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    updates[`process.${key}`] = value;
  }

  const page = await ServicePage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, runValidators: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, page.process, "Process updated"));
});

export const updateServiceCTA = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    updates[`cta.${key}`] = value;
  }

  const page = await ServicePage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, runValidators: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, page.cta, "Service CTA updated"));
});
