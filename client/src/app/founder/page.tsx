'use client';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Lightbulb, Users, Rocket, Twitter, Linkedin, Instagram, Mail, ArrowRight } from "lucide-react";
import founderPortrait from "@/assets/founder-portrait.jpg";
import abstractBg from "@/assets/abstract-bg.jpg";

const values = [
  {
    icon: Heart,
    title: "Authenticity",
    description: "Being genuine in every interaction, building trust through transparency and honesty.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly pushing boundaries to find creative solutions that make real impact.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Fostering connections and lifting others up. Success is better when shared.",
  },
  {
    icon: Rocket,
    title: "Excellence",
    description: "Never settling for good enough. Every detail matters in the pursuit of greatness.",
  },
];

const milestones = [
  {
    year: "2014",
    title: "The Beginning",
    description: "Started with a laptop, a dream, and endless cups of coffee. Founded the company from my apartment.",
  },
  {
    year: "2016",
    title: "First Major Client",
    description: "Landed our first Fortune 500 client. A pivotal moment that validated our vision.",
  },
  {
    year: "2018",
    title: "Series A Funding",
    description: "Raised $15M to scale our operations. Grew the team from 5 to 50 incredible people.",
  },
  {
    year: "2020",
    title: "Global Expansion",
    description: "Opened offices in London, Singapore, and Sydney. Serving customers in 50+ countries.",
  },
  {
    year: "2023",
    title: "10 Million Users",
    description: "Reached a milestone that once seemed impossible. But the mission continues.",
  },
];

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
];

const AboutFounder = () => {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const journeyRef = useRef(null);
  const connectRef = useRef(null);

  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const journeyInView = useInView(journeyRef, { once: true, margin: "-100px" });
  const connectInView = useInView(connectRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background font-body scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-12 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block text-sm tracking-[0.3em] uppercase text-amber-900 mb-6 font-medium"
              >
                Founder & Visionary
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] mb-8"
              >
                Alexandra
                <span className="block italic text-amber-900 mt-2">Mitchell</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10"
              >
                Building the future of digital experiences, one meaningful connection at a time.
                With over a decade of experience in transforming ideas into impactful realities.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#story"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-full transition-all duration-300 hover:bg-amber-800 hover:scale-105"
                >
                  Read My Story
                </a>
                <a
                  href="#connect"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-foreground text-foreground font-body font-medium rounded-full transition-all duration-300 hover:bg-foreground hover:text-background"
                >
                  Let's Connect
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full border-2 border-amber-900 rounded-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-300/20 rounded-full" />

                <img
                  src="https://img.freepik.com/free-vector/rainbow-coloured-hand-painted-watercolour-splatter-design_1048-20680.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Alexandra Mitchell - Founder"
                  className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover aspect-[3/4]"
                />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 z-20 bg-card px-6 py-4 rounded-xl shadow-lg"
                >
                  <span className="block font-display text-2xl font-semibold text-amber-900">10+</span>
                  <span className="font-body text-sm text-muted-foreground">Years of Impact</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 lg:py-32 bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-900/30 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-900/30 to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12" ref={storyRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block font-body text-sm tracking-[0.3em] uppercase text-amber-900 mb-4">
              The Journey
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
              My Story
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <span className="absolute -top-8 -left-4 font-display text-[120px] text-amber-900/20 leading-none">
                "
              </span>

              <blockquote className="font-display text-2xl md:text-3xl italic text-foreground leading-relaxed mb-12 pl-8">
                I believe that every challenge is an opportunity to create something extraordinary.
                The key is to never stop learning, never stop growing.
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-12 mt-16"
            >
              <div className="space-y-6">
                <p className="font-body text-gray-600 leading-relaxed">
                  It all started in a small home office with a simple idea: what if we could make
                  technology more human? Fresh out of university with a degree in Computer Science
                  and a minor in Psychology, I was fascinated by the intersection of human behavior
                  and digital experiences.
                </p>
                <p className="font-body text-gray-600 leading-relaxed">
                  The first few years were challenging. Countless late nights, failed prototypes,
                  and moments of doubt. But each setback taught me something invaluable—resilience
                  isn't about not falling, it's about how you rise.
                </p>
              </div>

              <div className="space-y-6">
                <p className="font-body text-gray-600 leading-relaxed">
                  Today, our company serves over 10 million users worldwide, but what brings me
                  the most joy isn't the numbers—it's the stories. The small business owner who
                  grew her revenue by 300%. The nonprofit that reached communities they never
                  could before. The student who landed their dream job.
                </p>
                <p className="font-body text-gray-600 leading-relaxed">
                  Every line of code, every design decision, every strategic pivot has been in
                  service of one goal: making a positive difference in people's lives. And we're
                  just getting started.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-6 lg:px-12" ref={valuesRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block font-body text-sm tracking-[0.3em] uppercase text-amber-900 mb-4">
              What Drives Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
              Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="h-full p-8 bg-card rounded-2xl border border-border transition-all duration-500 hover:border-amber-900 hover:shadow-xl hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-amber-900/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-amber-100 group-hover:scale-110">
                    <value.icon className="w-7 h-7 text-amber-900 transition-colors duration-300 group-hover:text-primary-foreground" />
                  </div>

                  <h3 className="font-display text-xl font-medium text-foreground mb-3">
                    {value.title}
                  </h3>

                  <p className="font-body text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24 lg:py-32 bg-yellow-50 relative overflow-hidden" ref={journeyRef}>
  <div className="container mx-auto px-6 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={journeyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block font-body text-sm tracking-[0.3em] uppercase text-amber-900 mb-4">
              Milestones
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text--900">
              The Journey So Far
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-900 via-amber-900/50 to-transparent transform md:-translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={journeyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-amber-900 rounded-full transform -translate-x-1/2 z-10 ring-4 ring-background" />

                <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-blue-500 p-6 rounded-xl border border-border hover:border-amber-900 transition-all duration-300 hover:shadow-lg">
                    <span className="inline-block font-display text-3xl font-semibold text-white mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="font-display text-xl font-medium text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="font-body text-gray-200 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://img.freepik.com/free-vector/rainbow-coloured-hand-painted-watercolour-splatter-design_1048-20680.jpg?semt=ais_hybrid&w=740&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/90 to-foreground/80" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={connectRef}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={connectInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block font-body text-sm tracking-[0.3em] uppercase text-yellow-300 mb-4"
            >
              Get In Touch
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={connectInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-background mb-6"
            >
              Let's Create Something
              <span className="block italic text-yellow-300">Extraordinary</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={connectInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-lg text-background/70 mb-12 max-w-xl mx-auto"
            >
              Whether you have a project in mind, want to collaborate, or just want to say hello—
              I'd love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={connectInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <a
                href="mailto:hello@example.com"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-900 text-primary-foreground font-body font-medium rounded-full transition-all duration-300 hover:bg-amber-800 hover:scale-105"
              >
                Send a Message
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-8 py-4 border border-background/30 text-background font-body font-medium rounded-full transition-all duration-300 hover:bg-background/10"
              >
                Schedule a Call
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={connectInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center justify-center gap-6"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center text-background/70 transition-all duration-300 hover:bg-background hover:text-foreground hover:scale-110"
                >
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
