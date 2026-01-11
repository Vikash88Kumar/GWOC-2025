import { Testimonial } from "../models/Testimonial.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const toggleTestimonialActive = asyncHandler(async (req, res) => {
  const { id } = req.params;
   const {status}=req.body 
  const testimonial = await Testimonial.findById(id);
  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  testimonial.status=status
  testimonial.isActive = !testimonial.isActive;
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
  testimonial.isActive = !testimonial.isActive;
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
  const {
    clientName,
    role,
    company,
    message,    
    star
  } = req.body;

  if ( !clientName || !message || !star) {
    throw new ApiError(400, "Required fields are missing");
  }

  const testimonial = await Testimonial.create({
    clientName,
    role,
    company,
    message,
    star,
    status: "pending",
    isActive: false
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      testimonial,
      "Testimonial created successfully"
    )
  );
});

export const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      testimonials,
      "Testimonials fetched successfully"
    )
  );
});

   