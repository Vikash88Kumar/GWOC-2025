import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: 'Our Story', path: '/our-story' },
      { label: 'Services', path: '/services' },
      { label: 'Contact', path: '/contact' },
    ],
    Services: [
      { label: 'Brand Strategy', path: '/services' },
      { label: 'Content Creation', path: '/services' },
      { label: 'Production', path: '/services' },
      { label: 'Social Media', path: '/services' },
    ],
  };

  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl tracking-tight mb-4"
              >
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Bloom
                </span>{' '}
                Branding
              </motion.div>
            </Link>
            <p className="text-white/60 mb-6">
              Making brands bloom through strategic creativity and unforgettable experiences.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/bloom.branding_/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/30 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </motion.div>
              </a>
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/30 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-white/90">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="text-white/60 hover:text-white transition-colors inline-block"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-white/90">Get in Touch</h3>
            <div className="space-y-4">
              <a href="mailto:hello@bloombranding.com" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>hello@bloombranding.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Bloom Branding. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
