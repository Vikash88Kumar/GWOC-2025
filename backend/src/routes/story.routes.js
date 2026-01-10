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
} from "../controllers/story.controller.js";

const router = Router();

// page
router.route("/").get(getStoryPage);
router.route("/").patch(updateStoryPage);

// sections
router.route("/hero").patch(updateHeroSection);
router.route("/timeline").patch( updateTimelineSection);
router.route("/marquee").patch( updateMarqueeSection);
router.route("/testimonials").patch( updateTestimonialsSection);

// milestones CRUD
router.route("/timeline/milestones").put( replaceMilestones); // replace all
router.route("/timeline/milestones").post(addMilestone); // add one
router.route("/timeline/milestones/:id").patch( updateMilestoneById); // update one
router.route("/timeline/milestones/:id").delete( deleteMilestoneById); // delete one

export default router;
