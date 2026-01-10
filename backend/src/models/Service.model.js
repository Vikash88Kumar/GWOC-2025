import mongoose from "mongoose";

/* ---------------- HERO ---------------- */
const HeroSchema = new mongoose.Schema(
  {
    badgeText: String, // Creative Branding Studio
    titleMain: String, // Where brands
    titleHighlight: String, // bloom
    titleSuffix: String, // & stories unfold
    description: String,
    primaryCTA: {
      text: String,
      link: String
    },
    secondaryCTA: {
      text: String,
      link: String
    }
  },
  { _id: false }
);

/* ---------------- VALUES / APPROACH ---------------- */
const ValueSchema = new mongoose.Schema(
  {
    number: String, // 01, 02, 03
    title: String,
    description: String
  },
  { _id: false }
);

/* ---------------- CTA ---------------- */
const CTASchema = new mongoose.Schema(
  {
    heading: String,
    description: String,
    buttonText: String,
    buttonLink: String
  },
  { _id: false }
);


/* ---------------- MAIN PAGE ---------------- */
const ServicePageSchema = new mongoose.Schema(
  {
    hero: HeroSchema,
    values: [ValueSchema],
    cta: CTASchema,
  },
  { timestamps: true }
);

export const ServicePage = mongoose.model("ServicePage", ServicePageSchema);
