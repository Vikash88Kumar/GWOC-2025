'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Transition } from 'framer-motion';

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/our-story', label: 'Our Story' },
  { path: '/contact', label: 'Contact' },
];

const spring: Transition = { type: "spring", stiffness: 200, damping: 30 };

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={false}
        animate={{
          width: scrolled ? "max-content" : "100%",
          marginTop: scrolled ? "20px" : "0px",
          borderRadius: scrolled ? "100px" : "0px",
          backgroundColor: scrolled ? "rgba(23, 23, 23, 0.8)" : "rgba(0, 0, 0, 0)",
          paddingLeft: scrolled ? "24px" : "40px",
          paddingRight: scrolled ? "24px" : "40px",
          border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
        transition={spring}
        className="h-14 flex items-center justify-between gap-12 backdrop-blur-md pointer-events-auto overflow-hidden shadow-2xl shadow-black/50"
      >
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 shrink-0 pointer-events-auto">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-black text-sm overflow-hidden">
            <img src="https://media.istockphoto.com/id/1421948749/vector/simple-star-vector-black-line-icon-isolated.jpg?s=612x612&w=0&k=20&c=EKleOC6kVhNH7qh2S6ZcVZ4jb7zdrRnCAMtoPfgPdWQ=" alt="Logo" width={20} height={20} />
          </div>
          <AnimatePresence mode="popLayout">
            {!scrolled && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-lg font-bold tracking-tighter text-white whitespace-nowrap"
              >
                Bloom <span className="text-zinc-500">Branding</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* CENTER LINKS (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`relative py-2 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 shrink-0">
          <AnimatePresence>
            {!scrolled && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="hidden sm:block text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white px-4"
              >
                Login
              </motion.button>
            )}
          </AnimatePresence>

          <button
            className={`px-6 h-9 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-zinc-800 text-white border border-white/10 hover:bg-white hover:text-black'
                : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            {scrolled ? "Join" : "Book a call"}
          </button>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;