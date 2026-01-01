import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Target, Zap, Users } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function OurStoryPage() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion-Driven',
      description:
        'We pour our hearts into every project, treating your brand as if it were our own.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Results-Focused',
      description:
        'Beautiful design means nothing without impact. We create solutions that drive real growth.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation First',
      description:
        'We stay ahead of trends, bringing fresh perspectives and cutting-edge creativity to every project.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaborative Spirit',
      description:
        'Your vision combined with our expertise creates magic. We believe in true partnerships.',
    },
  ];

  return (
    <div ref={scrollRef} className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10" />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-sm">
              🌸 Our Story
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl mb-6 leading-tight"
          >
            Every Great Brand Starts with a{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Story
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Ours began with a simple belief: brands deserve to bloom
          </motion.p>
        </div>
      </section>

      {/* Story Narrative */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12 text-lg leading-relaxed"
          >
            <div>
              <h2 className="text-4xl mb-6">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  The Beginning
                </span>
              </h2>
              <p className="text-white/80">
                In 2020, amid a world in transition, Bloom Branding was born from a vision
                to help businesses not just survive, but thrive. We saw countless brands
                with incredible potential struggling to tell their stories in a crowded
                digital landscape. We knew there had to be a better way.
              </p>
            </div>

            <div>
              <h2 className="text-4xl mb-6">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Our Philosophy
                </span>
              </h2>
              <p className="text-white/80 mb-6">
                We believe every brand has a unique essence waiting to bloom. Like a flower
                breaking through concrete, great brands emerge when strategy meets
                creativity, when data meets intuition, and when vision meets execution.
              </p>
              <p className="text-white/80">
                "Blooming the Brand" isn't just our tagline—it's our methodology. We nurture
                each brand carefully, providing the strategic foundation, creative nutrients,
                and digital sunlight needed for sustainable growth.
              </p>
            </div>

            <div>
              <h2 className="text-4xl mb-6">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  What We Stand For
                </span>
              </h2>
              <p className="text-white/80">
                We're not just another branding agency. We're storytellers, strategists, and
                growth partners. We combine data-driven insights with bold creativity to
                build brands that don't just look good—they perform exceptionally. Our
                frontend-focused approach ensures your digital presence is as powerful as
                your vision.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        
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
                Values
              </span>
            </h2>
            <p className="text-xl text-white/70">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-6 text-pink-400"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-2xl mb-4">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1765438869321-d60141efd813?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-purple-500/30" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl mb-2">Meet the Founder</h2>
                <p className="text-xl text-pink-400">Visionary behind Bloom Branding</p>
              </div>

              <p className="text-lg text-white/80 leading-relaxed">
                With over a decade of experience in brand strategy and digital marketing,
                our founder started Bloom Branding with a mission to democratize world-class
                branding for businesses of all sizes.
              </p>

              <p className="text-lg text-white/80 leading-relaxed">
                "I've always believed that every brand, regardless of size or budget,
                deserves to tell its story beautifully. That's why we've built a studio
                that combines strategic thinking with creative excellence—making premium
                branding accessible to brands ready to bloom."
              </p>

              <div className="pt-6">
                <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                  10+ Years Experience | 250+ Brands Transformed
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl mb-6"
          >
            Ready to Write Your{' '}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Story?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 mb-12"
          >
            Let's create a brand story that inspires and grows
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              >
                Let's Talk
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
