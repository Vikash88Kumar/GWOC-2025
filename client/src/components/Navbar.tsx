'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { logout as authlogout } from "../contextapi/authSlice"
import { logout } from '@/services/user.api';

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/story', label: 'Our Story' },
  { path: '/founder', label: 'Founder' },
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

  const router = useRouter()
  const dispatch = useDispatch()

  const handelLogout = async () => {
    try {
      const res = await logout()
      dispatch(authlogout())
      router.push("/login")
      return res
    } catch (error) {
      console.log("logout failed", error)
    }
  }

  // Dynamic Colors based on scroll
  const navTextColor = scrolled ? "text-[var(--earth-gray)]" : "text-[var(--dark-chocolate)]";
  const logoTextMain = scrolled ? "text-[var(--earth-gray)]" : "text-[var(--dark-chocolate)]";
  const logoTextAccent = scrolled ? "text-[var(--butter-yellow)]" : "text-[var(--electric-rust)]";

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={false}
        animate={{
          width: scrolled ? "max-content" : "100%",
          marginTop: scrolled ? "20px" : "0px",
          borderRadius: scrolled ? "100px" : "0px",
          backgroundColor: scrolled ? "rgba(98, 74, 65, 0.95)" : "rgba(232, 230, 216, 0.0)", // Chocolate vs Transparent
          paddingLeft: scrolled ? "32px" : "40px",
          paddingRight: scrolled ? "32px" : "40px",
          border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 20px 25px -5px rgb(0 0 0 / 0.1)" : "none",
        }}
        transition={spring}
        className="h-16 flex items-center justify-between gap-12 backdrop-blur-sm pointer-events-auto overflow-hidden"
      >
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 shrink-0 pointer-events-auto group">
          <div className="w-10 h-10 bg-[var(--earth-gray)] rounded-full flex items-center justify-center overflow-hidden border border-[var(--dark-chocolate)]/10 shadow-sm transition-transform group-hover:scale-105">
            <img
              src="./mark logo.png"
              alt="Logo"
              className="w-12 h-12 object-contain scale-125"
            />
          </div>
          <AnimatePresence mode="popLayout">
            {!scrolled && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`text-xl font-display font-bold tracking-tight ${logoTextMain}`}
              >
                Bloom<span className={logoTextAccent}>.</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* CENTER LINKS (Desktop) */}
        <div className={`hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] ${navTextColor}`}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            // Active state color logic
            const activeColor = scrolled ? "text-[var(--butter-yellow)]" : "text-[var(--electric-rust)]";
            const hoverColor = scrolled ? "hover:text-white" : "hover:text-[var(--electric-rust)]";

            return (
              <Link
                key={item.label}
                href={item.path}
                className={`relative py-2 transition-colors duration-300 ${isActive ? activeColor : hoverColor
                  }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${scrolled ? 'bg-[var(--butter-yellow)]' : 'bg-[var(--electric-rust)]'}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div className={`flex items-center gap-6 shrink-0 ${navTextColor}`}>
          <button
            onClick={handelLogout}
            className={`text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-all duration-300 ${scrolled
                ? "border-white/20 hover:bg-[var(--butter-yellow)] hover:text-[var(--dark-chocolate)] hover:border-transparent"
                : "border-[var(--dark-chocolate)]/20 hover:bg-[var(--electric-rust)] hover:text-white hover:border-transparent"
              }`}
          >
            Log Out
          </button>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;