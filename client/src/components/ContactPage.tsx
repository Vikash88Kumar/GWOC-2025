"use client";

import React from "react";
import { motion } from "framer-motion";

/* ------------------ ANIMATION VARIANTS ------------------ */
// ⚠️ NO transitions inside variants (Next.js safe)

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
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

/* ------------------ PAGE ------------------ */

const ContactPage = () => {
  return (
    <div className="bg-[#624a41] text-[#e8e6d8] min-h-screen font-serif selection:bg-[#bdaf62] selection:text-white">

      {/* ---------------- HEADER ---------------- */}
      <section className="pt-40 pb-24 px-6 text-center">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-light mb-6"
        >
          Let’s create something meaningful
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-sans text-sm tracking-wide opacity-80 max-w-xl mx-auto"
        >
          Tell us about your project and we’ll be in touch shortly.
        </motion.p>
      </section>

      {/* ---------------- FORM CARD ---------------- */}
      <section className="px-6 pb-40">
        <motion.div
          variants={fadeInUp}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto bg-[#e8e6d8] text-[#624a41] p-10 md:p-20 shadow-2xl"
        >
          <form className="space-y-10 font-sans">

            {/* NAME */}
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-transparent border-b border-[#624a41]/30 py-4 outline-none focus:border-[#892f1a] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="bg-transparent border-b border-[#624a41]/30 py-4 outline-none focus:border-[#892f1a] transition-colors"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                Email *
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                className="bg-transparent border-b border-[#624a41]/30 py-4 outline-none focus:border-[#892f1a] transition-colors"
              />
            </div>

            {/* SERVICES */}
            <div className="space-y-4 pt-4">
              <p className="text-[11px] uppercase tracking-widest font-bold">
                Services
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 text-sm cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#892f1a] border-[#624a41]"
                    />
                    <span className="group-hover:text-[#892f1a] transition-colors">
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                Anything else?
              </label>
              <textarea
                placeholder="Tell us more about your project..."
                rows={3}
                className="bg-transparent border-b border-[#624a41]/30 py-4 outline-none resize-none focus:border-[#892f1a] transition-colors"
              />
            </div>

            {/* SUBMIT */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-[#624a41] text-[#e8e6d8] px-14 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#892f1a]"
            >
              Let’s get started
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="py-12 text-center text-[10px] tracking-[0.3em] opacity-40 uppercase">
        © 2026 BY ODE STUDIO. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
};

export default ContactPage;
