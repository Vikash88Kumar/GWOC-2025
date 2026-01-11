"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { BackgroundLines } from '@/components/ui/background-lines';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import Link from 'next/link';
import {createTestimonial} from "../services/testimonial.api.js"
import { gethomePage } from "../services/homepage.api.js"
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
const HomePage = () => {
  const [data, setData] = useState({})
  useEffect(() => {
    const fetchdata = async () => {
      const res = await gethomePage()
      setData(res)
    }
    fetchdata()
  }, [])
  console.log(data)
  const projects = [
    { title: "NANDAN COFFEE", date: "October 2023 - Ongoing", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000" },
    { title: "PASTEL PATISSERIE", date: "December 2024", img: "https://images.unsplash.com/photo-1551443874-329402506e76?q=80&w=1000" },
    { title: "SEEKHO SIKHAO FOUNDATION", date: "September 2023 - Ongoing", img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000" },
    { title: "MANA", date: "October 2024", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000" },
  ];
  const images = [
    "/1.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/5.png",
    "/6.png",
    "/7.png",
    "/8.png",
    "/9.png",
    "/10.png",
    "/11.png",
    "/12.png",
    "/13.png",
    "/14.png",
    "/15.png",
    "/16.png",
    "/17.png",
    "/18.png",
    "/19.png",
    "/20.png",
    "/21.png",
    "/22.png",
    "/23.png",
    "/24.png",
    "/25.png",
    "/26.png",
    "/27.png",
    "/28.png",
    "/29.png",
    "/30.png",
    "/31.png",
    "/32.png",
    "/33.png",
    "/34.png",
    "/35.png",
  ];
  const [testimonials, setTestimonials] = useState<Array<{ quote: string; name: string; designation?: string; src?: string }>>([
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  const [clientName, setClientName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [star, setStar] = useState<number | null>(5);
  const [reviewSuccess, setReviewSuccess] = useState('');

  const submitReview = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !message.trim()) {
      setReviewSuccess('Please add your name and message.');
      setTimeout(() => setReviewSuccess(''), 3000);
      return;
    }
    const newTestimonial = {
      clientName,
      role,
      company,
      message,
      star
    };
    await createTestimonial(newTestimonial)

    // setTestimonials(prev => [newTestimonial, ...prev]);
    setClientName('');
    setRole('');
    setCompany('');
    setMessage('');
    setStar(5);
    setReviewSuccess('Thanks for your review!');
    setTimeout(() => setReviewSuccess(''), 3000);
  };

  return (
    <div className="bg-[#e8e6d8] text-[#624a41] font-serif selection:bg-[#bdaf62] selection:text-white">

      {/* --- HERO SECTION WITH BG IMAGE & ELECTRIC BLUE --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
        {/* Background Image with Electric Blue Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="./front.jpeg"
            alt="Studio Interior"
            className="w-full h-full object-cover"
          />
          {/* Mixing Earl Gray and Electric Blue for a custom tinted overlay */}
          <div className="absolute inset-0 bg-[#892f1a]/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#624a41]/60 via-transparent to-[#e8e6d8]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl z-10"
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">
            <DottedGlowBackground
              className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
              opacity={60}
              gap={10}
              radius={2.5}
              colorLightVar="--color-neutral-500"
              glowColorLightVar="--color-neutral-600"
              colorDarkVar="--color-neutral-500"
              glowColorDarkVar="--color-dark"
              backgroundOpacity={0}
              speedMin={0.3}
              speedMax={1.6}
              speedScale={1}
            />

            <div className="relative z-10 flex w-full flex-col items-center justify-between space-y-6 px-8 py-16 text-center md:flex-row">
              <div>
                <h2 className="text-center text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl md:text-left dark:text-neutral-400">
                  Ready to buy{" "}
                  <span className="font-bold dark:text-white">Aceternity Pro</span>?
                </h2>
                <p className="mt-4 max-w-lg text-center text-base text-neutral-600 md:text-left dark:text-neutral-300">
                  Unlock premium components, advanced animations, and exclusive
                  templates to build stunning modern interfaces.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-8 py-3 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:bg-neutral-50 hover:shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
                  View Pricing
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center md:justify-end">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-56 h-56 rounded-full border-2 border-[#892f1a] border-dotted flex items-center justify-center p-8 text-center"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#892f1a] font-bold">
              Strategy Led • Detail Driven • Keeping You At The Centre
            </span>
          </motion.div>
        </div>
      </section>

      {/* --- STICKY WORK SHOWCASE (DARK CHOC) --- */}
      <section className="bg-[#624a41] text-[#e8e6d8] py-32 px-8 md:px-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">

          {/* LEFT SIDE: STICKY HEADER */}
          <div className="md:w-1/3">
            <div className="sticky top-32">
              {/* REMOVE BackgroundLines OR CHANGE TO A DIV */}
              <div className="flex items-start justify-center w-full flex-col px-4 bg-[#624a41]">
                <h2 className="text-5xl md:text-7xl italic font-light leading-tight mb-6 text-[#e8e6d8]">
                  Glimpse into our work
                </h2>
                <div className="w-20 h-[1px] bg-[#892f1a] mb-8"></div>
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#bdaf62]">
                  Portfolio — 2026
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: VERTICAL SCROLLING IMAGES */}
          <div className="md:w-2/3 space-y-40">
            {projects.map((proj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                {/* <div className="relative aspect-[16/11] overflow-hidden bg-[#e8e6d8]/5 mb-10">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.9 }}
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                </div> */}
                <CardContainer className="inter-var md:w-full w-auto h-auto perspective-1000px">
                  <CardBody className="bg-tranparent-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-yellow/[0.1] w-auto md:w-full sm:w-[30rem] h-auto rounded-xl p-6 border  ">


                    <CardItem translateZ="100" className="w-full h-64 mt-4">
                      <img
                        src={proj.img}
                        className="
    h-64
    sm:h-64
    md:h-72
    w-full
    object-cover
    rounded-xl
    group-hover/card:shadow-xl
  "
                        alt="thumbnail"
                      />
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">
                      mlml
                    </div>
                  </CardBody>
                </CardContainer>

                <div className="flex flex-col border-l-2 border-[#892f1a] pl-6 transition-all duration-500 group-hover:pl-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62] mb-3">{proj.date}</span>
                  <h3 className="text-4xl tracking-wide font-light">{proj.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <AnimatedTestimonials testimonials={testimonials} />

      {/* --- GIVE A REVIEW (FRONTEND ONLY) --- */}
      <section className="max-w-2xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-semibold mb-6">Give a Review</h3>
        <form onSubmit={submitReview} className="grid gap-3">
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Your name"
            className="rounded-md border px-4 py-2"
          />
          <div className="flex gap-3">
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role (e.g., Founder)"
              className="rounded-md border px-4 py-2 flex-1"
            />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="rounded-md border px-4 py-2 flex-1"
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            rows={4}
            className="rounded-md border px-4 py-2"
          />
          <div className="flex items-center gap-2">
            <div className="text-sm">Rating:</div>
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button" onClick={() => setStar(n)} className={`px-2 py-1 rounded ${star === n ? 'bg-[#892f1a] text-white' : 'bg-gray-100'}`}>
                {n}★
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" className="bg-[#892f1a] text-white px-6 py-2 rounded">Submit Review</button>
            <div className="text-sm text-green-600">{reviewSuccess}</div>
          </div>
        </form>
      </section>


      {/* --- NUMBERS SECTION --- */}
      <section className="py-40 px-8 bg-[#e8e6d8] text-center">
        <h2 className="text-3xl italic mb-24 text-[#892f1a]">Our story in numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {[
            { v: "15 +", l: "Industries Served" },
            { v: "74", l: "Happy Clients" },
            { v: "3,700+", l: "Paper Goods Sold" },
            { v: "10,000+", l: "Online Community" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-6xl font-light mb-4 text-[#624a41]">{stat.v}</div>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] font-black text-[#bdaf62]">{stat.l}</p>
            </div>
          ))}
        </div>
      </section>


      {/* --- FOOTER --- */}
      <footer className="bg-white/40 pt-32 pb-12 px-8 md:px-20 border-t border-[#624a41]/10">
        <div className="flex flex-col md:flex-row justify-between gap-24 mb-32 max-w-7xl mx-auto">
          <div>
            <h3 className="text-5xl mb-12">Ready to <span className="text-[#892f1a] italic">elevate</span> <br />your brand?</h3>
            <div className="flex  pb-4 w-full md:w-96 group">
              <Link href="/contact" className="no-underline">
                <button className="flex items-center gap-4 bg-[#892f1a] text-white px-6 py-3 text-[10px] uppercase tracking-[0.4em] hover:bg-[#624a41] transition-all duration-500 shadow-xl">Contact Us</button>
                {/* <ArrowRight className="text-[#892f1a] group-hover:translate-x-2 transition-transform" /> */}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-20 text-[10px] font-sans uppercase tracking-[0.4em]">
            <div className="flex flex-col gap-6">
              <a href="#" className="hover:text-[#892f1a]">Our Story</a>
              <a href="#" className="hover:text-[#892f1a]">Work</a>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 text-[#624a41]/60">
                <Instagram size={18} className="hover:text-[#892f1a]" />
                <Facebook size={18} className="hover:text-[#892f1a]" />
                <Linkedin size={18} className="hover:text-[#892f1a]" />
              </div>
            </div>
          </div>


        </div>
        <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
          <ThreeDMarquee images={images} />
        </div>
      </footer>
    </div>
  );
};


export default HomePage;