import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"; // Import multer
import { 
    getStoryPage, 
    updateHeroSection,
    // ... imports 
} from "../controllers/story.controller.js";

const router = Router();

router.route("/").get(getStoryPage);

// ✅ KEY CHANGE: Add upload.single('heroImage')
// The string 'heroImage' matches the formData.append('heroImage', file) from your frontend
router.route("/hero").patch(
    upload.single("heroImage"), 
    updateHeroSection
);

// ... other routes
export default router;