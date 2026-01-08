"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react';

const HomePage = () => {
  const projects = [
    { title: "NANDAN COFFEE", date: "October 2023 - Ongoing", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000" },
    { title: "PASTEL PATISSERIE", date: "December 2024", img: "https://images.unsplash.com/photo-1551443874-329402506e76?q=80&w=1000" },
    { title: "SEEKHO SIKHAO FOUNDATION", date: "September 2023 - Ongoing", img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000" },
    { title: "MANA", date: "October 2024", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000" },
  ];

  return (
    <div className="bg-[#e8e6d8] text-[#624a41] font-serif selection:bg-[#bdaf62] selection:text-white">
      
      {/* --- HERO SECTION WITH BG IMAGE & ELECTRIC BLUE --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
        {/* Background Image with Electric Blue Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="./front.png" 
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
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="bg-[#e8e6d8] text-[#624a41] px-10 py-4 text-[10px] uppercase tracking-[0.4em] hover:bg-[#892f1a] hover:text-white transition-all duration-500 shadow-xl"
          >
            Let's Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-32 px-8 md:px-20 grid md:grid-cols-2 gap-20 items-center bg-[#e8e6d8]">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl leading-tight mb-8">
            Take things <span className="italic text-[#892f1a]">off your plate</span> so you can get on with what you do best.
          </h2>
          <p className="font-sans text-[#624a41]/80 leading-relaxed max-w-lg">
            Whether you’re unsure where to start or need to rebrand your visual identity, we’re here for you. 
          </p>
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
              <h2 className="text-5xl md:text-7xl italic font-light leading-tight mb-6">
                Glimpse into our work
              </h2>
              <div className="w-20 h-[1px] bg-[#892f1a] mb-8"></div>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#bdaf62]">
                Portfolio — 2026
              </p>
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
                <div className="relative aspect-[16/11] overflow-hidden bg-[#e8e6d8]/5 mb-10">
                  <motion.img 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.9 }}
                    src={proj.img} 
                    alt={proj.title} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                </div>
                
                <div className="flex flex-col border-l-2 border-[#892f1a] pl-6 transition-all duration-500 group-hover:pl-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62] mb-3">{proj.date}</span>
                  <h3 className="text-4xl tracking-wide font-light">{proj.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
            <h3 className="text-5xl mb-12">Ready to <span className="text-[#892f1a] italic">elevate</span> <br/>your brand?</h3>
            <div className="flex border-b border-[#624a41] pb-4 w-full md:w-96 group">
              <input type="text" placeholder="Email Address" className="bg-transparent outline-none flex-grow text-xs uppercase tracking-widest" />
              <ArrowRight className="text-[#892f1a] group-hover:translate-x-2 transition-transform" />
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
      </footer>
    </div>
  );
};

export default HomePage;