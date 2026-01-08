const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TestimonialSchema = new Schema(
  {
    clientName: { type: String, required: true, trim: true },
    clientTitle: { type: String, default: "" },
    companyName: { type: String, default: "" },

    quoteText: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5 },

    videoMediaId: { type: Schema.Types.ObjectId, ref: "MediaAsset", default: null },
    profileMediaId: { type: Schema.Types.ObjectId, ref: "MediaAsset", default: null },

    isFeatured: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TestimonialSchema.index({ isPublished: 1, displayOrder: 1 });

module.exports = model("Testimonial", TestimonialSchema);
