'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Instagram, Sparkles } from 'lucide-react';
import {service} from "../../services/service.api.js"
type Service = {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
};

const SERVICES: Service[] = [
  {
    id: '01',
    title: 'Brand Identity',
    description:
      'We help you define a clear, cohesive identity — one that reflects your purpose, connects with the right audience, and builds long-term trust.',
    items: [
      'Brand Strategy',
      'Brand Questionnaire',
      'Creative Direction',
      'Logo Suite',
      'Color Palettes',
      'Typography',
      'Brand Guidelines',
    ],
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '02',
    title: 'Packaging & Marketing',
    description:
      "Your packaging is your first impression. We make sure it's memorable — combining strategy with bold visuals to turn browsers into buyers.",
    items: [
      'Custom Product Boxes',
      'Stickers and Seals',
      'Butter Paper',
      'Thank You Cards',
      'Product Labels',
      'Business Cards',
      'Brochures',
    ],
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '03',
    title: 'Website Design',
    description:
      'A well-designed website should do more than just exist — it should convert. We build clean, intuitive, and scalable websites.',
    items: [
      'Visual Design & Moodboard',
      'Sitemap',
      'UI/UX Design',
      'Up to 15 Product Listings',
      'SEO Optimization',
      'Speed Optimization',
      'Mobile Responsive',
    ],
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
  },
];

// ✅ Plain variants (NO function variants)
const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function ServiceCard({ service }: { service: Service }) {
  return (
    <>
    <section className="relative min-w-[100vw] h-screen flex items-center justify-center px-6 md:px-16 bg-[#f9f7f2]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background:radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.04),transparent_45%)]" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-7xl w-full items-center">
        {/* image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square rounded-full overflow-hidden shadow-2xl"
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
          className="flex flex-col space-y-6"
        >
          <motion.span
            variants={fadeUpVariants}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-serif italic text-gray-400"
          >
            {service.id}
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-serif text-[#1a1a1a] leading-tight"
          >
            {service.title}
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md"
          >
            {service.description}
          </motion.p>

          <motion.ul
            variants={fadeUpVariants}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-center text-sm text-gray-800 before:content-['•'] before:mr-2 before:text-gray-400"
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:opacity-80 transition"
            >
              Explore details <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  const total = SERVICES.length;
  const endX = useMemo(() => `-${(total - 1) * 100}vw`, [total]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], ['0vw', endX]);
  const x = useSpring(xRaw, { stiffness: 80, damping: 22, mass: 0.6 });

  const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);


  const [data,setData]=useState({})
  useEffect(()=>{
    const fetchService=async()=>{
      const res=await service()
      setData(res?.data)
    }
    fetchService()
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-400"
              >
                <Sparkles className="h-4 w-4" />
                Creative Branding Studio
              </motion.div>

              <h1 className="text-5xl font-serif font-bold leading-tight text-[#4A2E1C] md:text-6xl lg:text-7xl">
                Where brands{' '}
                <span className="bg-gradient-to-r from-[#4A2E1C] to-blue-500 bg-clip-text text-transparent">
                  bloom  &
                </span>{''}
                 <br />
                stories unfold
              </h1>

              <p className="mt-6 max-w-lg text-lg text-gray-600 leading-relaxed">
                We help ambitious brands grow through strategic storytelling, stunning visuals, and
                high-impact digital experiences.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-400 px-8 py-4 font-semibold text-amber-950 transition-all duration-300 hover:shadow-xl hover:shadow-black/10"
                  >
                    View Our Services
                    <ArrowRight className="h-5 w-5" />
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
                    className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-black/5"
                  >
                    <Instagram className="h-5 w-5" />
                    Follow Us
                  </motion.button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-rose-400" />
                  <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-yellow-400" />
                </motion.div>

                <div className="absolute inset-8 rounded-full border-2 border-dashed border-black/15" />
                <div className="absolute inset-16 rounded-full border-2 border-black/10" />
                <div className="absolute inset-24 rounded-full bg-gradient-to-br from-black/5 to-black/0" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl bg-white/90 p-10 shadow-2xl backdrop-blur">
                    <span className="text-6xl font-bold bg-gradient-to-r from-rose-500 to-yellow-500 bg-clip-text text-transparent">
                      B
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -right-16 top-16 h-72 w-72 rounded-full bg-rose-400/15 blur-3xl" />
              <div className="absolute -left-10 bottom-16 h-52 w-52 rounded-full bg-yellow-400/15 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal services */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">Our Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Scroll down — services move horizontally.
          </p>
        </div>

        <div ref={containerRef} className="relative" style={{ height: `${SERVICES.length * 100}vh` }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-black/10">
              <motion.div style={{ width: progressW }} className="h-full bg-black/60" />
            </div>

            <motion.div style={{ x }} className="flex h-full will-change-transform">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          </div>
        </div>
        
  <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gray-900 p-12 text-center md:p-20"
          >
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-rose-400/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-yellow-400/15 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Let’s create something extraordinary
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
                Ready to transform your brand? Let’s start a conversation.
              </p>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:shadow-2xl"
                >
                  Explore Our Services
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </section>
    </div>
  );
}
