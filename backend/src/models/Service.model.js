import mongoose from "mongoose";

// 1. Schema for individual Service Items (Brand Identity, Packaging, etc.)
const ServiceItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  // The bullet points list (e.g., "Logo Suite", "Typography")
  items: {
    type: [String],
    default: [],
  },
  image: {
    type: String, // URL from Cloudinary/Unsplash
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});

// 2. Schema for the Page
const ServicesPageSchema = new mongoose.Schema(
  {
    // --- Hero Section ("Where brands bloom...") ---
    hero: {
      tag: { type: String, default: "Creative Branding Studio" },
      headline: { type: String, default: "Where brands bloom & stories unfold" },
      subHeadline: {
        type: String,
        default: "We help ambitious brands grow through strategic storytelling and stunning visuals."
      },
      primaryCta: {
        text: { type: String, default: "View Our Services" },
        link: { type: String, default: "#services-list" }
      },
      secondaryCta: {
        text: { type: String, default: "Follow Us" },
        link: { type: String, default: "https://instagram.com" }
      }
    },

    // --- Services List Section ---
    servicesList: [ServiceItemSchema],

    // --- Bottom CTA Section ("Let's create something extraordinary") ---
    cta: {
      heading: { type: String, default: "Let’s create something extraordinary" },
      description: {
        type: String,
        default: "Ready to transform your brand? Let’s start a conversation."
      },
      buttonText: { type: String, default: "Explore Our Services" },
      buttonLink: { type: String, default: "/contact" }
    }
  },
  { timestamps: true }
);

export const ServicePage = mongoose.models.ServicesPage || mongoose.model("ServicePage", ServicesPageSchema);