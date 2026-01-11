import { Router } from "express";
import { 
    getHomePage, 
    updateHomePage, 
    updateHomeHero, 
    updateHomeIntro, 
    updateHomeProjects, 
    updateHomeStats, 
    updateHomeFooter 
} from "../controllers/homepage.controller.js";

const router = Router();

router.route("/").get(getHomePage).patch(updateHomePage); // Base endpoints

// Specific Section Endpoints
router.route("/hero").patch(updateHomeHero);
router.route("/intro").patch(updateHomeIntro);
router.route("/projects").patch(updateHomeProjects);
router.route("/stats").patch(updateHomeStats);
router.route("/footer").patch(updateHomeFooter);

export default router;