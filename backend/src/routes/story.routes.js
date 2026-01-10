import { Router } from "express";
import {
  getStoryPage,
  updateStoryPage,
  updateHeroSection,
  updateTimelineSection,
  replaceMilestones,
  addMilestone,
  updateMilestoneById,
  deleteMilestoneById,
  updateMarqueeSection,
  updateTestimonialsSection,
} from "../controllers/storyPage.controller.js";

const router = Router();

// page
router.get("/", getStoryPage);
router.patch("/", updateStoryPage);

// sections
router.patch("/hero", updateHeroSection);
router.patch("/timeline", updateTimelineSection);
router.patch("/marquee", updateMarqueeSection);
router.patch("/testimonials", updateTestimonialsSection);

// milestones CRUD
router.put("/timeline/milestones", replaceMilestones); // replace all
router.post("/timeline/milestones", addMilestone); // add one
router.patch("/timeline/milestones/:id", updateMilestoneById); // update one
router.delete("/timeline/milestones/:id", deleteMilestoneById); // delete one

export default router;
