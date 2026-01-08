const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ClientSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    websiteUrl: { type: String, default: "" },
    logoMediaId: { type: Schema.Types.ObjectId, ref: "MediaAsset", default: null },

    isFeatured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ClientSchema.index({ isFeatured: 1, displayOrder: 1 });

module.exports = model("Client", ClientSchema);
