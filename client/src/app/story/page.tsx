'use client'
import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    year: "2019",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=500",
    text: "What started as a dorm room conversation about being 'bored' in the summer turned into something bigger — Ode for all things planning and productivity."
  },
  {
    year: "2020",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500",
    text: "Amidst the pandemic and rise of start ups, we started getting inquiries for packaging and marketing collaterals — landing our first design client!"
  },
  {
    year: "2021",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=500",
    text: "While working on small design projects, we launched #PlanInPastels our best-selling collection for personalised planners."
  },
  {
    year: "2022",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500",
    text: "Ode Studio officially became a full-service design agency, helping brands craft meaningful stories through design."
  },
  {
    year: "Currently in 2025",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=500",
    text: "We're growing our team of passionate and driven women while expanding our services, working with visionary clients and setting a new standard for thoughtful, detail-driven design services in the Indian market."
  }
];

const OdeTimeline = () => {
  return (
    <div className="bg-[#D9B5B5] min-h-screen py-24 px-4 overflow-x-hidden">
      {/* Exact Heading Style */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-[40px] md:text-[54px] font-light text-[#2D2D2D] tracking-tight">
          Let's start from <span className="italic font-serif">the beginning</span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* The Exact Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#2D2D2D] opacity-40 transform -translate-x-1/2"></div>

        <div className="relative flex flex-col">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 !== 0; // In your video, 2019 is on the right

            return (
              <div key={index} className="relative w-full mb-[-40px] md:mb-[-20px] flex items-center">
                {/* The Notch/Tick */}
                <div className="absolute left-1/2 w-6 h-[1px] bg-[#2D2D2D] transform -translate-x-1/2 z-10"></div>

                <motion.div
                  // The "Exact" Animation: 
                  // Slide from far left/right + slight rotation + Fade In
                  initial={{ 
                    opacity: 0, 
                    x: isLeft ? -200 : 200, 
                    rotate: isLeft ? -4 : 4 
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: isLeft ? -20 : 20, // Small overlap of the center
                    rotate: isLeft ? -2 : 2 
                  }}
                  transition={{ 
                    duration: 0.9, 
                    ease: [0.16, 1, 0.3, 1], // Smooth "Expo" ease-out
                  }}
                  viewport={{ once: false, amount: 0.4 }}
                  className={`relative w-[85%] md:w-[420px] bg-[#313131] text-white p-6 rounded-sm shadow-2xl
                    ${isLeft ? "ml-auto" : "mr-auto"}`}
                  style={{ zIndex: index }}
                >
                  <div className="overflow-hidden mb-6">
                    <img
                      src={item.image}
                      alt={item.year}
                      className="w-full aspect-[4/5] object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="space-y-4">
                    <span className="text-[22px] font-medium block leading-none">{item.year}</span>
                    <p className="text-[14px] leading-relaxed text-gray-300 font-light tracking-wide">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Mission Text - Exactly as seen in video */}
      <div className="max-w-3xl mx-auto text-center mt-64 mb-32 text-[#2D2D2D]">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-[32px] leading-[1.3] mb-12 font-medium"
        >
          At Ode Studio, our mission is to craft timeless, strategic, and visually compelling brands that help businesses scale with confidence.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-[22px] font-light italic opacity-90"
        >
          We take a personalised, collaborative approach, ensuring that every brand we touch is not only aesthetically refined but also deeply rooted in strategy.
        </motion.p>
      </div>
    </div>
  );
};

export default OdeTimeline;