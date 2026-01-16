import { AboutFounder } from "../models/Founder.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getFounderPage = asyncHandler(async (req, res) => {
  const page = await AboutFounder.findOne();

  if (!page) {
    throw new ApiError(404, "Founder page not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, page, "Founder page fetched successfully"));
});

export const updateFounderPage = asyncHandler(async (req, res) => {
  // 1. Check if a file was uploaded via Multer
  const localFilePath = req.file?.path;

  // 2. If file exists, upload to Cloudinary
  if (localFilePath) {
    const uploadedImage = await uploadOnCloudinary(localFilePath);
    
    if (uploadedImage) {
      // 3. Add the secure URL to req.body so it gets updated in DB
      // Note: Replace 'founderImage' with the exact field name in your Schema
      req.body.founderImage = uploadedImage.secure_url; 
    }
  }

  const page = await AboutFounder.findOneAndUpdate(
    {},
    { $set: req.body },
    {
      new: true,
      runValidators: true,
      upsert: true, // create if not exists
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        page,
        "Founder page created/updated successfully"
      )
    );
});

export const updateHeroSection = asyncHandler(async (req, res) => {
  const updates = {};

  // Handle text fields from req.body
  for (const [key, value] of Object.entries(req.body)) {
    updates[`hero.${key}`] = value;
  }

  // 1. Check if a file was uploaded via Multer
  const localFilePath = req.file?.path;

  // 2. If file exists, upload to Cloudinary
  if (localFilePath) {
    const uploadedImage = await uploadOnCloudinary(localFilePath);

    if (uploadedImage) {
      // 3. Add to updates object using dot notation for nested hero field
      // Note: Replace 'image' with the exact field name inside your Hero Schema
      updates["hero.profileImage"] = uploadedImage.secure_url;
    }
  }

  const page = await AboutFounder.findOneAndUpdate(
    {},
    { $set: updates },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, page.hero, "Hero section updated successfully")
    );
});

export const updateStorySection = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    updates[`story.${key}`] = value;
  }

  const page = await AboutFounder.findOneAndUpdate(
    {},
    { $set: updates }, // ✅ USE updates here
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, page.story, "Story section updated successfully")
    );
});

export const updateValuesSection = asyncHandler(async (req, res) => {
    const updates={}
  if (!Array.isArray(req.body)) {
    throw new ApiError(400, "Values must be an array");
  }
  for(const [key,value] of Object.entries(req.body)){
    updates[`values.${key}`] = value;
  }

  const page = await AboutFounder.findOneAndUpdate(
    {},
    { $set: { values: req.body } },
    { new: true, runValidators: true,upsert:true }
  );

  if (!page) {
    throw new ApiError(404, "Founder page not found");
  }

  return res    
    .status(200)
    .json(new ApiResponse(200, page.values, "Values updated successfully"));
});

export const updateMilestonesSection = asyncHandler(async (req, res) => {
    const updates={}
  if (!Array.isArray(req.body)) {
    throw new ApiError(400, "Milestones must be an array");
  }
  for(const [key,value] of Object.entries(req.body)){
    updates[`milestones.${key}`]=value
  }

  const page = await AboutFounder.findOneAndUpdate(
    {},
    { $set: { milestones: req.body } },
    { new: true, runValidators: true,upsert:true }
  );

  if (!page) {
    throw new ApiError(404, "Founder page not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, page.milestones, "Milestones updated successfully")
    );
});

export const updateConnectSection = asyncHandler(async (req, res) => {
  const updates = {};

  // Handle normal fields (headline, subHeadline, email)
  for (const [key, value] of Object.entries(req.body)) {
    if (key !== "socials") {
      updates[`connect.${key}`] = value;
    }
  }

  // Handle socials array separately (replace array safely)
  if (Array.isArray(req.body.socials)) {
    updates["connect.socials"] = req.body.socials;
  }

  const page = await AboutFounder.findOneAndUpdate(
    {},
    { $set: updates },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      page.connect,
      "Connect section updated successfully"
    )
  );
});

export const updateAwardsSection = asyncHandler(async (req, res) => {
  // Validate that the input is an array
  if (!Array.isArray(req.body)) {
    throw new ApiError(400, "Awards must be an array");
  }

  const page = await AboutFounder.findOneAndUpdate(
    {},
    { $set: { awards: req.body } }, // Replace the entire awards array
    { 
      new: true, 
      runValidators: true, 
      upsert: true 
    }
  );

  if (!page) {
    throw new ApiError(404, "Founder page not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, page.awards, "Awards updated successfully")
    );
});
