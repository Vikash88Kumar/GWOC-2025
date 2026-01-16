import mongoose from "mongoose";

// Sub-schema for Project Items (e.g., Nandan Coffee, Mana)
const ProjectItemSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  subtitle: { type: String, default: "" }, 
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
      // Updated to strictly be an array of strings
      backgroundImage: { 
        type: [String], 
        default: [] 
      } 
    },

    // --- 2. INTRO SECTION ---
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

    // --- 4. CLIENTS SECTION (✅ NEW ADDITION) ---
    clients: {
      heading: { type: String, default: "Trusted by" },
      // Array of Logo URLs
      logos: { 
        type: [String], 
        default: [] 
      }
    },

    // --- 5. STATS SECTION ---
    stats: {
      heading: { type: String, default: "Our story in numbers" },
      items: [StatItemSchema]
    },

    // --- 6. FOOTER / MARQUEE SECTION ---
    footer: {
      heading: { type: String, default: "Ready to elevate your brand?" },
      ctaText: { type: String, default: "Contact Us" },
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