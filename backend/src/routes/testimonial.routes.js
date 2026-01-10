import {Router } from "express"
import {toggleTestimonialActive} from "../controllers/testimonial.controller.js"
const router=Router()

router.route("/").patch(toggleTestimonialActive)