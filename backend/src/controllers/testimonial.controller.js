import { Testimonial } from "../models/Testimonial.model.js"; // Ensure filename casing matches your file
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// --- 1. TOGGLE ACTIVE STATUS ---
export const toggleTestimonialActive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const testimonial = await Testimonial.findById(id);

  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  // Logic: If we make it active, it must be approved. 
  // If we make it inactive, we just hide it (status can stay approved or go pending).
  testimonial.isActive = !testimonial.isActive;
  
  if (testimonial.isActive) {
      testimonial.status = "approved";
  }

  await testimonial.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      testimonial,
      `Testimonial is now ${testimonial.isActive ? "active" : "inactive"}`
    )
  );
});

// --- 2. REJECT TESTIMONIAL ---
export const rejectTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id);
  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  testimonial.status = "rejected";
  testimonial.isActive = false; // FIX: Passed as Boolean, not string "false"
  await testimonial.save();

  return res.status(200).json(
    new ApiResponse(200, testimonial, "Testimonial rejected successfully")
  );
});

// --- 3. CREATE TESTIMONIAL (Client/User Side) ---
export const createTestimonial = asyncHandler(async (req, res) => {
  // We only expect these 3 fields from the frontend now
  const { role, message, star } = req.body;

  if (!req.user?._id) {
      throw new ApiError(401, "You must be logged in to submit a review");
  }

  const newTestimonial = await Testimonial.create({
    user: req.user._id, // Link to the logged-in user
    role: role || "User", // Use provided role or default
    message,
    star,
    status: "pending", // Default to pending approval
    isActive: false
  });

  return res.status(201).json(
    new ApiResponse(201, newTestimonial, "Review submitted successfully")
  );
});

export const getTestimonials = asyncHandler(async (req, res) => {
  // Fetch all. Optional: Add { isActive: true } inside find() to hide rejected/pending ones.
  const testimonials = await Testimonial.find()
    .populate("user", "firstName lastName avatar companyName") // <--- The JOIN
    .sort({ order: 1, createdAt: -1 });

  // Transform data to flatten the structure
  const formattedTestimonials = testimonials.map((t) => {
    const userData = t.user || {}; // Handle missing users (Anonymous)

    return {
      _id: t._id,
      clientName: userData.firstName 
        ? `${userData.firstName} ${userData.lastName || ""}`.trim() 
        : "Anonymous User",
      avatar: userData.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      company: userData.companyName || "", // From User table
      role: t.role,    // From Testimonial table
      message: t.message,
      star: t.star,
      status: t.status,
      isActive: t.isActive,
      createdAt: t.createdAt
    };
  });

  return res.status(200).json(
    new ApiResponse(200, formattedTestimonials, "All testimonials fetched successfully")
  );
});