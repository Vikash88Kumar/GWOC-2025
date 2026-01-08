import React from 'react';
// import FooterMap from './FooterMap';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    { label: 'Brand Identity', href: '#' },
    { label: 'Visual Design', href: '#' },
    { label: 'Web Development', href: '#' },
    { label: 'Digital Strategy', href: '#' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className=" bg-zinc-900 text-white  ">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 lg:py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h2 className="font-display text-3xl lg:text-4xl text-footer-heading tracking-tight">
                Bloom<span className="text-footer-accent">.</span>
              </h2>
              <p className="text-footer-text leading-relaxed max-w-sm">
                A creative branding studio crafting memorable brand experiences that help businesses bloom and thrive in their markets.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <a 
                href="mailto:hello@bloomstudio.com"
                className="flex items-center gap-3 text-footer-text hover:text-footer-heading transition-colors group"
              >
                <Mail className="w-4 h-4 text-footer-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm">hello@bloomstudio.com</span>
              </a>
              <a 
                href="tel:+14155551234"
                className="flex items-center gap-3 text-footer-text hover:text-footer-heading transition-colors group"
              >
                <Phone className="w-4 h-4 text-footer-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm">+1 (415) 555-1234</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-footer-accent mt-0.5 shrink-0" />
                <span className="text-sm">123 Design District<br />San Francisco, CA 94102</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-8 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-footer-surface border border-footer-border flex items-center justify-center text-footer-text hover:text-footer-heading hover:border-footer-accent hover:bg-footer-accent/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-lg text-footer-heading mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-text hover:text-footer-accent transition-colors inline-flex items-center gap-1 group"
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
            <h3 className="font-display text-lg text-footer-heading mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-sm text-footer-text hover:text-footer-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {service.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-lg text-footer-heading mb-6">
              Find Us
            </h3>
            <div className="h-48 lg:h-56 rounded-lg overflow-hidden">
              {/* <FooterMap /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-footer-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-footer-text">
              © {currentYear} Bloom Branding Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-footer-text hover:text-footer-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-footer-text hover:text-footer-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;