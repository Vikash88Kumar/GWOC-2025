import { HomePage } from "../models/HomePage.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

// --- GET FULL PAGE ---
export const getHomePage = asyncHandler(async (req, res) => {
  let page = await HomePage.findOne();
  if (!page) {
    // Create default if not exists to prevent frontend crashes
    page = await HomePage.create({});
  }
  return res.status(200).json(new ApiResponse(200, page, "Fetched successfully"));
});

// --- GENERIC UPDATE (Backup) ---
export const updateHomePage = asyncHandler(async (req, res) => {
  const page = await HomePage.findOneAndUpdate(
    {},
    { $set: req.body },
    { new: true, upsert: true }
  );
  return res.status(200).json(new ApiResponse(200, page, "Updated successfully"));
});

// --- 1. HERO SECTION UPDATE ---
export const updateHomeHero = asyncHandler(async (req, res) => {
  const updates = {};
  // Automatically map req.body to hero.field
  for (const [key, value] of Object.entries(req.body)) {
    updates[`hero.${key}`] = value;
  }

  const page = await HomePage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, page.hero, "Hero updated"));
});

// --- 2. INTRO SECTION UPDATE ---
export const updateHomeIntro = asyncHandler(async (req, res) => {
  const updates = {};
  for (const [key, value] of Object.entries(req.body)) {
    updates[`intro.${key}`] = value;
  }

  const page = await HomePage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, page.intro, "Intro updated"));
});

// --- 3. PROJECTS SECTION UPDATE ---
export const updateHomeProjects = asyncHandler(async (req, res) => {
  const updates = {};

  // Separate normal fields from the items array
  for (const [key, value] of Object.entries(req.body)) {
    if (key !== "items") {
      updates[`projects.${key}`] = value;
    }
  }

  // If items array is present, replace it entirely
  if (Array.isArray(req.body.items)) {
    updates["projects.items"] = req.body.items;
  }

  const page = await HomePage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, page.projects, "Projects updated"));
});

// --- 4. STATS SECTION UPDATE ---
export const updateHomeStats = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    if (key !== "items") {
      updates[`stats.${key}`] = value;
    }
  }

  if (Array.isArray(req.body.items)) {
    updates["stats.items"] = req.body.items;
  }

  const page = await HomePage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, page.stats, "Stats updated"));
});

// --- 5. FOOTER / MARQUEE UPDATE ---
export const updateHomeFooter = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    if (key !== "marqueeImages") {
      updates[`footer.${key}`] = value;
    }
  }

  // Handle marquee images array
  if (Array.isArray(req.body.marqueeImages)) {
    updates["footer.marqueeImages"] = req.body.marqueeImages;
  }

  const page = await HomePage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, page.footer, "Footer updated"));
});