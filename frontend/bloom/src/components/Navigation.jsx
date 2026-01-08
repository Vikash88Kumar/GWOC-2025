import { Link, useLocation } from 'react-router-dom'; // Added useLocation
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NavbarDemo() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Hook to track current route

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/our-story', label: 'Our Story' },
    { path: '/contact', label: 'Contact' },
  ];

  const spring = { type: "spring", stiffness: 200, damping: 30 };

  return (
    <div className="relative w-full bg-black min-h-screen text-white">
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={false}
          animate={{
            width: scrolled ? "max-content" : "100%",
            marginTop: scrolled ? "20px" : "0px",
            borderRadius: scrolled ? "100px" : "0px",
            backgroundColor: scrolled ? "rgba(23, 23, 23, 0.8)" : "transparent",
            paddingLeft: scrolled ? "24px" : "40px", // Increased for logo space
            paddingRight: scrolled ? "24px" : "40px",
            border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          }}
          transition={spring}
          className="h-14 flex items-center justify-between gap-12 backdrop-blur-md pointer-events-auto overflow-hidden shadow-2xl shadow-black/50"
        >
          {/* LOGO SECTION */}
          <div className="flex items-center gap-3 shrink-0 top-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-black text-sm">
              <img src="./public/vite.svg" alt="" />
            </div>
            <AnimatePresence mode="popLayout">
              {!scrolled && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-lg font-bold tracking-tighter"
                >
                  Bloom <span className='text-zinc-500'>Branding</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER LINKS WITH ACTIVE UNDERLINE */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative py-2 transition-colors duration-300 ${isActive ? 'text-white' : 'hover:text-white'}`}
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
                  className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white px-4"
                >
                  Login
                </motion.button>
              )}
            </AnimatePresence>
            
            <button className={`px-6 h-9 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
              scrolled 
              ? 'bg-zinc-800 text-white border border-white/10 hover:bg-white hover:text-black' 
              : 'bg-white text-black hover:bg-zinc-200'
            }`}>
              {scrolled ? "Join" : "Book a call"}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* UPDATED DUMMY CONTENT WITH BUTTONS */}
      <DummyContent />
    </div>
  );
}

const DummyContent = () => (
  <div className="container mx-auto p-8 pt-32 bg-black">
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h1 className="text-7xl font-bold tracking-tighter mb-4">
        Premium Branding <br />
        <span className="text-zinc-500">For the modern era.</span>
      </h1>
      <p className="text-zinc-400 mb-8">Scroll down to see the navbar morph into a pill.</p>
      
      {/* ADDED HERO BUTTONS */}
      <div className=" flex items-center justify-center gap-4">
        <button className="px-6 py-4 bg-black text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors uppercase text-xs tracking-widest">
          Explore Portfolio
        </button>
        <button className="px-6 py-4 bg-white border border-white/20 text-black font-bold rounded-lg   hover:bg-white/10 transition-colors uppercase text-xs tracking-widest">
          View Pricing
        </button>
      </div>
    </div>
  </div>
);