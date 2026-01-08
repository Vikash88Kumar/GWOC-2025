"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { Instagram, Facebook, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------------- LENIS SMOOTH SCROLL ---------------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value!)
          : window.scrollY;
      },
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.update());
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  /* ---------------- GSAP ANIMATIONS ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 60,
        scale: 0.98,
        duration: 1.6,
        ease: "power4.out",
      });

      gsap.utils.toArray<HTMLElement>(".service-block").forEach((block) => {
        gsap.from(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
          },
          opacity: 0,
          y: 120,
          duration: 1.4,
          ease: "power4.out",
        });
      });

      gsap.from(".testimonial-track", {
        xPercent: 0,
      });

      gsap.to(".testimonial-track", {
        xPercent: -60,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#fdfbf7] text-[#333] font-serif">

      {/* ---------------- HERO ---------------- */}
      <section className="min-h-screen flex items-center justify-center text-center px-6">
        <div className="hero-reveal max-w-6xl">
          <h1 className="text-6xl md:text-[90px] font-light leading-[1.1] mb-12">
            Creating strategic, <span className="italic">confident</span> designs
            with{" "}
            <span className="italic underline decoration-1 text-[#892f1a]">
              you
            </span>{" "}
            at the centre.
          </h1>

          <button className="border border-[#333] px-12 py-5 text-[10px] uppercase tracking-[0.5em] hover:bg-[#333] hover:text-white transition-all duration-700">
            Let&apos;s Get Started
          </button>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="py-40 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto space-y-56">
          {["Brand Identity", "Packaging", "Website Design", "Social Media"].map(
            (title, i) => (
              <div
                key={i}
                className="service-block grid md:grid-cols-2 gap-24 items-center"
              >
                <div className="aspect-[4/5] bg-gray-100 flex items-center justify-center italic text-gray-400">
                  Image_0{i + 1}
                </div>

                <div className="space-y-8">
                  <span className="text-7xl font-light opacity-10">
                    0{i + 1}
                  </span>
                  <h2 className="text-4xl md:text-6xl">{title}</h2>
                  <p className="font-sans text-lg text-gray-500 max-w-md">
                    We craft thoughtful, strategic systems that elevate your
                    brand.
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="py-40 overflow-hidden">
        <h2 className="text-center text-4xl italic mb-20 text-[#624a41]">
          Some kind words
        </h2>

        <div className="testimonial-track flex gap-10 px-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[450px] bg-white p-14 shadow-sm border"
            >
              <p className="font-sans text-lg italic opacity-80 leading-loose">
                “Working with Ode has been such a great experience. Every detail
                felt intentional.”
              </p>

              <div className="mt-10">
                <p className="font-bold tracking-widest text-xs uppercase">
                  Aishaa Nensey
                </p>
                <p className="text-[10px] uppercase opacity-40 tracking-widest">
                  Venjara Carpets
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section className="bg-[#624a41] py-40 px-6">
        <div className="max-w-5xl mx-auto bg-[#e8e6d8] p-12 md:p-24 shadow-2xl text-center">
          <h2 className="text-5xl italic mb-14">
            We&apos;d love to hear from you!
          </h2>

          <form className="space-y-12">
            <div className="grid md:grid-cols-2 gap-10">
              <input className="border-b bg-transparent pb-4 outline-none" placeholder="First Name" />
              <input className="border-b bg-transparent pb-4 outline-none" placeholder="Last Name" />
            </div>

            <input className="w-full border-b bg-transparent pb-4 outline-none" placeholder="Email *" />

            <button className="bg-[#624a41] text-white px-14 py-5 rounded-full text-[11px] uppercase tracking-[0.4em] hover:bg-[#892f1a] transition-all">
              Let&apos;s get started!
            </button>
          </form>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="py-20 flex flex-col items-center gap-10">
        <div className="flex gap-10 opacity-60">
          <Instagram size={20} />
          <Facebook size={20} />
          <Linkedin size={20} />
        </div>
        <p className="text-[10px] tracking-[0.4em] opacity-40 uppercase">
          © 2026 BY ODE STUDIO. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
