const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProjectMediaSchema = new Schema(
  {
    mediaId: { type: Schema.Types.ObjectId, ref: "MediaAsset", required: true },
    caption: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: true }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    summary: { type: String, default: "" },
    industry: { type: String, default: "" },

    coverMediaId: { type: Schema.Types.ObjectId, ref: "MediaAsset", default: null },

    serviceIds: { type: [Schema.Types.ObjectId], ref: "Service", default: [] },

    gallery: { type: [ProjectMediaSchema], default: [] },

    isFeatured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProjectSchema.index({ slug: 1 }, { unique: true });
ProjectSchema.index({ isPublished: 1, isFeatured: 1, displayOrder: 1 });

module.exports = model("Project", ProjectSchema);
