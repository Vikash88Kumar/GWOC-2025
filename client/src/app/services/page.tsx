"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Instagram, Sparkles } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLayout from "@/components/admin/AdminLayout";

type Service = {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
};

const DEFAULT_SERVICES: Service[] = [
  {
    id: "01",
    title: "Brand Identity",
    description:
      "We help you define a clear, cohesive identity — one that reflects your purpose, connects with the right audience, and builds long-term trust.",
    items: [
      "Brand Strategy",
      "Brand Questionnaire",
      "Creative Direction",
      "Logo Suite",
      "Color Palettes",
      "Typography",
      "Brand Guidelines",
    ],
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "02",
    title: "Packaging & Marketing",
    description:
      "Your packaging is your first impression. We make sure it's memorable — combining strategy with bold visuals to turn browsers into buyers.",
    items: [
      "Custom Product Boxes",
      "Stickers and Seals",
      "Butter Paper",
      "Thank You Cards",
      "Product Labels",
      "Business Cards",
      "Brochures",
    ],
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "03",
    title: "Website Design",
    description:
      "A well-designed website should do more than just exist — it should convert. We build clean, intuitive, and scalable websites.",
    items: [
      "Visual Design & Moodboard",
      "Sitemap",
      "UI/UX Design",
      "Up to 15 Product Listings",
      "SEO Optimization",
      "Speed Optimization",
      "Mobile Responsive",
    ],
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200",
  },
];

// ✅ Plain variants (Next.js safe)
const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function ServiceCard({ service }: { service: Service }) {
  return (
    <section className="relative min-w-full h-[78vh] md:h-[86vh] flex items-center justify-center px-6 md:px-12">
      <div className="relative w-full max-w-6xl rounded-3xl border border-border bg-card/70 backdrop-blur shadow-sm overflow-hidden">
        {/* soft background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70" />
        <div className="absolute inset-0 opacity-[0.18] [background:radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.04),transparent_45%)]" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 p-8 md:p-12 items-center">
          {/* image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[1/1] md:aspect-square rounded-3xl overflow-hidden border border-black/10 shadow-2xl"
          >
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
          </motion.div>

          {/* content */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.08 }}
            className="flex flex-col space-y-5"
          >
            <motion.span
              variants={fadeUpVariants}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-serif italic text-black/35"
            >
              {service.id}
            </motion.span>

            <motion.h2
              variants={fadeUpVariants}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-serif text-[#1a1a1a] leading-tight"
            >
              {service.title}
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-black/60 leading-relaxed max-w-lg"
            >
              {service.description}
            </motion.p>

            <motion.ul
              variants={fadeUpVariants}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-1"
            >
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center text-sm text-black/80 before:content-['•'] before:mr-2 before:text-black/30"
                >
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUpVariants}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:opacity-80 transition"
              >
                Explore details <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AdminContentPreviewPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contentSections } = useAdmin();

  // Use services from AdminContext ('services-list'), fallback to DEFAULT_SERVICES
  const services = useMemo(() => {
    const section = contentSections.find((s) => s.id === "services-list");
    if (section && section.items && section.items.length > 0) {
      return section.items.map((it: any) => ({
        id: it.id,
        title: it.title || "",
        description: it.description || "",
        items: it.list || [],
        image: it.image || "",
      })) as Service[];
    }
    return DEFAULT_SERVICES;
  }, [contentSections]);

  const total = services.length;

  // ✅ Use % instead of vw so it works inside admin layout (no overflow)
  const endX = useMemo(() => `-${(total - 1) * 100}%`, [total]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], ["0%", endX]);
  const x = useSpring(xRaw, { stiffness: 80, damping: 22, mass: 0.6 });
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gradient-to-b from-background via-background to-muted/40 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Content Preview
          </div>
          <h1 className="mt-3 text-3xl font-heading font-semibold tracking-tight">
            Services Section
          </h1>
          <p className="text-muted-foreground mt-1">
            This preview pulls data from <span className="font-medium">services-list</span> in AdminContext.
          </p>
          <div className="mt-3 h-[2px] w-44 rounded-full bg-gradient-to-r from-sky-500/70 via-amber-400/50 to-transparent" />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium hover:bg-muted/40 transition"
          >
            View Live Page <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="https://www.instagram.com/bloom.branding_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium hover:bg-muted/40 transition"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </a>
        </div>
      </div>

      {/* Hero Preview (admin-styled card) */}
      <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 bg-gradient-to-br from-white via-sky-50/70 to-amber-50/60">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/80">
                <Sparkles className="h-4 w-4" />
                Creative Branding Studio
              </div>

              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-[#4A2E1C]">
                Where brands{" "}
                <span className="bg-gradient-to-r from-[#4A2E1C] via-sky-600 to-amber-500 bg-clip-text text-transparent">
                  bloom
                </span>{" "}
                & stories unfold
              </h2>

              <p className="mt-5 max-w-xl text-base md:text-lg text-black/60 leading-relaxed">
                We help ambitious brands grow through strategic storytelling, stunning visuals, and
                high-impact digital experiences.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 font-semibold text-white hover:shadow-xl hover:shadow-black/10 transition"
                  >
                    View Our Services <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>

                <a
                  href="https://www.instagram.com/bloom.branding_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-7 py-3.5 font-semibold text-gray-900 hover:bg-black/5 transition"
                  >
                    <Instagram className="h-5 w-5" />
                    Follow Us
                  </motion.button>
                </a>
              </div>
            </motion.div>

            <div className="hidden lg:block">
              <div className="relative aspect-square max-w-md ml-auto">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-sky-500/70" />
                  <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-amber-400/80" />
                </motion.div>

                <div className="absolute inset-8 rounded-full border-2 border-dashed border-black/15" />
                <div className="absolute inset-16 rounded-full border-2 border-black/10" />
                <div className="absolute inset-24 rounded-full bg-gradient-to-br from-black/5 to-black/0" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl bg-white/90 p-10 shadow-2xl backdrop-blur border border-black/10">
                    <span className="text-6xl font-bold bg-gradient-to-r from-sky-600 to-amber-500 bg-clip-text text-transparent">
                      B
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Services Preview */}
      <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-border">
          <h3 className="text-xl font-heading font-semibold">Services Preview</h3>
          <p className="text-muted-foreground mt-1">
            Scroll down — services move horizontally (inside admin width, no overflow).
          </p>
        </div>

        <div ref={containerRef} className="relative" style={{ height: `${services.length * 90}vh` }}>
          <div className="sticky top-0 h-[86vh] overflow-hidden">
            {/* Progress bar */}
            <div className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-black/10">
              <motion.div style={{ width: progressW }} className="h-full bg-black/60" />
            </div>

            <motion.div style={{ x }} className="flex h-full will-change-transform">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm overflow-hidden">
        <div className="p-8 md:p-12 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-center relative">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-heading font-semibold text-white">
              Let’s create something extraordinary
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base md:text-lg text-white/70">
              Ready to transform your brand? Let’s start a conversation.
            </p>

            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-gray-900 hover:shadow-2xl transition"
              >
                Explore Our Services <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <AdminLayout>
      <AdminContentPreviewPage />
    </AdminLayout>
  );
}
