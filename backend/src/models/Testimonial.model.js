import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true
    // },

    clientName: {
      type: String,
      required: true,
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
