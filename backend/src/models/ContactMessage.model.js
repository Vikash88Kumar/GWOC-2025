import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    budget: { type: String, default: "" },
    timeline: { type: String, default: "" },

    services: { type: [String], default: [] },

    message: { type: String, default: "" },

    isRead: { type: Boolean, default: false },

    adminResponse: {
      message: { type: String, default: "" },
      respondedAt: { type: Date }
    }
  },
  { timestamps: true }
);

export const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);
