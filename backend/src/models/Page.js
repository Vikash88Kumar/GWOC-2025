const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PageSectionSchema = new Schema(
  {
    sectionType: {
      type: String,
      enum: ["HERO", "TEXT", "IMAGE", "VIDEO", "TIMELINE", "STATS", "CTA", "CUSTOM"],
      default: "TEXT",
    },
    heading: { type: String, default: "" },
    body: { type: String, default: "" },

    mediaId: { type: Schema.Types.ObjectId, ref: "MediaAsset", default: null },

    motionStyle: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { _id: true }
);

const PageSchema = new Schema(
  {
    key: {
      type: String,
      enum: ["HOME", "STORY", "FOUNDER", "SERVICES", "WORK", "CONTACT"],
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    slug: { type: String, default: "" },
    isPublished: { type: Boolean, default: true },

    sections: { type: [PageSectionSchema], default: [] },
  },
  { timestamps: true }
);

PageSchema.index({ key: 1 }, { unique: true });

module.exports = model("Page", PageSchema);
