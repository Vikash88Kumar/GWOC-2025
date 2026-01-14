"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram, Facebook, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { BackgroundLines } from '@/components/ui/background-lines';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import Link from 'next/link';
import {createTestimonial} from "../../services/testimonial.api"
import { getHomePage } from "../../services/homepage.api.js"
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { useAdmin } from '@/contexts/AdminContext';

const heroSliderImages = [
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000', alt: 'Modern interior design' },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000', alt: 'Elegant living space' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000', alt: 'Luxury home design' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000', alt: 'Contemporary architecture' },
  { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000', alt: 'Minimalist interior' },
];

const HomePage = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHomePage();
        setData(res?.data ?? res);
      } catch (err) {
        console.error('Failed to fetch homepage:', err);
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSliderImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSliderImages.length) % heroSliderImages.length);
  };

  const handleNextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSliderImages.length);
  };

  const goToSlide = (index: number) => {
    setSlideDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0, scale: 1.1 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
  };

  const { contentSections, testimonials: adminTestimonials, addTestimonial } = useAdmin();
  const projectsSection = contentSections.find(s => s.id === 'home-projects');
  const apiProjects = (data?.projects?.items ?? []).map((it: any) => ({ title: it.title || '', date: it.subtitle || '', img: it.image || '' }));
  const projects = apiProjects.length
    ? apiProjects
    : (projectsSection?.items?.map(it => ({ title: it.title || '', date: it.subtitle || '', img: it.image || '' })) ?? [
        { title: "NANDAN COFFEE", date: "October 2023 - Ongoing", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000" },
        { title: "PASTEL PATISSERIE", date: "December 2024", img: "https://images.unsplash.com/photo-1551443874-329402506e76?q=80&w=1000" },
        { title: "SEEKHO SIKHAO FOUNDATION", date: "September 2023 - Ongoing", img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000" },
        { title: "MANA", date: "October 2024", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000" },
      ]);

  const images = [
    "/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png", "/7.png", "/8.png", "/9.png", "/10.png",
    "/11.png", "/12.png", "/13.png", "/14.png", "/15.png", "/16.png", "/17.png", "/18.png", "/19.png", "/20.png",
    "/21.png", "/22.png", "/23.png", "/24.png", "/25.png", "/26.png", "/27.png", "/28.png", "/29.png", "/30.png",
    "/31.png", "/32.png", "/33.png", "/34.png", "/35.png",
  ];

  const animatedTestimonials = adminTestimonials.map(t => ({
    quote: t.content,
    name: t.clientName,
    designation: `${t.clientRole}${t.clientCompany ? ' at ' + t.clientCompany : ''}`,
    src: t.clientImage
  }));

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

    const payload = { clientName, role, company, message, star };
    try {
      const res = await createTestimonial(payload);
      if (res?.data) {
        const t = res.data;
        addTestimonial({
          clientName: t.clientName || clientName,
          clientRole: t.role || role || '',
          clientCompany: t.company || company || '',
          clientImage: '/placeholder-profile.png',
          content: t.message || message,
          rating: t.star || star || 5,
          status: t.status || 'pending',
          createdAt: t.createdAt || new Date().toISOString().split('T')[0],
        });
      } else {
        addTestimonial({
          clientName, clientRole: role || '', clientCompany: company || '', clientImage: '/placeholder-profile.png',
          content: message, rating: star || 5, status: 'pending', createdAt: new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      console.error('Failed to submit testimonial to server', err);
      addTestimonial({
        clientName, clientRole: role || '', clientCompany: company || '', clientImage: '/placeholder-profile.png',
        content: message, rating: star || 5, status: 'pending', createdAt: new Date().toISOString().split('T')[0],
      });
    }

    setClientName(''); setRole(''); setCompany(''); setMessage(''); setStar(5);
    setReviewSuccess('Thanks for your review! It will appear after approval.');
    setTimeout(() => setReviewSuccess(''), 3000);
  };

  return (
    <div className="w-full bg-[#e8e6d8] text-[#624a41] font-serif selection:bg-[#bdaf62] selection:text-white">

      {/* --- HERO SECTION WITH IMAGE SLIDER --- */}
      <section className="relative min-h-screen flex flex-col">
        {/* Image Slider */}
        <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
            <motion.div
              key={currentSlide}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.5 }, scale: { duration: 0.8 } }}
              className="absolute inset-0"
            >
              <img src={heroSliderImages[currentSlide].src} alt={heroSliderImages[currentSlide].alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#624a41]/40 via-transparent to-[#e8e6d8]" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button onClick={handlePrevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-[#e8e6d8]/20 backdrop-blur-sm border border-[#e8e6d8]/30 rounded-full text-[#e8e6d8] hover:bg-[#e8e6d8]/40 transition-all duration-300 group" aria-label="Previous slide">
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button onClick={handleNextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-[#e8e6d8]/20 backdrop-blur-sm border border-[#e8e6d8]/30 rounded-full text-[#e8e6d8] hover:bg-[#e8e6d8]/40 transition-all duration-300 group" aria-label="Next slide">
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
            {heroSliderImages.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-8 bg-[#e8e6d8]' : 'w-4 bg-[#e8e6d8]/40 hover:bg-[#e8e6d8]/60'}`} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-8 right-8 z-10 font-sans text-xs tracking-[0.3em] text-[#e8e6d8]/80">
            <span className="text-[#e8e6d8] font-medium">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(heroSliderImages.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Hero Content - Slides up from below */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 -mt-32 md:-mt-40 px-6 md:px-16 lg:px-24"
        >
          <div className="max-w-5xl">
            <motion.div initial={{ width: 0 }} animate={{ width: '4rem' }} transition={{ duration: 0.8, delay: 0.5 }} className="h-px bg-[#892f1a] mb-8" />
            <h1 className="text-4xl md:text-6xl lg:text-[80px] font-light leading-[1.1] mb-8 text-[#624a41]">
              {data?.hero?.headline ?? (<>Creating strategic, <span className="italic text-[#bdaf62]">confident</span> and timeless designs with <span className="italic text-[#892f1a]">you</span> at the centre.</>)}
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="font-sans text-sm md:text-base tracking-[0.25em] mb-10 text-[#624a41]/70 uppercase max-w-2xl">
              {data?.hero?.subHeadline ?? 'We ensure your brand feels like home to those it serves.'}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}>
              <Link href={data?.hero?.ctaLink ?? '/services'}>
                <button className="group flex items-center gap-4 bg-[#892f1a] text-[#e8e6d8] px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-[#624a41] transition-all duration-500 shadow-lg hover:shadow-xl">
                  {data?.hero?.ctaText ?? "Let's Get Started"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex-1 bg-[#e8e6d8] min-h-[30vh]" />
      </section>

      {/* --- STICKY WORK SHOWCASE --- */}
      <section className="bg-[#624a41] text-[#e8e6d8] py-32 px-8 md:px-20 relative">
        <div className={cn("absolute inset-0", "bg-size-[40px_40px]", "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]", "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]")} />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3 pr-8">
            <div className="sticky top-32 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#624a41] border border-[#bdaf62]/60 flex flex-col items-center justify-center text-center px-6 shadow-xl hover:scale-105 transition-transform duration-300">
                <h2 className="text-3xl md:text-4xl italic font-light leading-tight mb-4 text-[#e8e6d8]">Glimpse into<br />our work</h2>
                <div className="w-12 h-px bg-[#892f1a] mb-4"></div>
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#bdaf62]">Portfolio — 2026</p>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 space-y-40">
            {projects.map((proj: any, idx: number) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="group">
                <CardContainer className="inter-var md:w-full w-auto h-auto perspective-1000px">
                  <CardBody className="bg-transparent-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-black dark:border-white/[0.2] w-auto md:w-full sm:w-[30rem] rounded-xl p-6 border">
                    <CardItem translateZ="100" className="w-full h-64 mt-4">
                      <img src={proj.img} className="h-64 sm:h-64 md:h-72 w-full object-cover rounded-xl group-hover/card:shadow-xl" alt="thumbnail" />
                    </CardItem>
                  </CardBody>
                </CardContainer>
                <div className="flex flex-col border-l-2 border-[#892f1a] pl-6 transition-all duration-500 group-hover:pl-10 mt-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62] mb-3">{proj.date}</span>
                  <h3 className="text-4xl tracking-wide font-light">{proj.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <AnimatedTestimonials testimonials={animatedTestimonials} />

      {/* --- GIVE A REVIEW --- */}
      <section className="max-w-2xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-semibold mb-6">Give a Review</h3>
        <form onSubmit={submitReview} className="grid gap-3">
          <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Your name" className="rounded-md border px-4 py-2" />
          <div className="flex gap-3">
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role (e.g., Founder)" className="rounded-md border px-4 py-2 flex-1" />
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="rounded-md border px-4 py-2 flex-1" />
          </div>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" rows={4} className="rounded-md border px-4 py-2" />
          <div className="flex items-center gap-2">
            <div className="text-sm">Rating:</div>
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button" onClick={() => setStar(n)} className={`px-2 py-1 rounded ${star === n ? 'bg-[#892f1a] text-white' : 'bg-gray-100'}`}>{n}★</button>
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
          {(contentSections.find(s => s.id === 'home-stats')?.items ?? []).map((stat, i) => (
            <div key={stat.id || i}>
              <div className="text-6xl font-light mb-4 text-[#624a41]">{stat.title}</div>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] font-black text-[#bdaf62]">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white/40 pt-32 pb-12 px-8 md:px-20 border-t border-[#624a41]/10">
        <div className="flex flex-col md:flex-row justify-between gap-24 mb-32 max-w-7xl mx-auto">
          <div>
            <h3 className="text-5xl mb-12">{data?.footer?.heading ?? (<><span className="text-[#892f1a] italic">Ready to</span> elevate <br />your brand?</>)}</h3>
            <div className="flex pb-4 w-full md:w-96 group">
              <Link href={data?.footer?.ctaLink ?? '/contact'} className="no-underline">
                <button className="flex items-center gap-4 bg-[#892f1a] text-white px-6 py-3 text-[10px] uppercase tracking-[0.4em] hover:bg-[#624a41] transition-all duration-500 shadow-xl">{data?.footer?.ctaText ?? 'Contact Us'}</button>
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