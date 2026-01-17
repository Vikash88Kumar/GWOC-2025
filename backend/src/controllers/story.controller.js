import { StoryPage } from "../models/story.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // Import your cloudinary utility

// ... getStoryPage and updateStoryPage remain the same ...

/**
 * Update HERO section (Supports Image Upload)
 * PATCH /api/story/hero
 */
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

// ... The rest of your controllers (updateTimelineSection, etc.) remain the same ...