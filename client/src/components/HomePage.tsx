"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { BackgroundLines } from '@/components/ui/background-lines';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import Link from 'next/link';
import { createTestimonial } from "../services/testimonial.api.js"
import { gethomePage } from "../services/homepage.api.js"
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { useAdmin } from '@/contexts/AdminContext';

const HomePage = () => {
  const [data, setData] = useState({})
  
  // --- HERO SLIDER LOGIC ---
  // Images stored in /public are accessed starting with /
  const heroImages = [
    "/3.png", 
    "/4.png", 
    "/5.png", 
    "/6.png", 
    "/7.png"  
  ];
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 1000); 
    return () => clearInterval(timer);
  }, [heroImages.length]);
  // -------------------------

  useEffect(() => {
    const fetchdata = async () => {
      const res = await gethomePage()
      setData(res)
    }
    fetchdata()
  }, [])

  const { contentSections, testimonials: adminTestimonials, addTestimonial } = useAdmin();
  const projectsSection = contentSections.find(s => s.id === 'home-projects');
  const projects = projectsSection?.items?.map(it => ({ title: it.title || '', date: it.subtitle || '', img: it.image || '' })) ?? [
    { title: "NANDAN COFFEE", date: "October 2023 - Ongoing", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000" },
    { title: "PASTEL PATISSERIE", date: "December 2024", img: "https://images.unsplash.com/photo-1551443874-329402506e76?q=80&w=1000" },
    { title: "SEEKHO SIKHAO FOUNDATION", date: "September 2023 - Ongoing", img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000" },
    { title: "MANA", date: "October 2024", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000" },
  ];

  const marqueeImages = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png", "/7.png", "/8.png", "/9.png", "/10.png", "/11.png", "/12.png", "/13.png", "/14.png", "/15.png", "/16.png", "/17.png", "/18.png", "/19.png", "/20.png", "/21.png", "/22.png", "/23.png", "/24.png", "/25.png", "/26.png", "/27.png", "/28.png", "/29.png", "/30.png", "/31.png", "/32.png", "/33.png", "/34.png", "/35.png"];
  
  const animatedTestimonials = adminTestimonials.map(t => ({
    quote: t.content,
    name: t.clientName,
    designation: `${t.clientRole}${t.clientCompany ? ' at ' + t.clientCompany : ''}`,
    src: t.clientImage
  }));

  return (
    <div className="bg-[#e8e6d8] text-[#624a41] font-serif selection:bg-[#bdaf62] selection:text-white">

      {/* --- HERO SECTION WITH HORIZONTAL SLIDING IMAGES --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={currentHeroImage}
              src={heroImages[currentHeroImage]}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
              }}
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          {/* Overlays to ensure text readability */}
          <div className="absolute inset-0 bg-[#892f1a]/40 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-linear-to-b from-[#624a41]/60 via-transparent to-[#e8e6d8] z-10"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl z-20"
        >
          <h1 className="text-5xl md:text-[85px] font-light leading-[1.05] mb-10 text-[#e8e6d8]">
            Creating strategic, <span className="italic text-[#bdaf62]">confident</span> and timeless designs with <span className="italic text-[#892f1a]">you</span> at the centre.
          </h1>
          <p className="font-sans text-sm md:text-base tracking-[0.3em] mb-12 text-[#e8e6d8] uppercase">
            We ensure your brand feels like home to those it serves.
          </p>
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#e8e6d8] text-[#624a41] px-10 py-4 text-[10px] uppercase tracking-[0.4em] hover:bg-[#892f1a] hover:text-white transition-all duration-500 shadow-xl"
            >
              Let's Get Started
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-32 px-8 md:px-20 grid md:grid-cols-2 gap-20 items-center bg-[#e8e6d8]">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">
            <DottedGlowBackground className="pointer-events-none opacity-20" opacity={0.5} gap={10} radius={2.5} colorLightVar="--color-neutral-500" />
            <div className="relative z-10 flex w-full flex-col items-center justify-between space-y-6 px-8 py-16 text-center md:flex-row">
              <div>
                <h2 className="text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl md:text-left">Ready to elevate your brand?</h2>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center md:justify-end">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-56 h-56 rounded-full border-2 border-[#892f1a] border-dotted flex items-center justify-center p-8 text-center">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#892f1a] font-bold">Strategy Led • Detail Driven</span>
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="bg-[#624a41] text-[#e8e6d8] py-32 px-8 md:px-20 relative">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3 pr-8">
            <div className="sticky top-32 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#624a41] border border-[#bdaf62]/60 flex flex-col items-center justify-center text-center px-6 shadow-xl">
                <h2 className="text-3xl md:text-4xl italic font-light text-[#e8e6d8]">Glimpse into<br />our work</h2>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 space-y-40">
            {projects.map((proj, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="group">
                <CardContainer className="inter-var md:w-full">
                  <CardBody className="relative group/card w-auto md:w-full rounded-xl p-6 border border-[#bdaf62]/20">
                    <CardItem translateZ="100" className="w-full h-64 mt-4">
                      <img src={proj.img} className="h-64 md:h-72 w-full object-cover rounded-xl" alt={proj.title} />
                    </CardItem>
                  </CardBody>
                </CardContainer>
                <div className="mt-8 border-l-2 border-[#892f1a] pl-6 transition-all duration-500 group-hover:pl-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62] mb-3">{proj.date}</span>
                  <h3 className="text-4xl tracking-wide font-light">{proj.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <AnimatedTestimonials testimonials={animatedTestimonials} />

      {/* --- FOOTER --- */}
      <footer className="bg-white/40 pt-32 pb-12 px-8 md:px-20 border-t border-[#624a41]/10">
        <div className="flex flex-row justify-between max-w-7xl mx-auto mb-20">
            <h3 className="text-5xl">Ready to <span className="text-[#892f1a] italic">elevate</span> your brand?</h3>
            <Link href="/contact">
              <button className="bg-[#892f1a] text-white px-8 py-4 text-[10px] uppercase tracking-[0.4em]">Contact Us</button>
            </Link>
        </div>
        <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10">
          <ThreeDMarquee images={marqueeImages} />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;