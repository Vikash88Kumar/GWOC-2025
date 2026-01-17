'use client';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VisionValues() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const values = [
        { title: "Authenticity", desc: "We dig deep to find the truth of your brand." },
        { title: "Boldness", desc: "We aren't afraid to stand out and take up space." },
        { title: "Growth", desc: "Everything we do is designed to help you scale." },
    ];

    return (
        <section ref={containerRef} className="py-40 bg-[var(--dark-chocolate)] text-[var(--earth-gray)] overflow-hidden relative">

            {/* Background Parallax Words */}
            <motion.div style={{ y: y1 }} className="absolute top-10 left-10 text-[10rem] font-black opacity-[0.03] pointer-events-none whitespace-nowrap">
                BLOOM GROW THRIVE
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute bottom-10 right-10 text-[10rem] font-black opacity-[0.03] pointer-events-none whitespace-nowrap">
                STRATEGY DESIGN SOUL
            </motion.div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-[var(--butter-yellow)] font-bold uppercase tracking-[0.3em] text-sm">Our Philosophy</span>
                    <h2 className="text-5xl md:text-6xl font-display mt-6 leading-tight">
                        We believe in design that <span className="text-[var(--electric-rust)] italic">moves</span> people.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {values.map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="p-8 border border-[var(--earth-gray)]/10 rounded-2xl hover:bg-[var(--earth-gray)]/5 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full bg-[var(--electric-rust)] flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                                {i + 1}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                            <p className="text-[var(--earth-gray)]/60 leading-relaxed">
                                {val.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
