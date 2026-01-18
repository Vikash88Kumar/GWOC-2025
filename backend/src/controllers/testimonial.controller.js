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
  // 1. We ONLY extract role, message, star from frontend input
  const { role, message, star } = req.body;

  // 2. We verify the user is logged in (middleware should handle this usually)
  if (!req.user?._id) {
      throw new ApiError(401, "You must be logged in to submit a review");
  }

  // 3. We create the record linking the Logged In User
  const newTestimonial = await Testimonial.create({
    user: req.user._id, // <--- Link to the User ID from Token/Session
    role: role || "Client", // Fallback if user didn't provide role
    message,
    star: star || 5,
    status: "pending", 
    isActive: false
  });

  return res.status(201).json(
    new ApiResponse(201, newTestimonial, "Review submitted successfully")
  );
});

// --- GET TESTIMONIALS ---
export const getTestimonials = asyncHandler(async (req, res) => {
  // Fetch and Populate User details
  const testimonials = await Testimonial.find()
    .populate("user", "firstName lastName avatar companyName") 
    .sort({ createdAt: -1 });

  // Format data so Frontend gets a clean structure
  const formattedTestimonials = testimonials.map((t) => {
    const userData = t.user || {}; 

    return {  
      _id: t._id,
      // Create Full Name from User Table
      clientName: userData.firstName 
        ? `${userData.firstName} ${userData.lastName || ""}`.trim() 
        : "Anonymous User",
      avatar: userData.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      // Company comes from User Table
      company: userData.companyName || "", 
      // Role comes from Testimonial input
      role: t.role,    
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