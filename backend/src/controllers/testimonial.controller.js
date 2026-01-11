import { Testimonial } from "../models/Testimonial.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const toggleTestimonialActive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const testimonial = await Testimonial.findById(id);
  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }
  testimonial.status==="rejected"? testimonial.status="approved": testimonial.status="rejected"
  testimonial.isActive =  !testimonial.isActive;
  await testimonial.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      testimonial,
      `Testimonial is now ${testimonial.isActive ? "active" : "inactive"}`
    )
  );
});

export const rejectTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
    
  const testimonial = await Testimonial.findById(id);
  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  testimonial.status="rejected"
  testimonial.isActive = "false";
  await testimonial.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      testimonial,
      `Testimonial is now ${testimonial.isActive ? "active" : "inactive"}`
    )
  );
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const { clientName, role, company, message, star } = req.body;

  const newTestimonial = await Testimonial.create({
    user: req.user?._id, // Save the User ID if they are logged in
    clientName: clientName || req.user?.fullName, // Use input or fallback to User profile
    role,
    company: company || req.user?.companyName,
    message,
    star
  });

  return res.status(201).json(
    new ApiResponse(201, newTestimonial, "Review submitted successfully")
  );
});

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find()
    .populate("user", "fullName avatar companyName") // <--- THE JOIN
    .sort({ order: 1, createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, testimonials, "Fetched successfully")
  );
});

   