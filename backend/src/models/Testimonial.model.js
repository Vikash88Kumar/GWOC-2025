import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Set to true if only logged-in users can review
    },
    // We make these optional because we will pull them from the User table
    clientName: { type: String, trim: true }, 
    clientImage: { type: String }, 
    company: { type: String },

    message: {
      type: String,
      required: true,
      trim: true,
    },
    role: { // User can override this, or we fallback to User's role
      type: String,
      default: "",
    },
    star: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);