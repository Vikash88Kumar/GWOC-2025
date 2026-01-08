import mongoose, { Schema } from "mongoose";



const MediaAssetSchema = new Schema(
  {
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
    altText: { type: String, default: "" },
    caption: { type: String, default: "" },
  },
  { timestamps: true }
);

MediaAssetSchema.index({ type: 1 });
MediaAssetSchema.index({ createdAt: -1 });