'use client';
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Rocket, Users, Award, Globe, Sparkles, TrendingUp } from "lucide-react";
import { useRef } from "react";

const milestones = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Founded with a vision to revolutionize brand storytelling. Started with just 3 passionate creatives.",
    icon: Rocket,
    highlight: "butter",
  },
  {
    year: "2019",
    title: "First Major Client",
    description: "Landed our first enterprise client, delivering a complete brand transformation that increased their market presence by 200%.",
    icon: Award,
    highlight: "electric",
  },
  {
    year: "2020",
    title: "Team Expansion",
    description: "Grew to 15 team members. Pivoted to remote-first culture, expanding our talent pool globally.",
    icon: Users,
    highlight: "butter",
  },
  {
    year: "2021",
    title: "Going Global",
    description: "Opened virtual offices across 3 continents. Served clients in 12+ countries with localized marketing strategies.",
    icon: Globe,
    highlight: "electric",
  },
  {
    year: "2023",
    title: "Innovation Award",
    description: "Recognized as 'Most Innovative Marketing Agency' for our AI-powered design solutions.",
    icon: Sparkles,
    highlight: "butter",
  },
  {
    year: "2024",
    title: "New Horizons",
    description: "Launching new service verticals and partnerships. 50+ happy clients and counting.",
    icon: TrendingUp,
    highlight: "electric",
  },
];

const Timeline = () => {
  const containerRef = useRef(null);
  
  // Scroll tracking for the line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-[#F2F1F0]" // Soft Earl Grey
    >
      {/* --- ENHANCED HERO ANIMATION BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Glassmorphic Orbs */}
        <motion.div 
          animate={{ 
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#BEE3F8] rounded-full blur-[80px] opacity-40"
        />
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            x: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#FAF089] rounded-full blur-[100px] opacity-30"
        />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.05]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-white border border-[#3D3735]/10 text-[#3D3735]/60 text-xs font-bold uppercase tracking-[0.4em] mb-6"
          >
            Our Journey
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-[#3D3735] tracking-tight"
          >
            The Evolution of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#90CDF4] to-[#F6E05E]">
              Greatness
            </span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* --- ANIMATED PROGRESS LINE --- */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#3D3735]/10 hidden md:block -translate-x-1/2" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#90CDF4] to-[#F6E05E] hidden md:block -translate-x-1/2 z-20"
          />

          <div className="space-y-24 md:space-y-40">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={`relative md:flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-20 md:text-right" : "md:pl-20 text-left"}`}>
                  <div className="group relative p-10 rounded-[2.5rem] bg-[#3D3735] shadow-2xl transition-transform hover:scale-[1.02] duration-500 overflow-hidden">
                    {/* Subtle Overlay Glow */}
                    <div className={`absolute -right-10 -top-10 w-32 h-32 blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity
                      ${milestone.highlight === 'butter' ? 'bg-[#FAF089]' : 'bg-[#BEE3F8]'}`} 
                    />

                    <span className={`text-5xl font-black tracking-tighter ${
                      milestone.highlight === 'butter' ? 'text-[#FAF089]' : 'text-[#BEE3F8]'
                    }`}>
                      {milestone.year}
                    </span>
                    <h3 className="mt-4 mb-4 text-2xl font-bold text-white tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-lg font-medium">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Animated Center Icon */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-30">
                  <motion.div 
                    whileInView={{ 
                      boxShadow: ["0px 0px 0px rgba(144,205,244,0)", "0px 0px 30px rgba(144,205,244,0.4)", "0px 0px 0px rgba(144,205,244,0)"] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-xl border-[3px]
                    ${milestone.highlight === 'butter' ? 'border-[#FAF089] text-[#3D3735]' : 'border-[#90CDF4] text-[#3D3735]'}`}
                  >
                    <milestone.icon className="w-7 h-7" />
                  </motion.div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;