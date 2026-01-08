const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EnquirySchema = new Schema(
  {
    // Display + form fields
    firstName: { type: String, trim: true, default: "" },
    lastName: { type: String, trim: true, default: "" },
    name: { type: String, required: true, trim: true }, // can be "first last"

    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    company: { type: String, default: "" },

    budgetRange: { type: String, default: "" },
    timeline: { type: String, default: "" },

    // ✅ Multiple checkbox selection
    services: {
      type: [String],
      default: [],
      // optional: enforce allowed values
      enum: ["Brand Identity", "Packaging", "Website", "Social Media Management", "Wedding Invites", "Other"],
    },

    // If later you want strict mapping to your Service collection
    serviceIds: { type: [Schema.Types.ObjectId], ref: "Service", default: [] },

    // Extra message box
    message: { type: String, default: "" },

    source: { type: String, enum: ["website", "instagram", "other"], default: "website" },
    status: { type: String, enum: ["NEW", "IN_PROGRESS", "WON", "LOST"], default: "NEW" },
  },
  { timestamps: true }
);

EnquirySchema.index({ status: 1, createdAt: -1 });
EnquirySchema.index({ email: 1, createdAt: -1 });

module.exports = model("Enquiry", EnquirySchema);
