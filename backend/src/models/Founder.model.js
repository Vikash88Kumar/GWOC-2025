import mongoose from "mongoose";

/* ---------------- VALUES ---------------- */
const ValueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // Heart, Users, etc.
  },
  { _id: false }
);

/* ---------------- MILESTONES ---------------- */
const MilestoneSchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

/* ---------------- SOCIAL LINKS ---------------- */
const SocialSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // Twitter, LinkedIn
    url: { type: String, required: true },
  },
  { _id: false }
);

/* ---------------- MAIN SCHEMA ---------------- */
const AboutFounderSchema = new mongoose.Schema(
  {
    /* Hero Section */
    hero: {
      role: String, // "Founder & Visionary"
      firstName: String,
      lastName: String,
      tagline: String,
      experienceYears: Number,
      profileImage: String,
    },

    /* Story Section */
    story: {
      quote: String,
      paragraphs: [String], // 4 paragraphs
    },

    /* Values Section */
    values: [ValueSchema],

    /* Journey Section */
    milestones: [MilestoneSchema],

    /* Connect Section */
    connect: {
      headline: String,
      subHeadline: String,
      email: String,
      socials: [SocialSchema],
    },
  },
  { timestamps: true }
);

export const AboutFounder= mongoose.model("AboutFounder", AboutFounderSchema);
