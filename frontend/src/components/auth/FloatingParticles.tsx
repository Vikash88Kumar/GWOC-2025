'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
};

const COUNT = 50;

const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // 1) Make server and first client render match (both render null)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2) Only generate randomness on the client AFTER mount
  useEffect(() => {
    if (!mounted) return;

    const next = Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      driftX: Math.random() * 20 - 10,
    }));

    setParticles(next);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.driftX, 0], // ✅ no Math.random() here anymore
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
