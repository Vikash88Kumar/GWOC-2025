import { Router } from "express";
import { 
    toggleTestimonialActive, 
    createTestimonial, 
    getTestimonials, 
    rejectTestimonial 
} from "../controllers/testimonial.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js"; 

const router = Router();

// Public route (anyone can read reviews)
router.route("/").get(getTestimonials);

// Protected route (Only logged-in users can create)
// 👇 ADD verifyJwt HERE
router.route("/").post(verifyJwt, createTestimonial);

// Admin routes (Should also be protected!)
router.route("/:id").patch(verifyJwt, toggleTestimonialActive);      
router.route("/reject/:id").patch(verifyJwt, rejectTestimonial);     

export default router;