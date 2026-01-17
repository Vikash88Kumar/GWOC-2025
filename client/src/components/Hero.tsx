'use client';
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React from "react";
// This import assumes Hero.tsx is in src/components/
import { BackgroundBeams } from "./ui/background-beams";

const Hero = ({ hero }: { hero?: any }) => {
  const miniTag = hero?.miniTag || "Marketing & Design Studio";
  const titleLines: string[] = hero?.titleLines || ["Crafting Stories", "Since 2018"];
  const subtitle = hero?.subtitle || "We transform brands through strategic marketing and captivating design. Join us on our journey of creativity and innovation.";
  const primary = hero?.ctas?.primary || { label: "Explore Our Journey", href: "#journey", variant: "outline" };
  const secondary = hero?.ctas?.secondary || { label: "Our Services", href: "#services", variant: "ghost" };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--earth-gray)]">

      {/* ANIMATION LAYER 
          We use a CSS filter to turn the default white/blue beams into 
          a Dark Chocolate color to match your branding.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-multiply">
        <BackgroundBeams />
      </div>

      {/* Content Layer - relative z-10 ensures it stays above the beams */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-[var(--butter-yellow)]/30 text-[var(--dark-chocolate)] font-medium text-sm mb-6"
          >
            {miniTag}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-[var(--dark-chocolate)] leading-tight mb-6"
          >
            {titleLines.map((line, i) => (
              <span key={i} className={i === 1 ? 'block text-[var(--electric-rust)]' : ''}>{line}</span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-[var(--dark-chocolate)]/70 max-w-2xl mx-auto mb-10"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={secondary.href}
              className="px-8 py-4 bg-[var(--electric-rust)] text-white rounded-full font-semibold shadow-xl hover:shadow-[var(--electric-rust)]/30 transition-all duration-300 hover:-translate-y-1"
            >
              {secondary.label}
            </a>
            <a
              href={primary.href}
              className="px-8 py-4 bg-transparent border-2 border-[var(--dark-chocolate)]/20 text-[var(--dark-chocolate)] rounded-full font-semibold hover:bg-[var(--butter-yellow)]/30 transition-all duration-300"
            >
              {primary.label}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-[var(--dark-chocolate)]/50" />
      </motion.div>
    </section>
  );
};

export default Hero;