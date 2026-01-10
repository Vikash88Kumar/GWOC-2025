import mongoose from "mongoose";

const ContactPageSchema = new mongoose.Schema(
  {
    hero: {
      heading: {
        type: String,
        required: true,
        default: "Let’s create something meaningful",
      },
      subHeading: {
        type: String,
        default: "Tell us about your project and we’ll be in touch shortly.",
      },
    },

    form: {
      fields: {
        firstNameLabel: { type: String, default: "First Name" },
        lastNameLabel: { type: String, default: "Last Name" },
        emailLabel: { type: String, default: "Email *" },
        messageLabel: { type: String, default: "Anything else?" },

        firstNamePlaceholder: { type: String, default: "First Name" },
        lastNamePlaceholder: { type: String, default: "Last Name" },
        emailPlaceholder: { type: String, default: "you@email.com" },
        messagePlaceholder: {
          type: String,
          default: "Tell us more about your project...",
        },
      },

      submitButtonText: {
        type: String,
        default: "Let’s get started",
      },
    },

    services: [
      {
        name: { type: String, required: true },
        active: { type: Boolean, default: true },
      },
    ],



    timeline: {
      lastEditedBy: { type: String },
      lastEditedAt: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

export const ContactPage= mongoose.models.ContactPage ||
  mongoose.model("ContactPage", ContactPageSchema);
