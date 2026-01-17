'use client';

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react"; // Added useEffect
import Link from 'next/link';
import {
  Heart, Lightbulb, Users, Rocket, Twitter, Linkedin, Instagram, Mail,
  ArrowRight, Trophy, Star, Sparkles, Brain, Loader2
} from "lucide-react";

// 1. IMPORT YOUR API FUNCTION
// Make sure this path points correctly to where you saved your api file
import { getFounderPage } from "../../services/founder.api.js"; 

// --- ICON MAPPER ---
const getIcon = (iconName: string) => {
  const map: { [key: string]: any } = {
    Heart: Heart,
    Brain: Brain,
    Users: Users,
    Lightbulb: Lightbulb,
    Rocket: Rocket,
    Twitter: Twitter,
    LinkedIn: Linkedin,
    Instagram: Instagram,
    Mail: Mail
  };
  return map[iconName] || Lightbulb;
};

const FloatingParticle = ({ delay, x, duration }: { delay: number; x: number; duration: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-[var(--butter-yellow)] to-[var(--electric-rust)] rounded-full opacity-60"
    style={{ left: `${x}%` }}
    animate={{ y: [0, -100, -200], opacity: [0, 0.8, 0], scale: [0, 1, 0.5] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

const AboutFounder = () => {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const awardsRef = useRef(null);
  const connectRef = useRef(null);
  const [hoveredAward, setHoveredAward] = useState<number | null>(null);

  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const awardsInView = useInView(awardsRef, { once: true, margin: '-100px' });
  const connectInView = useInView(connectRef, { once: true, margin: '-100px' });

  // --- 2. STATE MANAGEMENT ---
  const [data, setData] = useState<any>(null); // Holds the API data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState<string | null>(null); // Tracks errors

  // --- 3. FETCH DATA ON MOUNT ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFounderPage();
        
        // Check structure: response might be { data: { hero: ... } } or just { hero: ... }
        // Based on your hardcoded example, data was inside a 'data' key.
        // If your API returns the whole object, access response.data
        setData(response.data || response); 
      } catch (err) {
        console.error("Error loading founder page:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- 4. LOADING STATE UI ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--earth-gray)] text-[var(--dark-chocolate)]">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--electric-rust)]" />
            <p>Loading Founder Story...</p>
        </div>
      </div>
    );
  }

  // --- 5. ERROR STATE UI ---
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--earth-gray)] text-red-600">
        <p>{error || "No data available."}</p>
      </div>
    );
  }

  // --- 6. DESTRUCTURE DATA ---
  // Now we use 'data' from state instead of 'BACKEND_DATA'
  const { hero, story, connect, values, awards } = data;

  // Safety checks (optional but recommended in case API returns partial data)
  const heroButtonText = 'View Our Services';
  const heroButtonLink = '/services';
  const heroSecondaryText = 'Follow Us';
  // Use optional chaining (?.) to prevent crashes if socials are missing
  const heroSecondaryLink = connect?.socials?.[0]?.url || '#';

  return (
    <div className="min-h-screen bg-[var(--earth-gray)] scroll-smooth font-body text-[var(--dark-chocolate)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--electric-rust)]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-[var(--butter-yellow)]/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-12 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="order-2 lg:order-1">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-block text-sm tracking-[0.3em] uppercase text-[var(--electric-rust)] mb-6 font-medium">
                {hero?.role}
              </motion.span>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-[var(--dark-chocolate)] leading-[1.1] mb-8">
                {hero?.firstName}
                <span className="block italic text-[var(--electric-rust)] mt-2">{hero?.lastName}</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="text-lg text-[var(--dark-chocolate)]/80 leading-relaxed max-w-xl mb-10 font-body">
                {hero?.tagline}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="flex flex-wrap gap-4">
                
                <Link href={heroButtonLink}>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-[var(--dark-chocolate)] px-8 py-4 font-semibold text-[var(--earth-gray)] transition-all duration-300 hover:shadow-xl">
                    {heroButtonText}
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
                <a href={heroSecondaryLink} target="_blank" rel="noopener noreferrer">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--dark-chocolate)] px-8 py-4 font-semibold text-[var(--dark-chocolate)] transition-all duration-300 hover:bg-[var(--dark-chocolate)]/5">
                    {heroSecondaryText}
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full border-2 border-[var(--electric-rust)] rounded-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--butter-yellow)]/20 rounded-full" />
                {hero?.profileImage && (
                    <img src={hero.profileImage} alt={`${hero.firstName} ${hero.lastName}`} className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover aspect-[3/4] grayscale-[0.2] hover:grayscale-0 transition-all duration-500" />
                )}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-4 -right-4 z-20 bg-[var(--earth-gray)] px-6 py-4 rounded-xl shadow-lg border border-[var(--dark-chocolate)]/10">
                  <span className="block text-2xl font-semibold text-[var(--electric-rust)]">{hero?.experienceYears}+</span>
                  <span className="text-sm text-[var(--dark-chocolate)]/70">Years of Impact</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 lg:py-32 bg-[var(--earth-gray)] relative overflow-hidden" ref={storyRef}>
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={storyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-[var(--electric-rust)] mb-4">The Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-[var(--dark-chocolate)]">My Story</h2>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <motion.blockquote initial={{ opacity: 0, y: 40 }} animate={storyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="font-display text-2xl md:text-3xl italic text-[var(--dark-chocolate)] leading-relaxed mb-12 pl-8 border-l-4 border-[var(--electric-rust)]">
              {story?.quote}
            </motion.blockquote>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={storyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="grid md:grid-cols-2 gap-12 text-[var(--dark-chocolate)]/80">
              {story?.paragraphs?.map((para: string, idx: number) => (
                <p key={idx} className="leading-relaxed">{para}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 relative" ref={valuesRef}>
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-[var(--electric-rust)] mb-4">What Drives Me</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-[var(--dark-chocolate)]">Core Values</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values?.map((value: any, index: number) => {
              const IconComponent = getIcon(value.icon);
              return (
                <motion.div key={value.title} initial={{ opacity: 0, y: 40 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.15 }} className="group">
                  <div className="h-full p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-[var(--dark-chocolate)]/10 transition-all duration-500 hover:border-[var(--electric-rust)] hover:shadow-xl hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-xl bg-[var(--butter-yellow)]/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[var(--butter-yellow)] group-hover:scale-110">
                      <IconComponent className="w-7 h-7 text-[var(--dark-chocolate)]" />
                    </div>
                    <h3 className="font-display text-xl font-medium text-[var(--dark-chocolate)] mb-3">{value.title}</h3>
                    <p className="text-[var(--dark-chocolate)]/70 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards Section - Dark Theme */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[var(--dark-chocolate)]" ref={awardsRef}>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.5} x={Math.random() * 100} duration={3 + Math.random() * 2} />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--electric-rust)]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={awardsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
            <motion.div initial={{ scale: 0 }} animate={awardsInView ? { scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.2, type: "spring" }} className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--butter-yellow)] mb-6 shadow-lg shadow-[var(--butter-yellow)]/30">
              <Trophy className="w-10 h-10 text-[var(--dark-chocolate)]" />
            </motion.div>
            <span className="block text-sm tracking-[0.3em] uppercase text-[var(--butter-yellow)] mb-4 font-medium">Recognition & Achievements</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--earth-gray)]">Award Wins</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {awards?.map((award: any, index: number) => (
              <motion.div
                key={award.year}
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                animate={awardsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredAward(index)}
                onMouseLeave={() => setHoveredAward(null)}
                className="relative group perspective-1000"
              >
                <div className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${hoveredAward === index ? 'bg-[var(--electric-rust)]/20 border-[var(--butter-yellow)]/50 shadow-2xl -translate-y-2' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  {hoveredAward === index && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-1 -right-1">
                      <Sparkles className="w-6 h-6 text-[var(--butter-yellow)] animate-pulse" />
                    </motion.div>
                  )}
                  <div className="flex items-start gap-4">
                    <motion.div animate={hoveredAward === index ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}} transition={{ duration: 0.5 }} className={`p-3 rounded-xl transition-all duration-300 ${hoveredAward === index ? 'bg-[var(--butter-yellow)] shadow-lg' : 'bg-[var(--butter-yellow)]/20'}`}>
                      <Trophy className={`w-6 h-6 transition-colors duration-300 ${hoveredAward === index ? 'text-[var(--dark-chocolate)]' : 'text-[var(--butter-yellow)]'}`} />
                    </motion.div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[var(--butter-yellow)]/20 text-[var(--butter-yellow)] mb-2">{award.year}</span>
                      <h3 className="font-display text-lg font-semibold text-[var(--earth-gray)] mb-2">{award.title}</h3>
                      <p className="text-sm text-[var(--earth-gray)]/70 leading-relaxed">{award.description}</p>
                      <div className="flex gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={awardsInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}>
                            <Star className="w-4 h-4 fill-[var(--butter-yellow)] text-[var(--butter-yellow)]" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
    <section id="connect" className="py-24 lg:py-32 relative overflow-hidden" ref={connectRef}>
      <div className="absolute inset-0  bg-[var(--earth-gray)]" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-block text-sm tracking-[0.3em] uppercase text-[var(--dark-chocolate)] mb-4">
            Get In Touch
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--dark-chocolate)] mb-6">
            {connect?.headline}
            <span className="block italic text-[var(--dark-chocolate)]">Extraordinary</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg text-[var(--dark-chocolate)]/80 mb-12 max-w-xl mx-auto">
            {connect?.subHeadline}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href={`mailto:${connect?.email}`} className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--butter-yellow)] text-[var(--dark-chocolate)] font-medium rounded-full transition-all duration-300 hover:scale-105">
              Send a Message
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#" className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--earth-gray)]/30 text-[var(--dark-chocolate)] font-medium rounded-full transition-all duration-300 hover:bg-[var(--earth-gray)]/10">
              Schedule a Call
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }} className="flex items-center justify-center gap-6">
            {connect?.socials?.map((social: any) => {
              const IconComponent = getIcon(social.label);
              return (
                <a key={social.label} href={social.url} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-[var(--earth-gray)]/30 flex items-center justify-center text-[var(--dark-chocolate)]/70 transition-all duration-300 hover:bg-[var(--earth-gray)] hover:text-[var(--dark-chocolate)] hover:scale-110">
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
            <a href={`mailto:${connect?.email}`} aria-label="Email" className="w-12 h-12 rounded-full border border-[var(--earth-gray)]/30 flex items-center justify-center text-[var(--dark-chocolate)]/70 transition-all duration-300 hover:bg-[var(--earth-gray)] hover:text-[var(--dark-chocolate)] hover:scale-110">
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutFounder;