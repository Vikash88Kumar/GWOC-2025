import mongoose from "mongoose";

// Sub-schema for Project Items (e.g., Nandan Coffee, Mana)
const ProjectItemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "NANDAN COFFEE"
  subtitle: { type: String, default: "" }, // e.g., "October 2023 - Ongoing"
  image: { type: String, required: true }, // URL
  order: { type: Number, default: 0 }
});

// Sub-schema for Statistics (e.g., 50+ Clients)
const StatItemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "50+"
  subtitle: { type: String, required: true }, // e.g., "HAPPY CLIENTS"
  order: { type: Number, default: 0 }
});

const HomePageSchema = new mongoose.Schema(
  {
    // --- 1. HERO SECTION ---
    hero: {
      headline: { 
        type: String, 
        default: "Creating strategic, confident and timeless designs with you at the centre." 
      },
      subHeadline: { 
        type: String, 
        default: "We ensure your brand feels like home to those it serves." 
      },
      ctaText: { type: String, default: "Let's Get Started" },
      ctaLink: { type: String, default: "/services" },
      backgroundImage: [{ type: String, default: "" }] // Optional: to make the main image dynamic
    },

    // --- 2. INTRO SECTION (Aceternity / Dotted BG area) ---
    intro: {
      heading: { type: String, default: "Ready to buy Aceternity Pro?" },
      description: { type: String, default: "Unlock premium components..." },
      floatingCircleText: { 
        type: String, 
        default: "Strategy Led • Detail Driven • Keeping You At The Centre" 
      }
    },

    // --- 3. PROJECTS SECTION ---
    projects: {
      heading: { type: String, default: "Glimpse into our work" },
      subHeading: { type: String, default: "Portfolio — 2026" },
      items: [ProjectItemSchema]
    },

    // --- 4. STATS SECTION (Numbers) ---
    stats: {
      heading: { type: String, default: "Our story in numbers" },
      items: [StatItemSchema]
    },

    // --- 5. FOOTER / MARQUEE SECTION ---
    footer: {
      heading: { type: String, default: "Ready to elevate your brand?" },
      ctaText: { type: String, default: "Contact Us" },
      // Array of image URLs for the 3D Marquee
      marqueeImages: {
        type: [String],
        default: [
          "/1.png", "/2.png", "/3.png", "/4.png", "/5.png"
        ]
      }
    }
  },
  { timestamps: true }
);

export const HomePage = mongoose.models.HomePage || mongoose.model("HomePage", HomePageSchema);