"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, X, Send, Sparkles } from "lucide-react";
import { submitContactForm } from "../services/contact.api.js"

/* ------------------ ANIMATION VARIANTS ------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/* ------------------ DATA ------------------ */
const services = [
  "Brand Identity",
  "Packaging",
  "Website",
  "Social Media Management",
  "Wedding Invites",
  "Other",
];

/* ------------------ SUCCESS MODAL ------------------ */
const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--dark-chocolate)]/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-[var(--earth-gray)] rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl border border-[var(--dark-chocolate)]/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--dark-chocolate)]/10 transition-colors"
          >
            <X className="w-5 h-5 text-[var(--dark-chocolate)]" />
          </button>

          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--electric-rust)] to-[var(--electric-rust)]/70 flex items-center justify-center shadow-lg"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>

          {/* Sparkles */}
          <motion.div
            className="absolute top-12 left-12"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-[var(--butter-yellow)]" />
          </motion.div>
          <motion.div
            className="absolute top-16 right-16"
            animate={{ rotate: -360, scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-[var(--electric-rust)]" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-display font-bold text-[var(--dark-chocolate)] text-center mb-3"
          >
            Message Sent!
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[var(--dark-chocolate)]/70 text-center mb-6"
          >
            Thank you for reaching out! We'll get back to you within 24-48 hours.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3 bg-[var(--dark-chocolate)] text-[var(--earth-gray)] rounded-full font-medium hover:bg-[var(--electric-rust)] transition-colors"
          >
            Got it!
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ------------------ PAGE ------------------ */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email) {
      alert("Email is required");
      return;
    }

    if (selectedServices.length === 0) {
      alert("Please select at least one service");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        budget: formData.budget,
        timeline: formData.timeline,
        services: selectedServices,
        message: formData.message,
      };

      await submitContactForm(payload);

      setShowSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        budget: "",
        timeline: "",
        message: "",
      });
      setSelectedServices([]);
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full min-h-screen bg-[var(--earth-gray)] relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-20 left-10 w-64 h-64 bg-[var(--electric-rust)]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--butter-yellow)]/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-block mb-4">
            <span className="px-4 py-2 bg-[var(--electric-rust)]/10 text-[var(--electric-rust)] rounded-full text-sm font-medium tracking-wide">
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-center font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--dark-chocolate)] mb-4"
          >
            Let's create something{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[var(--electric-rust)] via-[var(--electric-rust)] to-[var(--dark-chocolate)] bg-clip-text text-transparent">
                meaningful
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[var(--electric-rust)] to-[var(--butter-yellow)] rounded-full origin-left"
              />
            </span>
          </motion.h1>


          <motion.p
            variants={fadeInUp}
            className="text-[var(--dark-chocolate)]/60 text-lg md:text-xl max-w-xl mx-auto"
          >
            Tell us about your project and we'll be in touch shortly.
          </motion.p>
        </motion.section>

        {/* Form Container */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-[var(--dark-chocolate)]/10 overflow-hidden">
            {/* Form header decoration */}
            <div className="h-2 bg-gradient-to-r from-[var(--electric-rust)] via-[var(--butter-yellow)] to-[var(--dark-chocolate)]" />

            <div className="p-6 md:p-10 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* NAME */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="group">
                    <label className="block text-sm font-medium text-[var(--dark-chocolate)]/80 mb-2 group-focus-within:text-[var(--electric-rust)] transition-colors">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full bg-transparent border-b-2 border-[var(--dark-chocolate)]/20 py-3 outline-none focus:border-[var(--electric-rust)] transition-all placeholder:text-[var(--dark-chocolate)]/30 text-[var(--dark-chocolate)]"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-[var(--dark-chocolate)]/80 mb-2 group-focus-within:text-[var(--electric-rust)] transition-colors">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full bg-transparent border-b-2 border-[var(--dark-chocolate)]/20 py-3 outline-none focus:border-[var(--electric-rust)] transition-all placeholder:text-[var(--dark-chocolate)]/30 text-[var(--dark-chocolate)]"
                    />
                  </div>
                </motion.div>

                {/* EMAIL */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-[var(--dark-chocolate)]/80 mb-2 group-focus-within:text-[var(--electric-rust)] transition-colors">
                    Email <span className="text-[var(--electric-rust)]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@email.com"
                    className="w-full bg-transparent border-b-2 border-[var(--dark-chocolate)]/20 py-3 outline-none focus:border-[var(--electric-rust)] transition-all placeholder:text-[var(--dark-chocolate)]/30 text-[var(--dark-chocolate)]"
                  />
                </motion.div>

                {/* BUDGET & TIMELINE */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="group">
                    <label className="block text-sm font-medium text-[var(--dark-chocolate)]/80 mb-2 group-focus-within:text-[var(--electric-rust)] transition-colors">
                      Budget
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="$5,000 - $10,000"
                      className="w-full bg-transparent border-b-2 border-[var(--dark-chocolate)]/20 py-3 outline-none focus:border-[var(--electric-rust)] transition-all placeholder:text-[var(--dark-chocolate)]/30 text-[var(--dark-chocolate)]"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-[var(--dark-chocolate)]/80 mb-2 group-focus-within:text-[var(--electric-rust)] transition-colors">
                      Timeline
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder="2–3 months"
                      className="w-full bg-transparent border-b-2 border-[var(--dark-chocolate)]/20 py-3 outline-none focus:border-[var(--electric-rust)] transition-all placeholder:text-[var(--dark-chocolate)]/30 text-[var(--dark-chocolate)]"
                    />
                  </div>
                </motion.div>

                {/* SERVICES */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-[var(--dark-chocolate)]/80 mb-4">
                    Services
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {services.map((service, index) => (
                      <motion.label
                        key={service}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer px-5 py-2.5 rounded-full border-2 transition-all duration-300 ${selectedServices.includes(service)
                          ? "bg-[var(--electric-rust)] text-white border-[var(--electric-rust)] shadow-lg shadow-[var(--electric-rust)]/30"
                          : "border-[var(--dark-chocolate)]/20 text-[var(--dark-chocolate)]/70 hover:border-[var(--electric-rust)]/50 hover:bg-[var(--electric-rust)]/5"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="hidden"
                        />
                        <span className="text-sm font-medium">{service}</span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* MESSAGE */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-[var(--dark-chocolate)]/80 mb-2 group-focus-within:text-[var(--electric-rust)] transition-colors">
                    Anything else?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project, goals, and vision..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[var(--dark-chocolate)]/5 rounded-2xl border-2 border-transparent p-4 outline-none focus:border-[var(--electric-rust)] focus:bg-transparent transition-all placeholder:text-[var(--dark-chocolate)]/30 text-[var(--dark-chocolate)] resize-none"
                  />
                </motion.div>

                {/* SUBMIT */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`relative w-full md:w-auto px-12 py-4 rounded-full text-sm uppercase tracking-widest font-medium transition-all duration-300 flex items-center justify-center gap-3 ${isLoading
                      ? "bg-[var(--dark-chocolate)]/50 text-[var(--earth-gray)] cursor-not-allowed"
                      : "bg-gradient-to-r from-[var(--dark-chocolate)] to-[var(--dark-chocolate)]/90 text-[var(--earth-gray)] hover:from-[var(--electric-rust)] hover:to-[var(--electric-rust)]/90 shadow-lg hover:shadow-xl hover:shadow-[var(--electric-rust)]/20"
                      }`}
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-3"
                        >
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="submit"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-3"
                        >
                          <Send className="w-5 h-5" />
                          <span>Let's get started</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="mt-4 text-sm text-[var(--dark-chocolate)]/50"
                  >
                    We usually reply within 24–48 hours.
                  </motion.p>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center text-xs tracking-widest text-[var(--dark-chocolate)]/40 uppercase"
        >
          © 2026 BY BLOOM BRANDING STUDIO. ALL RIGHTS RESERVED.
        </motion.footer>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
};

export default ContactPage;
