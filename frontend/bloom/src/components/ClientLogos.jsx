import { motion } from 'framer-motion';

export default function ClientLogos() {
  // Mock client logos - in real implementation these would be actual logo images
  const clients = [
    'TechFlow',
    'Urban Eats',
    'Wellness Co.',
    'Fashion Forward',
    'Digital Dreams',
    'Creative Studio',
    'Modern Minds',
    'Brand Builders',
  ];

  return (
    <section className="py-24 px-6 border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-white/60 mb-8">Trusted by amazing brands</p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              },
            }}
            className="flex gap-16"
          >
            {[...clients, ...clients].map((client, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0"
              >
                <div className="text-2xl text-white/40 hover:text-white/70 transition-colors whitespace-nowrap">
                  {client}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
