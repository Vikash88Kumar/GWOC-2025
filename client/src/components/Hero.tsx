'use client';
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React from "react";
// This import assumes Hero.tsx is in src/components/
import { BackgroundBeams } from "./ui/background-beams";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      
      {/* ANIMATION LAYER 
          We use a CSS filter to turn the default white/blue beams into 
          a Dark Chocolate color to match your branding.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none brightness-[0.2] sepia-[1] hue-rotate-[330deg] saturate-[2] opacity 200">
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
            className="inline-block px-4 py-2 rounded-full bg-secondary/30 text-chocolate font-medium text-sm mb-6"
          >
            Marketing & Design Studio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-chocolate leading-tight mb-6"
          >
            Crafting Stories
            <span className="block text-gradient-electric">Since 2018</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            We transform brands through strategic marketing and captivating design.
            Join us on our journey of creativity and innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#journey"
              className="px-8 py-4 bg-gradient-electric text-primary-foreground rounded-full font-semibold shadow-electric hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Explore Our Journey
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-card border-2 border-chocolate/20 text-chocolate rounded-full font-semibold hover:bg-secondary/30 transition-all duration-300"
            >
              Our Services
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
        <ArrowDown className="w-6 h-6 text-chocolate/50" />
      </motion.div>
    </section>
  );
};

export default Hero;