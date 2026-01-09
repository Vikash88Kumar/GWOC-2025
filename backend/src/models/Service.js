import mongoose, { Schema } from "mongoose";

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

    heroMediaId: {
      type: Schema.Types.ObjectId,
      ref: "MediaAsset",
      default: null,
    },

    impacts: { type: [ServiceImpactSchema], default: [] },

    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Keep only compound index
ServiceSchema.index({ isPublished: 1, displayOrder: 1 });

export const ServiceImpact = mongoose.model(
  "ServiceImpact",
  ServiceImpactSchema
);

export const Service = mongoose.model("Service", ServiceSchema);
