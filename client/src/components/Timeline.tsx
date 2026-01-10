'use client';
import { motion } from "framer-motion";
import { Rocket, Users, Award, Globe, Sparkles, TrendingUp } from "lucide-react";

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
  return (
    <section id="journey" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-chocolate mt-2">
            The Journey So Far
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative md:flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } md:mb-12`}
              >
                {/* Content Card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div
                    className={`p-6 rounded-2xl shadow-soft transition-all duration-300 hover:-translate-y-2 ${
                      milestone.highlight === "butter"
                        ? "bg-secondary/20 hover:shadow-butter"
                        : "bg-primary/5 hover:shadow-electric"
                    }`}
                  >
                    <span
                      className={`text-3xl font-display font-bold ${
                        milestone.highlight === "butter" ? "text-secondary-foreground" : "text-primary"
                      }`}
                    >
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold text-chocolate mt-2 mb-3">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                      milestone.highlight === "butter"
                        ? "bg-gradient-butter"
                        : "bg-gradient-electric"
                    }`}
                  >
                    <milestone.icon
                      className={`w-6 h-6 ${
                        milestone.highlight === "butter" ? "text-chocolate" : "text-primary-foreground"
                      }`}
                    />
                  </div>
                </div>

                {/* Spacer for alignment */}
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