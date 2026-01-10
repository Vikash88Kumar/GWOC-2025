'use client'
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: '01',
    title: 'Brand Identity',
    description: 'We help you define a clear, cohesive identity — one that reflects your purpose, connects with the right audience, and builds long-term trust.',
    items: ['Brand Strategy', 'Brand Questionnaire', 'Creative Direction', 'Logo Suite', 'Color Palettes', 'Typography', 'Brand Guidelines'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '02',
    title: 'Packaging & Marketing',
    description: 'Your packaging is your first impression. We make sure it\'s memorable — combining strategy with bold visuals to turn browsers into buyers.',
    items: ['Custom Product Boxes', 'Stickers and Seals', 'Butter Paper', 'Thank You Cards', 'Product Labels', 'Business Cards', 'Brochures'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '03',
    title: 'Website Design',
    description: 'A well-designed website should do more than just exist — it should convert. We build clean, intuitive, and scalable websites.',
    items: ['Visual Design & Moodboard', 'Sitemap', 'UI/UX Design', 'Up to 15 Product Listings', 'SEO Optimization', 'Speed Optimization', 'Mobile Responsive'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
  }
];

// --- Components ---

const Marquee = () => (
  <div className="bg-[#4a5342] py-2 overflow-hidden whitespace-nowrap flex border-y border-white/20">
    <motion.div 
      initial={{ x: 0 }}
      animate={{ x: "-50%" }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-white text-[10px] uppercase tracking-widest mx-4">
          NO DETAIL IS TOO SMALL • NO DETAIL IS TOO SMALL •
        </span>
      ))}
    </motion.div>
  </div>
);

const ServiceCard = ({ service }: { service: Service }) => (
  <div className="min-w-[100vw] h-screen flex items-center justify-center px-12 md:px-24 bg-[#f9f7f2]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative aspect-square rounded-full overflow-hidden shadow-2xl"
      >
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col space-y-6"
      >
        <span className="text-4xl font-display italic text-gray-400">{service.id}</span>
        <h2 className="text-5xl font-display text-[#1a1a1a]">{service.title}</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-md">{service.description}</p>
        <ul className="space-y-2">
          {service.items.map((item, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-800 before:content-['•'] before:mr-2 before:text-gray-400">
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </div>
);

export default function OdeStudioLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // This maps the vertical scroll of the container to a horizontal translation
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

  return (
    <div className="bg-[#f9f7f2] font-sans text-[#1a1a1a]">
      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col justify-center px-12 md:px-24">
        <nav className="absolute top-0 left-0 w-full p-10 flex justify-between items-center">
          <h1 className="text-3xl font-serif italic">ode studio</h1>
          <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest">
            <a href="#">Our Story</a><a href="#">Our Work</a><a href="#">Services</a><a href="#">Shop</a>
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md"
          >
            <h2 className="text-4xl font-display italic leading-tight mb-8">
              Confused about where and how to get started? Consider it our problem now.
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Whether you need a cohesive brand identity, impactful brand assets or a seamless online presence, we tailor our 
              approach to fit your unique goals.
            </p>
          </motion.div>
          <div className="relative h-[400px] bg-slate-200 rounded-lg overflow-hidden">
             {/* Mocking the collage look */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=800')] bg-cover bg-center opacity-80" />
             <div className="absolute bottom-10 left-10 bg-white p-6 shadow-xl max-w-[250px]">
                <p className="font-serif italic">Creating strategic, confident and timeless designs with <span className="underline">you</span> at the center.</p>
             </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* --- HORIZONTAL SCROLL SERVICES --- */}
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x: xTranslate }} className="flex">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-32 px-12 md:px-24 bg-white">
        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-16 text-center">Kind Words</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-[#f9f7f2] rounded-sm border border-gray-100 shadow-sm"
            >
              <p className="text-sm italic mb-6">"The team offers structure, discipline and undivided attention which are things I have not seen from many other teams I've worked with."</p>
              <p className="font-serif font-bold">Client Name {i}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Company Name</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-20 border-t border-gray-100 flex flex-col items-center">
        <h2 className="text-3xl font-serif italic mb-10">Ready to elevate your brand?</h2>
        <div className="w-full max-w-md flex border-b border-black py-2">
            <input type="email" placeholder="Email *" className="bg-transparent flex-grow outline-none text-sm" />
            <button className="text-xs uppercase tracking-widest font-bold">Submit</button>
        </div>
      </section>
    </div>
  );
}