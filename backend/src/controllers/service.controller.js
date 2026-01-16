import { ServicePage } from "../models/Service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// --- 1. GET Full Page ---
export const getServicePage = asyncHandler(async (req, res) => {
  const page = await ServicePage.findOne();
  return res.status(200).json(new ApiResponse(200, page || {}, "Fetched successfully"));
});

// --- 2. Update Hero Section (Text Only) ---
export const updateServiceHero = asyncHandler(async (req, res) => {
  const updates = {};
  for (const [key, value] of Object.entries(req.body)) {
    updates[`hero.${key}`] = value;
  }
  const page = await ServicePage.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
  return res.status(200).json(new ApiResponse(200, page.hero, "Hero updated"));
});

// --- 3. Update CTA Section (Text Only) ---
export const updateServiceCTA = asyncHandler(async (req, res) => {
  const updates = {};
  for (const [key, value] of Object.entries(req.body)) {
    updates[`cta.${key}`] = value;
  }
  const page = await ServicePage.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
  return res.status(200).json(new ApiResponse(200, page.cta, "CTA updated"));
});

// --- 4. Update Specific Service Item (With IMAGE) ---
export const updateServiceItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const updates = { ...req.body };

  // Parse items array if it comes as a string (FormData)
  if (updates.items && typeof updates.items === 'string') {
    try { updates.items = JSON.parse(updates.items); } catch(e) { updates.items = []; }
  }

  // Handle Image Upload
  if (req.file?.path) {
    const img = await uploadOnCloudinary(req.file.path);
    if (img) updates.image = img.url;
  }

  const page = await ServicePage.findOneAndUpdate(
    { "servicesList._id": itemId },
    {
      $set: {
        "servicesList.$.title": updates.title,
        "servicesList.$.description": updates.description,
        "servicesList.$.items": updates.items,
        ...(updates.image && { "servicesList.$.image": updates.image })
      }
    },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, page, "Item updated"));
});

// --- 5. Add New Service Item (With IMAGE) ---
export const addServiceItem = asyncHandler(async (req, res) => {
  const newItem = { ...req.body };

  if (newItem.items && typeof newItem.items === 'string') {
    try { newItem.items = JSON.parse(newItem.items); } catch(e) { newItem.items = []; }
  }

  if (req.file?.path) {
    const img = await uploadOnCloudinary(req.file.path);
    if (img) newItem.image = img.url;
  }

  const page = await ServicePage.findOneAndUpdate(
    {},
    { $push: { servicesList: newItem } },
    { new: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, page.servicesList, "Item added"));
});