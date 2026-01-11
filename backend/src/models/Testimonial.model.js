import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    // --- 1. JOIN WITH USER TABLE ---
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Must match the model name "User" exactly
      required: false // False allows Admin to manually add testimonials without a User ID
    },

    // --- 2. REVIEW CONTENT ---
    clientName: {
      type: String,
      required: true, // We still require this as a fallback or snapshot
      trim: true
    },

    role: {
      type: String,
      default: ""
    },

    company: {
      type: String,
      default: ""
    },

    clientImage: {
      type: String,
      default: "" // Can store a manual URL or be populated from user.avatar
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    star: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    // --- 3. ADMIN CONTROLS ---
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    order: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);