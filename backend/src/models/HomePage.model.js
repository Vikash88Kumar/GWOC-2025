import mongoose from "mongoose";

/* ---------------- HERO SECTION ---------------- */
const HeroSchema = new mongoose.Schema(
  {
    videoUrl: { type: String, required: true },
    imageUrl: { type: String, required: true},
    headline: { type: String, required: true },
    subText: { type: String },
  },
  { _id: false }
);

/* ---------------- INTRO SECTION ---------------- */
// const IntroSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     rotatingText: { type: String },
//   },
//   { _id: false }
// );

/* ---------------- PROJECT / PORTFOLIO ---------------- */
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* ---------------- STATS / NUMBERS ---------------- */
const StatSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

/* ---------------- FOOTER ---------------- */
// const FooterSchema = new mongoose.Schema(
//   {
//     heading: { type: String },
//     emailPlaceholder: { type: String },
//     instagramUrl: { type: String },
//     facebookUrl: { type: String },
//     linkedinUrl: { type: String },
//   },
//   { _id: false }
// );

/* ---------------- GALLERY / MARQUEE ---------------- */
// const GalleryImageSchema = new mongoose.Schema(
//   {
//     imageUrl: { type: String, required: true },
//     order: { type: Number, default: 0 },
//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

/* ---------------- MAIN HOMEPAGE ---------------- */
const HomePageSchema = new mongoose.Schema(
  {
    hero: HeroSchema,
    // intro: IntroSchema,
    projects: [ProjectSchema],
    stats: [StatSchema],
    // footer: FooterSchema,
    // galleryImages: [GalleryImageSchema],
  },
  { timestamps: true }
);

export const HomePage = mongoose.model("HomePage", HomePageSchema);
