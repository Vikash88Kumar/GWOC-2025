import { StoryPage } from "../models/story.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

/**
 * GET full story page
 * GET /api/story
 */
export const getStoryPage = asyncHandler(async (req, res) => {
  const page = await StoryPage.findOne();

  if (!page) {
    throw new ApiError(404, "Story page not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, page, "Story page fetched successfully"));
});

/**
 * Create/Update full story page (upsert)
 * PATCH /api/story
 */
export const updateStoryPage = asyncHandler(async (req, res) => {
  const page = await StoryPage.findOneAndUpdate(
    {},
    { $set: req.body },
    { new: true, runValidators: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, page, "Story page created/updated successfully"));
});

/**
 * Update only HERO section
 * PATCH /api/story/hero
 */


/**
 * Update TIMELINE section meta (eyebrow, heading, anchorId)
 * Does NOT replace milestones array (use milestones endpoints below)
 * PATCH /api/story/timeline
 */
export const updateTimelineSection = asyncHandler(async (req, res) => {
  const allowedKeys = ["eyebrow", "heading", "anchorId"];
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    if (!allowedKeys.includes(key)) continue;
    updates[`timeline.${key}`] = value;
  }

  const page = await StoryPage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, runValidators: true, upsert: true }
  );

  return res.status(200).json(
    new ApiResponse(200, page.timeline, "Timeline section updated successfully")
  );
});

/**
 * Replace ALL milestones array (admin bulk edit)
 * PUT /api/story/timeline/milestones
 * Body must be array
 */
export const replaceMilestones = asyncHandler(async (req, res) => {
  if (!Array.isArray(req.body)) {
    throw new ApiError(400, "Milestones must be an array");
  }

  const page = await StoryPage.findOneAndUpdate(
    {},
    { $set: { "timeline.milestones": req.body } },
    { new: true, runValidators: true, upsert: true }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      page.timeline.milestones,
      "Milestones replaced successfully"
    )
  );
});

/**
 * Add ONE milestone (push)
 * POST /api/story/timeline/milestones
 */
export const addMilestone = asyncHandler(async (req, res) => {
  const { year, title, description, iconKey, highlight, order, isActive } =
    req.body || {};

  if (!year || !title || !description) {
    throw new ApiError(400, "year, title, and description are required");
  }

  const newMilestone = {
    year,
    title,
    description,
    iconKey: iconKey || "Rocket",
    highlight: highlight || "butter",
    order: typeof order === "number" ? order : 0,
    isActive: typeof isActive === "boolean" ? isActive : true,
  };

  const page = await StoryPage.findOneAndUpdate(
    {},
    { $push: { "timeline.milestones": newMilestone } },
    { new: true, runValidators: true, upsert: true }
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      page.timeline.milestones,
      "Milestone added successfully"
    )
  );
});

/**
 * Update ONE milestone by _id
 * PATCH /api/story/timeline/milestones/:id
 */
export const updateMilestoneById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const allowedKeys = [
    "year",
    "title",
    "description",
    "iconKey",
    "highlight",
    "order",
    "isActive",
  ];

  const updates = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (!allowedKeys.includes(key)) continue;
    updates[`timeline.milestones.$[m].${key}`] = value;
  }

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No valid fields to update");
  }

  const page = await StoryPage.findOneAndUpdate(
    {},
    { $set: updates },
    {
      new: true,
      runValidators: true,
      arrayFilters: [{ "m._id": id }],
    }
  );

  if (!page) throw new ApiError(404, "Story page not found");

  return res.status(200).json(
    new ApiResponse(
      200,
      page.timeline.milestones,
      "Milestone updated successfully"
    )
  );
});

/**
 * Delete ONE milestone by _id
 * DELETE /api/story/timeline/milestones/:id
 */
export const deleteMilestoneById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const page = await StoryPage.findOneAndUpdate(
    {},
    { $pull: { "timeline.milestones": { _id: id } } },
    { new: true, runValidators: true }
  );

  if (!page) throw new ApiError(404, "Story page not found");

  return res.status(200).json(
    new ApiResponse(
      200,
      page.timeline.milestones,
      "Milestone deleted successfully"
    )
  );
});

/**
 * Update MARQUEE section (images array + enabled + heading)
 * PATCH /api/story/marquee
 */
export const updateMarqueeSection = asyncHandler(async (req, res) => {
  const updates = {};

  // normal keys
  for (const [key, value] of Object.entries(req.body)) {
    if (key !== "images") {
      updates[`marquee.${key}`] = value;
    }
  }

  // replace images array safely
  if (Array.isArray(req.body.images)) {
    updates["marquee.images"] = req.body.images;
  }

  const page = await StoryPage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, runValidators: true, upsert: true }
  );

  return res.status(200).json(
    new ApiResponse(200, page.marquee, "Marquee section updated successfully")
  );
});

/**
 * Update TESTIMONIALS section (toggle + heading + items array)
 * PATCH /api/story/testimonials
 */
export const updateTestimonialsSection = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    if (key !== "items") {
      updates[`testimonials.${key}`] = value;
    }
  }

  if (Array.isArray(req.body.items)) {
    updates["testimonials.items"] = req.body.items;
  }

  const page = await StoryPage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, runValidators: true, upsert: true }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      page.testimonials,
      "Testimonials section updated successfully"
    )
  );
});


export const updateHeroSection = asyncHandler(async (req, res) => {
  const updates = {};

  // 1. Handle Image Upload
  // If a file was sent, upload it to Cloudinary
  if (req.file) {
    const heroImageLocalPath = req.file.path;
    const heroImage = await uploadOnCloudinary(heroImageLocalPath);
    
    if (heroImage?.url) {
      updates["hero.image"] = heroImage.url;
    }
  }

  // 2. Handle Text Fields
  // When using FormData, objects/arrays arrive as JSON strings. We must parse them.
  
  if (req.body.miniTag) updates["hero.miniTag"] = req.body.miniTag;
  if (req.body.subtitle) updates["hero.subtitle"] = req.body.subtitle;

  // Parse 'titleLines' (Array)
  if (req.body.titleLines) {
    try {
      updates["hero.titleLines"] = JSON.parse(req.body.titleLines);
    } catch (e) {
      // If it's already an array or simple string, handle gracefully
      updates["hero.titleLines"] = req.body.titleLines; 
    }
  }

  // Parse 'ctas' (Object)
  if (req.body.ctas) {
    try {
      updates["hero.ctas"] = JSON.parse(req.body.ctas);
    } catch (e) {
      updates["hero.ctas"] = req.body.ctas;
    }
  }

  // 3. Update Database
  const page = await StoryPage.findOneAndUpdate(
    {},
    { $set: updates },
    { new: true, runValidators: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, page.hero, "Hero section updated successfully"));
});