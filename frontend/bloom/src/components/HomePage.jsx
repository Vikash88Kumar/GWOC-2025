import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Instagram, Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import PortfolioPreview from './PortfolioPreview';
import TestimonialSection from './TestimonialSection';
import ClientLogos from './ClientLogos';
import InstagramPreview from './InstagramPreview';
import Footer from './Footer';
import Showcase from './showCase';

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const services = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Brand Strategy',
      description: 'Strategic storytelling that makes your brand unforgettable',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Content Creation',
      description: 'High-impact content that drives engagement and growth',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Social Media Branding',
      description: 'Building digital presence that converts followers to customers',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Production',
      description: 'End-to-end production for memorable brand experiences',
    },
  ];

  const stats = [
    { value: '5+', label: 'Years of Experience' },
    { value: '100+', label: 'Happy Clients' },
    { value: '250+', label: 'Projects Completed' },
    { value: '15+', label: 'Awards Won' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
<section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
  {/* --- Background Video Container --- */}
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute w-full 
               /* 1. Make the video taller than the container */
               h-[120%] 
               /* 2. Scale it up slightly to prevent side-gaps */
               scale-110 
               /* 3. Shift it up to 'cut' the top part */
               -top-20 md:-top-40
               left-0 object-cover"
    >
      {/* Note: In Vite/React, files in 'public' are served from '/' root */}
      <source src="/main_video.mp4" type="video/mp4" />
    </video>
  </div>

  {/* --- Dark Overlay --- */}
  <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-10" />

  {/* --- Content Container --- */}
  <motion.div
    style={{ opacity, scale }}
    /* ADJUST TEXT POSITION: 
       - pt-20 moves it down on mobile 
       - md:pt-0 centers it on desktop
    */
    className="max-w-6xl mx-auto px-6 text-center relative z-20 pt-20 md:pt-0"
  >
    {/* --- Badge --- */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-block mb-4 md:mb-8"
    >
      <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] md:text-sm tracking-widest uppercase">
        ✨ Blooming Brands Since 2020
      </span>
    </motion.div>

    {/* --- Responsive Buttons --- */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      /* flex-col for mobile (stacked), sm:flex-row for desktop (side-by-side) */
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      <Link to="/contact" className="w-full sm:w-auto">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold rounded-full flex items-center justify-center gap-2 transition-all shadow-xl"
        >
          Start Your Journey
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </Link>
      
      <Link to="/our-story" className="w-full sm:w-auto">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto px-10 py-4 border border-amber-500/40 text-amber-500 rounded-full transition-colors "
        >
          Our Story
        </motion.button>
      </Link>
    </motion.div>
  </motion.div>
</section>

      {/* Services Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl mb-6">
              What We{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Offer
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Comprehensive branding solutions designed to make your brand stand out
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:shadow-lg group-hover:shadow-pink-500/50 transition-shadow"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-white/60">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 border border-pink-500/30 rounded-full hover:bg-pink-500/10 transition-colors inline-flex items-center gap-2"
              >
                Explore All Services
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
            <Showcase/>
      {/* Portfolio Preview */}
      <PortfolioPreview />

      {/* Stats / Our Journey Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Growing brands, one bloom at a time
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Client Logos */}
      <ClientLogos />

      {/* Instagram Preview */}
      <InstagramPreview />

      {/* Footer */}
      <Footer />
    </div>
  );
}
