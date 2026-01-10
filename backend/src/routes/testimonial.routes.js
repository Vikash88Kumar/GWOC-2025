import {Router } from "express"
import {toggleTestimonialActive,createTestimonial,getAllTestimonials} from "../controllers/testimonial.controller.js"
const router=Router()

router.route("/").get(getAllTestimonials)
router.route("/").post(createTestimonial)
router.route("/:id").patch(toggleTestimonialActive)

export default router