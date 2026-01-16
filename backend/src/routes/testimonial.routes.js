import { Router } from "express";
import { 
    toggleTestimonialActive, 
    createTestimonial, 
    getTestimonials, 
    rejectTestimonial 
} from "../controllers/testimonial.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js"; // Import Auth Middleware

const router = Router();


router.route("/").get(getTestimonials);
router.route("/").post( createTestimonial);

router.route("/:id").patch( toggleTestimonialActive);       // Approve/Toggle
router.route("/reject/:id").patch( rejectTestimonial);      // Reject

export default router;