import mongoose, { Schema , model } from "mongoose";



const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ServiceImpactSchema = new Schema(
  {
    impactText: { type: String, required: true, trim: true },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: true }
);

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortSummary: { type: String, default: "" },

    heroMediaId: { type: Schema.Types.ObjectId, ref: "MediaAsset", default: null },

    impacts: { type: [ServiceImpactSchema], default: [] },

    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ServiceSchema.index({ slug: 1 }, { unique: true });
ServiceSchema.index({ isPublished: 1, displayOrder: 1 });

module.exports = model("Service", ServiceSchema);
