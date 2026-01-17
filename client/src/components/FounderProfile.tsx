'use client';
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function FounderProfile() {
    return (
        <section className="py-32 px-6 md:px-20 bg-[var(--earth-gray)] border-t border-[var(--dark-chocolate)]/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

                {/* Left: Image / Video Placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--dark-chocolate)] relative group">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                            alt="Founder"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-chocolate)]/80 to-transparent"></div>

                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-2 text-[var(--butter-yellow)]">Founder</p>
                            <h3 className="text-3xl font-display">Simran Kaur</h3>
                        </div>
                    </div>

                    {/* Decorative Pattern */}
                    <div className="absolute -z-10 -bottom-10 -left-10 w-full h-full border-2 border-[var(--electric-rust)] rounded-2xl"></div>
                </motion.div>

                {/* Right: Bio */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Quote className="w-12 h-12 text-[var(--electric-rust)] mb-8 opacity-50" />

                    <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--dark-chocolate)] mb-8 leading-tight">
                        Building brands that <span className="italic text-[var(--electric-rust)]">bloom</span> from the inside out.
                    </h2>

                    <div className="space-y-6 text-lg text-[var(--dark-chocolate)]/80 leading-relaxed font-light">
                        <p>
                            "I started Bloom Branding with a simple belief: every brand has a soul waiting to be uncovered.
                            We don't just design logos; we cultivate identities that feel alive, authentic, and ready to grow."
                        </p>
                        <p>
                            With a background in strategic communications and visual arts, I realized that the most successful
                            brands are the ones that aren't afraid to show their true colors. That's why we use 'Blooming the Brand'
                            as our guiding philosophy—it's about organic growth, vibrant expression, and deep roots.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-[var(--dark-chocolate)]/10">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="h-12 opacity-60 invert" style={{ filter: 'invert(0.2) sepia(1) saturate(2) hue-rotate(340deg)' }} />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
