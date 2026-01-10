import mongoose from "mongoose";

const CtaSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    href: { type: String, default: "" }, // e.g. "#journey" or "/pricing"
    variant: {
      type: String,
      enum: ["primary", "secondary", "outline", "ghost"],
      default: "primary",
    },
    isEnabled: { type: Boolean, default: true },
  },
  { _id: false }
);

const HeroSchema = new mongoose.Schema(
  {
    miniTag: { type: String, default: "Marketing & Design Studio" }, // top small text
    titleLines: {
      type: [String],
      default: ["Crafting Stories", "Since 2018"], // OR ["Blooming", "Your Brands."]
    },
    subtitle: {
      type: String,
      default:
        "We transform brands through strategic marketing and captivating design. Join us on our journey of creativity and innovation.",
    },
    ctas: {
      primary: { type: CtaSchema, default: () => ({ label: "Our Services", href: "#services", variant: "outline" }) },
      secondary: { type: CtaSchema, default: () => ({ label: "Explore Our Journey", href: "#journey", variant: "ghost" }) },
    },
    // Optional: if you want to control dark/spotlight hero variant from DB
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
  },
  { _id: false }
);

const TimelineMilestoneSchema = new mongoose.Schema(
  {
    year: { type: String, required: true }, // "2018"
    title: { type: String, required: true }, // "The Beginning"
    description: { type: String, required: true },
    iconKey: {
      type: String,
      enum: ["Rocket", "Users", "Award", "Globe", "Sparkles", "TrendingUp"], // store as string and map to lucide icon in UI
      default: "Rocket",
    },
    highlight: {
      type: String,
      enum: ["butter", "electric"],
      default: "butter",
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const TimelineSectionSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: "Our Story" }, // small text
    heading: { type: String, default: "The Journey So Far" },
    anchorId: { type: String, default: "journey" },
    milestones: { type: [TimelineMilestoneSchema], default: [] },
  },
  { _id: false }
);

const MarqueeSchema = new mongoose.Schema(
  {
    isEnabled: { type: Boolean, default: true },
    heading: { type: String, default: "" }, // optional
    images: { type: [String], default: [] }, // URLs
  },
  { _id: false }
);

const TestimonialsSchema = new mongoose.Schema(
  {
    isEnabled: { type: Boolean, default: true },
    heading: { type: String, default: "" },
    items: {
      type: [
        new mongoose.Schema(
          {
            name: { type: String, required: true },
            role: { type: String, default: "" },
            quote: { type: String, required: true },
            avatarUrl: { type: String, default: "" },
            order: { type: Number, default: 0 },
            isActive: { type: Boolean, default: true },
          },
          { timestamps: true }
        ),
      ],
      default: [],
    },
  },
  { _id: false }
);

const StoryPageSchema = new mongoose.Schema(
  {
    // if you ever want multiple pages later, keep a slug:
    slug: { type: String, default: "story", unique: true, index: true },

    hero: { type: HeroSchema, default: () => ({}) },
    timeline: { type: TimelineSectionSchema, default: () => ({}) },

    // optional sections that you already render:
    testimonials: { type: TestimonialsSchema, default: () => ({}) },
    marquee: { type: MarqueeSchema, default: () => ({}) },

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const StoryPage = mongoose.models.StoryPage || mongoose.model("StoryPage", StoryPageSchema);
