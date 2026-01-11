import {Router } from "express"
import {toggleTestimonialActive,createTestimonial,getAllTestimonials, rejectTestimonial} from "../controllers/testimonial.controller.js"
const router=Router()

router.route("/").get(getAllTestimonials)
router.route("/").post(createTestimonial)
router.route("/:id").patch(toggleTestimonialActive)
router.route("/reject/:id").patch(rejectTestimonial)

export default router