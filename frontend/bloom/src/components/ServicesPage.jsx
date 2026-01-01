import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Video, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function ServicesPage() {
  const services = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Brand Strategy',
      tagline: 'Building foundations that last',
      description:
        'We craft comprehensive brand strategies that position your business for long-term success. From market research to brand positioning, we create strategic frameworks that guide every aspect of your brand identity.',
      features: [
        'Brand Positioning & Architecture',
        'Market Research & Analysis',
        'Competitive Intelligence',
        'Brand Messaging & Voice',
        'Visual Identity Strategy',
      ],
      impact: '3x increase in brand recognition on average',
      color: 'from-pink-500 to-rose-500',
      image: 'https://images.unsplash.com/photo-1648260295961-2773afba56ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Content Creation',
      tagline: 'Stories that captivate and convert',
      description:
        'High-impact content that drives engagement and builds meaningful connections with your audience. We create content that not only looks beautiful but delivers measurable results.',
      features: [
        'Social Media Content',
        'Photography & Videography',
        'Copywriting & Storytelling',
        'Graphic Design',
        'Content Strategy & Planning',
      ],
      impact: '5x boost in engagement rates',
      color: 'from-purple-500 to-indigo-500',
      image: 'https://images.unsplash.com/photo-1616412875447-096e932d893c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Production',
      tagline: 'Bringing visions to life',
      description:
        'End-to-end production services that transform concepts into stunning visual experiences. From pre-production planning to final delivery, we handle every detail with precision.',
      features: [
        'Commercial Production',
        'Brand Films & Documentaries',
        'Motion Graphics & Animation',
        'Post-Production & Editing',
        'Sound Design & Music',
      ],
      impact: 'Award-winning production quality',
      color: 'from-indigo-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1689942009554-759940987be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Social Media Branding',
      tagline: 'Growing communities, building brands',
      description:
        'Strategic social media presence that turns followers into loyal customers. We create cohesive digital experiences that amplify your brand across all platforms.',
      features: [
        'Social Media Strategy',
        'Community Management',
        'Influencer Partnerships',
        'Paid Social Campaigns',
        'Analytics & Reporting',
      ],
      impact: '10x follower growth in 6 months',
      color: 'from-pink-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10" />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-sm">
              ✨ Our Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl mb-6"
          >
            Comprehensive Branding{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            From strategy to execution, we offer end-to-end branding services designed
            to make your brand unforgettable
          </motion.p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-20 flex items-center justify-center mb-6 text-pink-400`}
                >
                  {service.icon}
                </motion.div>

                <h2 className="text-4xl md:text-5xl mb-4">{service.title}</h2>
                <p className="text-xl text-pink-400 mb-6">{service.tagline}</p>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <motion.div
                      key={feature}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-sm mb-8">
                  Impact: {service.impact}
                </div>

                <div>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-flex items-center gap-2"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative rounded-3xl overflow-hidden aspect-square"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-30`} />
                </motion.div>
              </div>
            </motion.div>
          ))}
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
            Ready to Make Your Brand{' '}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Bloom?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 mb-12"
          >
            Let's create something extraordinary together
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
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
