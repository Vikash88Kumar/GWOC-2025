"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import Link from 'next/link';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { useAdmin } from "@/contexts/AdminContext";

// API Imports
import { createTestimonial, getAllTestimonials } from "../services/testimonial.api.js"
import { getHomePage } from "../services/homepage.api.js"

const HomePage = () => {
  const [data, setData] = useState<any>({});
  
  // --- STATE FOR TESTIMONIALS ---
  const [dbTestimonials, setDbTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- STATE FOR FORM ---
  const [clientName, setClientName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [star, setStar] = useState<number>(5);
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- SLIDER STATE ---
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- 1. FETCH DATA ---
  const fetchData = async () => {
    try {
      // Fetch Home Data
      const homeRes = await getHomePage();
      setData(homeRes?.data ?? homeRes);

      // Fetch Testimonials
      const testimonialRes = await getAllTestimonials();
      
      // Handle different response structures
      let fetchedList = [];
      if (testimonialRes?.data?.data) {
        fetchedList = testimonialRes.data.data;
      } else if (testimonialRes?.data) {
        fetchedList = testimonialRes.data;
      } else if (Array.isArray(testimonialRes)) {
        fetchedList = testimonialRes;
      }
      
      setDbTestimonials(fetchedList);

    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- 2. SUBMIT REVIEW ---
  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!clientName.trim() || !message.trim()) {
      setReviewSuccess('Please add your name and message.');
      setTimeout(() => setReviewSuccess(''), 3000);
      return;
    }

    setIsSubmitting(true);
    
    const payload = { 
        clientName, 
        role, 
        company, 
        message, 
        star: star || 5 
    };

    try {
      const res = await createTestimonial(payload);
      
      if (res) {
        setReviewSuccess('Thanks for your review! It has been submitted for approval.');
        
        // Clear form
        setClientName('');
        setRole('');
        setCompany('');
        setMessage('');
        setStar(5);
        
        // Optional: Refresh list (though new reviews are usually "pending" and won't show immediately)
        // fetchData(); 
      }
    } catch (err: any) {
      console.error('Failed to submit testimonial:', err);
      // Check if it's an auth error
      if (err.response?.status === 401 || err.response?.status === 403) {
        setReviewSuccess('Please login to submit a review.');
      } else {
        setReviewSuccess('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setReviewSuccess(''), 4000);
    }
  };

  // --- 3. SLIDER LOGIC ---
  const heroImages = Array.isArray(data?.hero?.backgroundImage)
    ? data.hero.backgroundImage
    : data?.hero?.backgroundImage 
        ? [data.hero.backgroundImage] 
        : ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"];

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // --- 4. PREPARE DATA FOR UI ---
  const { contentSections, testimonials: adminTestimonials } = useAdmin();
  
  // Projects Logic
  const projectsSection = contentSections.find(s => s.id === 'home-projects');
  const apiProjects = (data?.projects?.items ?? []).map((it: any) => ({
    title: it.title || '',
    date: it.subtitle || '',
    img: it.image || '',
    id: it._id
  }));

  const projects = apiProjects.length
    ? apiProjects
    : (projectsSection?.items?.map(it => ({ title: it.title || '', date: it.subtitle || '', img: it.image || '' })) ?? []);

  // Testimonials Logic (Merge DB and Local)
  // Only show Active/Approved testimonials from DB
  const validDbTestimonials = dbTestimonials.filter(t => t.status === 'approved' || t.isActive === true);
  
  const sourceTestimonials = validDbTestimonials.length > 0 ? validDbTestimonials : adminTestimonials;

  const animatedTestimonials = sourceTestimonials.map(t => {
    const name = t.clientName || t.user?.fullName || "Client";
    const companyName = t.company || t.user?.companyName || "";
    const roleName = t.role || "";
    
    // Construct designation safely
    let designation = roleName;
    if (companyName) {
        designation = roleName ? `${roleName} at ${companyName}` : companyName;
    }

    return {
      quote: t.message || t.content || "",
      name: name,
      designation: designation,
      src: t.clientImage || t.user?.avatar || '/placeholder-profile.png'
    };
  });

  const images = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"]; // Truncated for brevity

  return (
    <div className="w-full bg-[#e8e6d8] text-[#624a41] font-serif selection:bg-[#bdaf62] selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentSlide}
              src={heroImages[currentSlide]}
              alt="Hero Background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[#892f1a]/40 mix-blend-multiply z-[1]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#624a41]/60 via-transparent to-[#e8e6d8] z-[2]"></div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="w-full py-32 px-8 md:px-20 grid md:grid-cols-1 gap-20 items-center bg-[#e8e6d8]">
         <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative flex w-full items-center justify-center">
                 <DottedGlowBackground className="pointer-events-none opacity-20" />
                 <div className="w-full relative z-10 flex flex-col items-center justify-between space-y-6 px-4 md:px-40 py-16 text-center">
                    <h1 className="text-5xl md:text-[85px] font-light leading-[1.05] mb-10 text-[#624a41]">
                       {data?.hero?.headline ?? "Creating strategic designs"}
                    </h1>
                     <Link href={data?.hero?.ctaLink ?? '/services'}>
                        <motion.button whileHover={{ scale: 1.05 }} className="px-10 py-4 text-[10px] rounded-xl uppercase tracking-[0.4em] bg-[#892f1a] text-white shadow-xl">
                           {data?.hero?.ctaText ?? "Let's Get Started"}
                        </motion.button>
                     </Link>
                 </div>
            </div>
         </motion.div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="bg-[#624a41] text-[#e8e6d8] py-32 px-8 md:px-20 relative">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 relative z-10">
            <div className="md:w-1/3 pr-8">
               <div className="sticky top-32 flex justify-center flex-col">
                  <h2 className="text-5xl font-light mb-6">{data?.projects?.heading ?? "Glimpse into our work"}</h2>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62]">{data?.projects?.subHeading ?? "Selected Works"}</p>
               </div>
            </div>
            <div className="md:w-2/3 space-y-40">
               {projects.map((proj: any, idx: number) => (
                  <motion.div key={proj.id || idx} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                     <CardContainer className="inter-var w-full">
                        <CardBody className="bg-transparent relative group/card w-full h-auto rounded-xl p-6 border border-white/10">
                           <CardItem translateZ="100" className="w-full mt-4">
                              <img src={proj.img} className="h-64 md:h-72 w-full object-cover rounded-xl" alt="thumbnail" />
                           </CardItem>
                        </CardBody>
                     </CardContainer>
                     <div className="flex flex-col border-l-2 border-[#892f1a] pl-6 mt-8">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62] mb-3">{proj.date}</span>
                        <h3 className="text-4xl tracking-wide font-light">{proj.title}</h3>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- TESTIMONIALS DISPLAY --- */}
      <AnimatedTestimonials testimonials={animatedTestimonials} />

      {/* --- GIVE A REVIEW FORM --- */}
      <section className="py-32 px-8 md:px-20 bg-[#e8e6d8] relative border-t border-[#624a41]/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#bdaf62] font-bold block mb-4">Feedback</span>
            <h3 className="text-4xl md:text-5xl font-light text-[#624a41] mb-6">Share your experience</h3>
            <div className="h-px w-24 bg-[#892f1a] mx-auto opacity-50"></div>
          </div>

          <form onSubmit={submitReview} className="space-y-12">
            
            {/* 1. Name Input (ADDED) */}
            <div className="group relative">
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-[#624a41]/20 py-4 text-[#624a41] placeholder-transparent focus:outline-none focus:border-[#892f1a] transition-colors font-serif text-xl"
                id="nameInput"
                required // Ensure browser checks this too
              />
              <label htmlFor="nameInput" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] text-[#624a41]/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#624a41]/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#892f1a]">
                Your Name *
              </label>
            </div>

            {/* 2. Role Input */}
            <div className="group relative">
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-[#624a41]/20 py-4 text-[#624a41] placeholder-transparent focus:outline-none focus:border-[#892f1a] transition-colors font-serif text-xl"
                id="roleInput"
              />
              <label htmlFor="roleInput" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] text-[#624a41]/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#624a41]/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#892f1a]">
                Your Role
              </label>
            </div>

            {/* 3. Company Input (ADDED) */}
            <div className="group relative">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-[#624a41]/20 py-4 text-[#624a41] placeholder-transparent focus:outline-none focus:border-[#892f1a] transition-colors font-serif text-xl"
                id="companyInput"
              />
              <label htmlFor="companyInput" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] text-[#624a41]/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#624a41]/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#892f1a]">
                Company Name
              </label>
            </div>

            {/* 4. Message Area */}
            <div className="group relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=" "
                rows={4}
                className="peer w-full bg-transparent border-b border-[#624a41]/20 py-4 text-[#624a41] placeholder-transparent focus:outline-none focus:border-[#892f1a] transition-colors font-serif text-xl resize-none"
                id="messageInput"
                required
              />
              <label htmlFor="messageInput" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] text-[#624a41]/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#624a41]/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#892f1a]">
                Your Message *
              </label>
            </div>

            {/* 5. Rating & Submit */}
            <div className="flex flex-col items-center gap-10 mt-12">
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#624a41]/40">Rating</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setStar(n)} className="transition-transform hover:scale-110 focus:outline-none">
                      <Star size={24} className={cn("transition-colors duration-300", star && n <= star ? "fill-[#892f1a] text-[#892f1a]" : "text-[#624a41]/20")} />
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="bg-[#624a41] text-[#e8e6d8] px-12 py-4 text-[10px] uppercase tracking-[0.4em] hover:bg-[#892f1a] transition-all duration-500 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </motion.button>

              <AnimatePresence>
                {reviewSuccess && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[#892f1a] font-serif italic text-lg">
                    {reviewSuccess}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </section>

      {/* --- FOOTER MARQUEE --- */}
      <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10">
        <ThreeDMarquee images={images} />
      </div>
    </div>
  );
};

export default HomePage;