import { HomePage } from "../models/homepage.model.js"; // Adjust path
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// --- GET PAGE ---
export const getHomePage = asyncHandler(async (req, res) => {
  const page = await HomePage.findOne();
  return res.status(200).json(new ApiResponse(200, page || {}, "Home page fetched"));
});

// --- GENERAL FULL PAGE UPDATE (Added) ---
// Use this for bulk JSON updates (without file uploads)
export const updateHomePage = asyncHandler(async (req, res) => {
  const page = await HomePage.findOneAndUpdate(
    {},
    { $set: req.body },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, page, "Home page updated successfully"));
});

// --- 1. HERO SECTION (Multi-Image Logic) ---
export const updateHomeHero = asyncHandler(async (req, res) => {
  const updates = {};
  let backgroundImages = [];

  // 1. Handle existing text fields
  for (const [key, value] of Object.entries(req.body)) {
    if (key === 'backgroundImage') {
        // Parse the comma-separated string back into an array
        // This array represents the images the User KEPT in the UI
        if (typeof value === 'string') {
            backgroundImages = value.split(',').map(s => s.trim()).filter(Boolean);
        } else if (Array.isArray(value)) {
            backgroundImages = value;
        }
    } else {
        updates[`hero.${key}`] = value;
    }
  }

  // 2. Handle New File Upload
  if (req.file?.path) {
    const img = await uploadOnCloudinary(req.file.path);
    if (img) {
        // Add the NEW image to the array of KEPT images
        backgroundImages.push(img.url);
    }
  }

  // 3. Set the updated array in the DB
  // We use $set here instead of $push so that deletions are respected
  updates["hero.backgroundImage"] = backgroundImages;

  const page = await HomePage.findOneAndUpdate(
    {}, 
    { $set: updates }, 
    { new: true, upsert: true }
  );
  
  return res.status(200).json(new ApiResponse(200, page.hero, "Hero updated"));
});

// --- 2. INTRO (Text Only) ---
export const updateHomeIntro = asyncHandler(async (req, res) => {
  const updates = {};
  for (const [key, value] of Object.entries(req.body)) {
    updates[`intro.${key}`] = value;
  }
  const page = await HomePage.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
  return res.status(200).json(new ApiResponse(200, page.intro, "Intro updated"));
});

// --- 3. PROJECTS (Individual Item Logic) ---

// Update a Specific Project
export const updateHomeProjectItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const updates = { ...req.body };

    if (req.file?.path) {
        const img = await uploadOnCloudinary(req.file.path);
        if (img) updates.image = img.url;
    }

    const page = await HomePage.findOneAndUpdate(
        { "projects.items._id": itemId },
        {
            $set: {
                "projects.items.$.title": updates.title,
                "projects.items.$.subtitle": updates.subtitle,
                "projects.items.$.order": updates.order,
                ...(updates.image && { "projects.items.$.image": updates.image })
            }
        },
        { new: true }
    );
    return res.status(200).json(new ApiResponse(200, page.projects, "Project updated"));
});

// Add a New Project
export const addHomeProjectItem = asyncHandler(async (req, res) => {
    const newItem = { ...req.body };

    if (req.file?.path) {
        const img = await uploadOnCloudinary(req.file.path);
        if (img) newItem.image = img.url;
    }

    const page = await HomePage.findOneAndUpdate(
        {},
        { $push: { "projects.items": newItem } },
        { new: true, upsert: true }
    );
    return res.status(200).json(new ApiResponse(200, page.projects, "Project added"));
});

// Update Project Meta (Heading/Subheading)
export const updateHomeProjectsMeta = asyncHandler(async (req, res) => {
    const updates = {};
    if(req.body.heading) updates["projects.heading"] = req.body.heading;
    if(req.body.subHeading) updates["projects.subHeading"] = req.body.subHeading;

    const page = await HomePage.findOneAndUpdate({}, { $set: updates }, { new: true });
    return res.status(200).json(new ApiResponse(200, page.projects, "Projects meta updated"));
});

// --- 4. STATS ---
export const updateHomeStats = asyncHandler(async (req, res) => {
  // Stats are usually small text only, keeping array update for simplicity
  const page = await HomePage.findOneAndUpdate(
    {}, 
    { $set: { stats: req.body } }, 
    { new: true, upsert: true }
  );
  return res.status(200).json(new ApiResponse(200, page.stats, "Stats updated"));
});

// --- 5. CLIENTS (New Section) ---
export const updateHomeClients = asyncHandler(async (req, res) => {
    const updates = {};
    if(req.body.heading) updates["clients.heading"] = req.body.heading;
    
    // If uploading a logo, append to logos array
    if (req.file?.path) {
        const img = await uploadOnCloudinary(req.file.path);
        if (img) {
            await HomePage.findOneAndUpdate({}, { $push: { "clients.logos": img.url } });
        }
    }

    const page = await HomePage.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
    return res.status(200).json(new ApiResponse(200, page.clients, "Clients section updated"));
});

// --- 6. FOOTER ---
export const updateHomeFooter = asyncHandler(async (req, res) => {
    const page = await HomePage.findOneAndUpdate({}, { $set: { footer: req.body } }, { new: true, upsert: true });
    return res.status(200).json(new ApiResponse(200, page.footer, "Footer updated"));
});