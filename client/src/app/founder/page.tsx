'use client';
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from 'next/link';
import { 
  Heart, Lightbulb, Users, Rocket, Twitter, Linkedin, Instagram, Mail, 
  ArrowRight, Trophy, Star, Sparkles, Brain 
} from "lucide-react";

// --- 1. YOUR BACKEND DATA (Simulating the API response) ---
const BACKEND_DATA = {
    "statusCode": 200,
    "data": {
        "hero": {
            "role": "Founder & Creative Director",
            "firstName": "Elena",
            "lastName": "Vance",
            "tagline": "Crafting narratives that bridge the gap between strategic thinking and artistic expression.",
            "experienceYears": 8,
            "profileImage": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
        },
        "story": {
            "quote": "Design is not just about how it looks, but how it works and how it makes people feel.",
            "paragraphs": [
                "My journey began not in a design studio, but with a sketchbook and a fascination for how colors influence emotions. Over the last decade, I have honed my craft working with global agencies, learning that great design is 10% inspiration and 90% problem-solving.",
                "I founded this studio with a singular mission: to strip away the noise and focus on the essence of a brand. I believe that in a crowded digital landscape, clarity is the ultimate sophistication.",
                "We don't just build websites or logos; we build digital homes for businesses. My approach is deeply collaborative, ensuring that every pixel serves a purpose and every interaction tells a part of your story.",
                "When I am not designing, you can find me exploring modern art galleries, brewing the perfect cup of coffee, or mentoring young designers to help them find their unique voice."
            ]
        },
        "connect": {
            "headline": "Let's build something timeless.",
            "subHeadline": "I am currently open for collaborations, speaking engagements, and coffee chats.",
            "email": "hello@elenavance.com",
            "socials": [
                { "label": "LinkedIn", "url": "https://linkedin.com" },
                { "label": "Twitter", "url": "https://twitter.com" },
                { "label": "Instagram", "url": "https://instagram.com" }
            ]
        },
        "_id": "6961fa96cdfce056790da331",
        "values": [
            {
                "title": "Authenticity First",
                "description": "We believe in honest design that accurately reflects the soul of the brand, avoiding trends for the sake of trends.",
                "icon": "Heart"
            },
            {
                "title": "Strategic Depth",
                "description": "Every creative decision is backed by research and strategy. We design for results, not just for applause.",
                "icon": "Brain"
            },
            {
                "title": "Collaborative Spirit",
                "description": "We view our clients as partners. The best work happens when we build together.",
                "icon": "Users"
            }
        ],
        "awards": [
            {
                "title": "Best Visual Identity",
                "description": "Awarded by the Digital Design Council for the rebranding of EcoLife.",
                "year": 2021
            },
            {
                "title": "Web Excellence Award",
                "description": "Recognition for outstanding UI/UX design in the e-commerce sector.",
                "year": 2023
            }
        ]
    },
    "message": "Founder page created/updated successfully",
    "success": true
};

// --- 2. ICON MAPPER ---
// Helper to convert backend string names to React Components
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
  return map[iconName] || Lightbulb; // Default to Lightbulb if not found
};

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

  // --- 3. EXTRACT DATA FROM RESPONSE ---
  const { hero, story, connect, values, awards } = BACKEND_DATA.data;

  // Constants that weren't in JSON but needed for UI
  const heroButtonText = 'View Our Services';
  const heroButtonLink = '/services';
  const heroSecondaryText = 'Follow Us';
  // Use first social link or default
  const heroSecondaryLink = connect.socials[0]?.url || '#';

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
                {hero.role}
              </motion.span>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.1] mb-8">
                {hero.firstName}
                <span className="block italic text-amber-900 mt-2">{hero.lastName}</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="text-lg text-gray-600 leading-relaxed max-w-xl mb-10">
                {hero.tagline}
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
                <img src={hero.profileImage} alt={`${hero.firstName} ${hero.lastName}`} className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover aspect-[3/4]" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-4 -right-4 z-20 bg-white px-6 py-4 rounded-xl shadow-lg">
                  <span className="block text-2xl font-semibold text-amber-900">{hero.experienceYears}+</span>
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
              {story.quote}
            </motion.blockquote>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={storyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="grid md:grid-cols-2 gap-12">
              {/* Dynamically Map Story Paragraphs */}
              {story.paragraphs.map((para, idx) => (
                 <p key={idx} className="text-gray-600 leading-relaxed">{para}</p>
              ))}
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
            {values.map((value, index) => {
              const IconComponent = getIcon(value.icon);
              return (
                <motion.div key={value.title} initial={{ opacity: 0, y: 40 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.15 }} className="group">
                  <div className="h-full p-8 bg-white rounded-2xl border border-gray-200 transition-all duration-500 hover:border-amber-900 hover:shadow-xl hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-xl bg-amber-900/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-amber-100 group-hover:scale-110">
                      <IconComponent className="w-7 h-7 text-amber-900" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards Section */}
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
              {connect.headline}
              <span className="block italic text-yellow-300">Extraordinary</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg text-white/70 mb-12 max-w-xl mx-auto">
              {connect.subHeadline}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href={`mailto:${connect.email}`} className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-900 text-white font-medium rounded-full transition-all duration-300 hover:bg-amber-800 hover:scale-105">
                Send a Message
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#" className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium rounded-full transition-all duration-300 hover:bg-white/10">
                Schedule a Call
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={connectInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }} className="flex items-center justify-center gap-6">
              {/* Combine Socials with Email Icon if needed, or just list Socials */}
              {connect.socials.map((social) => {
                const IconComponent = getIcon(social.label);
                return (
                  <a key={social.label} href={social.url} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-110">
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
              {/* Manual Email Icon for Social List */}
              <a href={`mailto:${connect.email}`} aria-label="Email" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-110">
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