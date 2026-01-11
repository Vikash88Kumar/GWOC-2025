import { Router } from "express";
import { 
    toggleTestimonialActive, 
    createTestimonial, 
    getTestimonials, 
    rejectTestimonial 
} from "../controllers/testimonial.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js"; // Import Auth Middleware

const router = Router();

// --- PUBLIC ROUTE ---
// Anyone can view the approved testimonials
router.route("/").get(getTestimonials);


// --- PROTECTED ROUTE (User) ---
// User must be logged in to submit a linked review
router.route("/").post( createTestimonial);


// --- PROTECTED ROUTES (Admin) ---
// Only logged-in users (ideally Admins) should access these
router.route("/:id").patch( toggleTestimonialActive);       // Approve/Toggle
router.route("/reject/:id").patch( rejectTestimonial);      // Reject

export default router;