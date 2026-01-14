'use client';
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from 'next/link';
import { Heart, Lightbulb, Users, Rocket, Twitter, Linkedin, Instagram, Mail, ArrowRight, Trophy, Star, Sparkles } from "lucide-react";

const DEFAULT_VALUES = [
  {
    icon: Heart,
    title: 'Authenticity',
    description: 'Being genuine in every interaction, building trust through transparency and honesty.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Constantly pushing boundaries to find creative solutions that make real impact.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Fostering connections and lifting others up. Success is better when shared.',
  },
  {
    icon: Rocket,
    title: 'Excellence',
    description: 'Never settling for good enough. Every detail matters in the pursuit of greatness.',
  },
];

const DEFAULT_AWARDS = [
  { year: '2014', title: 'Best Startup Award', description: 'Recognized as the most innovative startup of the year.' },
  { year: '2016', title: 'Design Excellence', description: 'Won first place for outstanding visual design.' },
  { year: '2018', title: 'Innovation Leader', description: 'Awarded for breakthrough technology solutions.' },
  { year: '2020', title: 'Global Impact', description: 'Recognized for worldwide positive influence.' },
  { year: '2023', title: 'Industry Pioneer', description: 'Leading the industry with cutting-edge solutions.' },
];

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

const FloatingParticle = ({ delay, x, duration }: { delay: number; x: number; duration: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full opacity-60"
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

  // Default content (replace with your AdminContext if needed)
  const firstName = 'Alexandra';
  const lastName = 'Mitchell';
  const heroSubtitle = 'Founder & Visionary';
  const heroDescription = 'Building the future of digital experiences, one meaningful connection at a time.';
  const heroImage = 'https://img.freepik.com/free-vector/rainbow-coloured-hand-painted-watercolour-splatter-design_1048-20680.jpg?semt=ais_hybrid&w=740&q=80';
  const heroButtonText = 'View Our Services';
  const heroButtonLink = '/services';
  const heroSecondaryText = 'Follow Us';
  const heroSecondaryLink = 'https://www.instagram.com/bloom.branding_/';
  const values = DEFAULT_VALUES;
  const awards = DEFAULT_AWARDS;

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-12 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="order-2 lg:order-1">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-block text-sm tracking-[0.3em] uppercase text-amber-900 mb-6 font-medium">
                {heroSubtitle}
              </motion.span>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.1] mb-8">
                {firstName}
                <span className="block italic text-amber-900 mt-2">{lastName}</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="text-lg text-gray-600 leading-relaxed max-w-xl mb-10">
                {heroDescription}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="flex flex-wrap gap-4">
                <a href="#story" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-900 text-white font-medium rounded-full transition-all duration-300 hover:bg-amber-800 hover:scale-105">
                  Read My Story
                </a>
                <a href="#connect" className="inline-flex items-center gap-2 px-8 py-4 border border-gray-900 text-gray-900 font-medium rounded-full transition-all duration-300 hover:bg-gray-900 hover:text-white">
                  Let's Connect
                </a>
                <Link href={heroButtonLink}>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-xl">
                    {heroButtonText}
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
                <a href={heroSecondaryLink} target="_blank" rel="noopener noreferrer">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-black/5">
                    {heroSecondaryText}
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full border-2 border-amber-900 rounded-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-300/20 rounded-full" />
                <img src={heroImage} alt={`${firstName} ${lastName}`} className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover aspect-[3/4]" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-4 -right-4 z-20 bg-white px-6 py-4 rounded-xl shadow-lg">
                  <span className="block text-2xl font-semibold text-amber-900">10+</span>
                  <span className="text-sm text-gray-500">Years of Impact</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 lg:py-32 bg-gray-100 relative overflow-hidden" ref={storyRef}>
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={storyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-amber-900 mb-4">The Journey</span>
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900">My Story</h2>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <motion.blockquote initial={{ opacity: 0, y: 40 }} animate={storyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="text-2xl md:text-3xl italic text-gray-900 leading-relaxed mb-12 pl-8 border-l-4 border-amber-900">
              I believe that every challenge is an opportunity to create something extraordinary.
            </motion.blockquote>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={storyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="grid md:grid-cols-2 gap-12">
              <p className="text-gray-600 leading-relaxed">It all started in a small home office with a simple idea: what if we could make technology more human? Fresh out of university, I was fascinated by the intersection of human behavior and digital experiences.</p>
              <p className="text-gray-600 leading-relaxed">Today, our company serves over 10 million users worldwide, but what brings me the most joy isn't the numbers—it's the stories of real impact we've made.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 relative" ref={valuesRef}>
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-amber-900 mb-4">What Drives Me</span>
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900">Core Values</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 40 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.15 }} className="group">
                <div className="h-full p-8 bg-white rounded-2xl border border-gray-200 transition-all duration-500 hover:border-amber-900 hover:shadow-xl hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-amber-900/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-amber-100 group-hover:scale-110">
                    <value.icon className="w-7 h-7 text-amber-900" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section - NEW */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" ref={awardsRef}>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.5} x={Math.random() * 100} duration={3 + Math.random() * 2} />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={awardsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
            <motion.div initial={{ scale: 0 }} animate={awardsInView ? { scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.2, type: "spring" }} className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 mb-6 shadow-lg shadow-amber-500/30">
              <Trophy className="w-10 h-10 text-slate-900" />
            </motion.div>
            <span className="block text-sm tracking-[0.3em] uppercase text-amber-400 mb-4 font-medium">Recognition & Achievements</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200">Award Wins</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={award.year}
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                animate={awardsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredAward(index)}
                onMouseLeave={() => setHoveredAward(null)}
                className="relative group perspective-1000"
              >
                <div className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${hoveredAward === index ? 'bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border-amber-400/50 shadow-2xl shadow-amber-500/20 -translate-y-2' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  {hoveredAward === index && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-1 -right-1">
                      <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                    </motion.div>
                  )}
                  <div className="flex items-start gap-4">
                    <motion.div animate={hoveredAward === index ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}} transition={{ duration: 0.5 }} className={`p-3 rounded-xl transition-all duration-300 ${hoveredAward === index ? 'bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/30' : 'bg-amber-500/20'}`}>
                      <Trophy className={`w-6 h-6 transition-colors duration-300 ${hoveredAward === index ? 'text-slate-900' : 'text-amber-400'}`} />
                    </motion.div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 mb-2">{award.year}</span>
                      <h3 className="text-lg font-semibold text-white mb-2">{award.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{award.description}</p>
                      <div className="flex gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={awardsInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}>
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-block text-sm tracking-[0.3em] uppercase text-yellow-300 mb-4">
              Get In Touch
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
              Let's Create Something
              <span className="block italic text-yellow-300">Extraordinary</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg text-white/70 mb-12 max-w-xl mx-auto">
              Whether you have a project in mind, want to collaborate, or just want to say hello—I'd love to hear from you.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href="mailto:hello@example.com" className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-900 text-white font-medium rounded-full transition-all duration-300 hover:bg-amber-800 hover:scale-105">
                Send a Message
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#" className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium rounded-full transition-all duration-300 hover:bg-white/10">
                Schedule a Call
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }} className="flex items-center justify-center gap-6">
              {socials.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-110">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutFounder;