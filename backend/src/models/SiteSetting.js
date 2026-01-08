const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SiteSettingSchema = new Schema(
  {
    instagramUrl: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },

    seoDefaultTitle: { type: String, default: "" },
    seoDefaultDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = model("SiteSetting", SiteSettingSchema);
