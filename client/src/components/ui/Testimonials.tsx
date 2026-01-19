import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
type Testimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  status?: string; // "approved" | "pending" | ...
};

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechFlow",
      company: "TechFlow Inc.",
      text: "Bloom Branding transformed our entire brand identity...",
      rating: 5,
      status: "approved",
    },
    {
      name: "Michael Chen",
      role: "Founder, Urban Eats",
      company: "Urban Eats",
      text: "Working with Bloom was a game-changer...",
      rating: 5,
      status: "pending",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, Wellness Co.",
      company: "Wellness Co.",
      text: "The production quality and attention to detail is unmatched...",
      rating: 5,
      status: "approved",
    },
  ];

  // ✅ Only approved testimonials will be shown
  const approvedTestimonials = useMemo(
    () => testimonials.filter((t) => (t.status ?? "").toLowerCase() === "approved"),
    [testimonials]
  );

  // ✅ Reset index if list length changes (prevents out-of-bounds crash)
  useEffect(() => {
    if (currentIndex >= approvedTestimonials.length) setCurrentIndex(0);
  }, [approvedTestimonials.length, currentIndex]);

  const next = () => {
    if (approvedTestimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % approvedTestimonials.length);
  };

  const prev = () => {
    if (approvedTestimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + approvedTestimonials.length) % approvedTestimonials.length);
  };

  // ✅ If none are approved, show nothing (or show a small placeholder)
  if (approvedTestimonials.length === 0) return null;

  const current = approvedTestimonials[currentIndex];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl text-white md:text-6xl mb-6">
            Client{" "}
            <span className="bg-gradient-to-r from-white to-zinc-800 bg-clip-text text-transparent">
              Love
            </span>
          </h2>
          <p className="text-xl text-white/70">Hear from brands we've helped bloom</p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-12 backdrop-blur-sm"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6 justify-center">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-800 text-yellow-800" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 text-center leading-relaxed">
                "{current.text}"
              </p>

              {/* Author Info */}
              <div className="text-center">
                <div className="text-lg mb-1 text-white">{current.name}</div>
                <div className="text-white/60">
                  {current.role}, {current.company}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {approvedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-white w-8" : "bg-white/20 hover:bg-white/40 w-2"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
