import React from 'react';
// import FooterMap from './FooterMap';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Us', href: '/story' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Contact', href: '/contact' },
  ];

  const services = [
    { label: 'Brand Identity', href: '/services' },
    { label: 'Packaging', href: '/services' },
    { label: 'Web Design', href: '/services' },
    { label: 'Strategy', href: '/services' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/bloom.branding_', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    // { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="bg-[var(--dark-chocolate)] text-[var(--earth-gray)] border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight">
                Bloom<span className="text-[var(--electric-rust)]">.</span>
              </h2>
              <p className="opacity-80 leading-relaxed max-w-sm font-light">
                A creative branding studio crafting memorable brand experiences that help businesses bloom and thrive in their markets.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-4">
              <a 
                href="mailto:hello@bloomstudio.com"
                className="flex items-center gap-3 hover:text-[var(--butter-yellow)] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[var(--butter-yellow)] group-hover:scale-110 transition-transform" />
                <span className="text-sm tracking-widest uppercase">hello@bloomstudio.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--butter-yellow)] mt-0.5 shrink-0" />
                <span className="text-sm tracking-widest uppercase opacity-80">Surat, Gujarat<br />India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--electric-rust)] hover:border-transparent hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-lg mb-6 text-[var(--butter-yellow)]">
              Explore
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-[var(--butter-yellow)] transition-colors inline-flex items-center gap-1 group tracking-wider uppercase"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-lg mb-6 text-[var(--butter-yellow)]">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-sm hover:text-[var(--butter-yellow)] transition-colors inline-flex items-center gap-1 group tracking-wider uppercase"
                  >
                    {service.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-lg mb-6 text-[var(--butter-yellow)]">
              Find Us
            </h3>
            <div className="block h-48 lg:h-56 rounded-xl overflow-hidden relative group border border-white/10 hover:border-[var(--electric-rust)] transition-colors bg-white/5">
              
              {/* Overlay link for full redirection */}
              <a 
                href="https://www.google.com/maps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 cursor-pointer"
                title="Open in Google Maps"
              ></a>

              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7441.398740801756!2d72.79031357032989!3d21.164359014865383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1768156130814!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="relative z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              ></iframe>

              <div className="absolute bottom-3 right-3 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-[var(--dark-chocolate)] px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg">
                  <span className="text-[10px] font-medium uppercase text-white tracking-wider">Open Full Map</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--butter-yellow)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs tracking-widest uppercase opacity-60">
              © {currentYear} Bloom Branding Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs tracking-widest uppercase opacity-60">
              <a href="#" className="hover:text-[var(--butter-yellow)] transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-[var(--butter-yellow)] transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;