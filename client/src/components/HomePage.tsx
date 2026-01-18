"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

// ✅ API
import { createTestimonial, getAllTestimonials } from "../services/testimonial.api.js";
import { getHomePage } from "../services/homepage.api.js";

type AnyObj = Record<string, any>;

const DEFAULT_HERO_FALLBACK =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600";

const DEFAULT_PROJECTS = [
  {
    id: "p1",
    title: "NANDAN COFFEE",
    date: "October 2023 - Ongoing",
    img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1600",
    order: 1,
  },
  {
    id: "p2",
    title: "PASTEL PATISSERIE",
    date: "December 2024",
    img: "https://images.unsplash.com/photo-1551443874-329402506e76?q=80&w=1600",
    order: 2,
  },
  {
    id: "p3",
    title: "SEEKHO SIKHAO FOUNDATION",
    date: "September 2023 - Ongoing",
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1600",
    order: 3,
  },
  {
    id: "p4",
    title: "MANA",
    date: "October 2024",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600",
    order: 4,
  },
];

const DEFAULT_MARQUEE = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
  "/8.png",
];

export default function HomePage() {
  const [data, setData] = useState<AnyObj>({});
  const [dbTestimonials, setDbTestimonials] = useState<AnyObj[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // review form
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [star, setStar] = useState<number>(5);
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------- Fetch homepage + testimonials ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, testiRes] = await Promise.all([getHomePage(), getAllTestimonials()]);

        // HomePage payload
        setData(homeRes?.data ?? homeRes ?? {});

        // Testimonials payload (supports both shapes)
        const raw =
          testiRes?.data?.data ??
          testiRes?.data ??
          (Array.isArray(testiRes) ? testiRes : []);

        setDbTestimonials(Array.isArray(raw) ? raw : []);
      } catch (err: any) {
        console.error("Failed to fetch homepage/testimonials:", err);
        setError(err?.message ? String(err.message) : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ---------- Hero images ----------
  const heroImages = useMemo(() => {
    const bg = data?.hero?.backgroundImage;
    if (Array.isArray(bg) && bg.length > 0) return bg;
    if (typeof bg === "string" && bg.trim().length > 0) return [bg];
    return [DEFAULT_HERO_FALLBACK];
  }, [data]);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // ---------- Projects mapping ----------
  const projects = useMemo(() => {
    const items = Array.isArray(data?.projects?.items) ? data.projects.items : [];
    const mapped = items
      .map((it: AnyObj) => ({
        id: it._id || it.id || `${it.title}-${it.subtitle}`,
        title: it.title || "",
        date: it.subtitle || "",
        img: it.image || "",
        order: Number(it.order ?? 0),
      }))
      .filter((p: AnyObj) => p.title && p.img)
      .sort((a: AnyObj, b: AnyObj) => a.order - b.order);

    return mapped.length ? mapped : DEFAULT_PROJECTS;
  }, [data]);

  // ---------- Footer marquee ----------
  const images = [
    "/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png", "/7.png", "/8.png", "/9.png", "/10.png",
    "/11.png", "/12.png", "/13.png", "/14.png", "/15.png", "/16.png", "/17.png", "/18.png", "/19.png", "/20.png",
    "/21.png", "/22.png", "/23.png", "/24.png", "/25.png", "/26.png", "/27.png", "/28.png", "/29.png", "/30.png",
    "/31.png", "/32.png", "/33.png", "/34.png", "/35.png",
  ];

  // ---------- Testimonials mapping (to AnimatedTestimonials format) ----------
  const animatedTestimonials = useMemo(() => {
    return (dbTestimonials ?? []).map((t: AnyObj) => {
      const name = t.user?.fullName || t.clientName || t.name || "Client";
      const company = t.user?.companyName || t.company || t.clientCompany || "";
      const r = t.role || t.clientRole || "";
      const content = t.message || t.content || "";
      const image = t.user?.avatar || t.clientImage || t.avatar || "/placeholder-profile.png";

      return {
        quote: content,
        name,
        designation: `${r}${company ? " at " + company : ""}`,
        src: image,
      };
    });
  }, [dbTestimonials]);

  // ---------- Submit review ----------
  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Optimistic insert (so UI updates instantly)
    const optimistic = {
      _id: `tmp-${Date.now()}`,
      clientName: "Anonymous",
      role,
      message,
      star,
      clientImage: "/placeholder-profile.png",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setDbTestimonials((prev) => [optimistic, ...prev]);

    try {
      const payload = { role, message, star };
      const res = await createTestimonial(payload);

      // Normalize response
      const saved = res?.data?.data ?? res?.data ?? null;

      if (saved) {
        setDbTestimonials((prev) =>
          prev.map((x) => (x._id === optimistic._id ? saved : x))
        );
      }

      setRole("");
      setMessage("");
      setStar(5);

      setReviewSuccess("Thanks for your review! It will appear after approval.");
      setTimeout(() => setReviewSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to submit testimonial:", err);

      // rollback optimistic item if failed
      setDbTestimonials((prev) => prev.filter((x) => x._id !== optimistic._id));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8e6d8] flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-[#624a41]" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#e8e6d8] text-[#624a41] font-serif selection:bg-[#bdaf62] selection:text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentSlide}
              src={heroImages[currentSlide]}
              alt={data?.hero?.headline ?? "Studio Interior"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-[#892f1a]/40 mix-blend-multiply z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#624a41]/60 via-transparent to-[#e8e6d8] z-[2]" />
        </div>

        {/* Optional: if you want hero content inside this section later, put it here */}
      </section>

      {/* ================= INTRO SECTION ================= */}
      <section className="w-full py-32 px-8 md:px-20 grid md:grid-cols-1 gap-20 items-center bg-[#e8e6d8]">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="relative flex w-full items-center justify-center">
            <DottedGlowBackground
              className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
              opacity={0.5}
              gap={10}
              radius={2.5}
              colorLightVar="--color-neutral-500"
              glowColorLightVar="--color-neutral-600"
              colorDarkVar="--color-neutral-500"
              glowColorDarkVar="--color-dark"
              backgroundOpacity={0.01}
              speedMin={0.3}
              speedMax={1.6}
              speedScale={1}
            />

            <div className="w-full relative z-10 flex items-center justify-between space-y-6 px-4 py-16 text-center md:flex-row md:px-40">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-5xl z-10 mx-auto"
              >
                <h1 className="text-5xl md:text-[85px] font-light leading-[1.05] mb-10 text-[#624a41]">
                  {data?.intro?.heading ??
                    data?.hero?.headline ?? (
                      <>
                        Creating strategic,{" "}
                        <span className="italic text-[#bdaf62]">confident</span> and timeless designs with{" "}
                        <span className="italic text-[#892f1a]">you</span> at the centre.
                      </>
                    )}
                </h1>

                <p className="font-sans text-sm md:text-base tracking-[0.3em] mb-12 text-[#624a41] uppercase max-w-3xl mx-auto">
                  {data?.intro?.description ?? data?.hero?.subHeadline ?? "We ensure your brand feels like home to those it serves."}
                </p>

                <Link href={data?.hero?.ctaLink ?? "/services"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="hover:bg-[#e8e6d8] hover:text-[#624a41] px-10 py-4 text-[10px] rounded-xl uppercase tracking-[0.4em] bg-[#892f1a] text-white transition-all duration-500 shadow-xl"
                  >
                    {data?.hero?.ctaText ?? "Let's Get Started"}
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= WORK SHOWCASE (PROJECTS) ================= */}
      {/* <section className="bg-[#624a41] text-[#e8e6d8] py-32 px-8 md:px-20 relative">
        <div
          className={cn(
            "absolute inset-0",
            "bg-size-[40px_40px]",
            "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 relative">
          <div className="md:w-1/3 pr-8">
            <div className="sticky top-32 flex justify-center flex-col">
              <h2 className="text-5xl font-light mb-6">{data?.projects?.heading ?? "Glimpse into our work"}</h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62]">
                {data?.projects?.subHeading ?? "Selected Works"}
              </p>
            </div>
          </div>

          <div className="md:w-2/3 space-y-40">
            {projects.map((proj: AnyObj, idx: number) => (
              <motion.div
                key={proj.id || idx}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <CardContainer className="inter-var md:w-full w-auto h-auto perspective-1000px">
                  <CardBody className="bg-transparent relative group/card w-auto md:w-full rounded-xl p-0 border-none">
                    <CardItem translateZ="50" className="w-full h-auto mt-4">
                      <img
                        src={proj.img}
                        className="w-full object-cover rounded-xl group-hover/card:shadow-xl aspect-[4/3]"
                        alt={proj.title}
                      />
                    </CardItem>
                  </CardBody>
                </CardContainer>

                <div className="flex flex-col border-l-2 border-[#892f1a] pl-6 transition-all duration-500 group-hover:pl-10 mt-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62] mb-3">{proj.date}</span>
                  <h3 className="text-4xl tracking-wide font-light">{proj.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="bg-[#624a41] text-[#e8e6d8] py-32 px-8 md:px-20 relative">
        <div
          className={cn(
            "absolute inset-0",
            "bg-size-[40px_40px]",
            "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          )}
        />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">

          {/* LEFT SIDE: STICKY HEADER */}
          <div className="md:w-1/3 pr-8">
            <div className="sticky top-32 flex justify-center flex-col">
              <h2 className="text-5xl font-light mb-6">{data?.projects?.heading ?? "Glimpse into our work"}</h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62]">{data?.projects?.subHeading ?? "Selected Works"}</p>
            </div>
          </div>


          {/* RIGHT SIDE: VERTICAL SCROLLING IMAGES */}
          <div className="md:w-2/3 space-y-40">
            {projects.map((proj: any, idx: number) => (
              <motion.div
                key={proj.id || idx}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <CardContainer className="inter-var md:w-full w-auto h-auto perspective-1000px">
                  <CardBody className="bg-tranparent-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-black dark:border-white/[0.20rder-yellow/[0.1] w-auto md:w-full sm:w-[30rem120o rounded-xl p-6 border">


                    <CardItem translateZ="100" className="w-full h-64 mt-4">
                      <img
                        src={proj.img}
                        className="h-64 sm:h-64 md:h-72 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                      />
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">

                    </div>
                  </CardBody>
                </CardContainer>

                <div className="flex flex-col border-l-2 border-[#892f1a] pl-6 transition-all duration-500 group-hover:pl-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62] mb-3">{proj.date}</span>
                  <h3 className="text-4xl tracking-wide font-light">{proj.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLIENTS SECTION (optional) ================= */}
      {Array.isArray(data?.clients?.logos) && data.clients.logos.length > 0 && (
        <section className="py-24 px-8 md:px-20 bg-[#e8e6d8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-2xl font-light text-[#624a41]">{data?.clients?.heading ?? "Trusted By"}</h3>
              <div className="h-px w-12 bg-[#892f1a] mx-auto mt-4 opacity-50" />
            </div>

            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {data.clients.logos.map((logo: string, i: number) => (
                <div key={i} className="w-32 h-20 relative flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo} alt="Client Logo" className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= STATS SECTION ================= */}
      <section className="py-40 px-8 bg-[#624a41]/5 text-center">
        <h2 className="text-3xl italic mb-24 text-[#892f1a]">{data?.stats?.heading ?? "Our story in numbers"}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {(Array.isArray(data?.stats?.items) ? data.stats.items : []).map((stat: AnyObj, i: number) => (
            <div key={stat._id || stat.id || i}>
              <div className="text-6xl font-light mb-4 text-[#624a41]">{stat.title}</div>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] font-black text-[#bdaf62]">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      {error ? (
        <div className="px-8 md:px-20 py-16 text-center text-[#892f1a]">
          Failed to load: {error}
        </div>
      ) : animatedTestimonials.length > 0 ? (
        <AnimatedTestimonials testimonials={animatedTestimonials} />
      ) : (
        <div className="px-8 md:px-20 py-20 text-center text-[#624a41]/60">
          No testimonials yet.
        </div>
      )}

      {/* ================= GIVE A REVIEW ================= */}
      <section className="py-32 px-8 md:px-20 bg-[#e8e6d8] relative border-t border-[#624a41]/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#bdaf62] font-bold block mb-4">
              Feedback
            </span>
            <h3 className="text-4xl md:text-5xl font-light text-[#624a41] mb-6">Share your experience</h3>
            <div className="h-px w-24 bg-[#892f1a] mx-auto opacity-50" />
          </div>

          <form onSubmit={submitReview} className="space-y-12">
            <div className="group relative">
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-[#624a41]/20 py-4 text-[#624a41] placeholder-transparent focus:outline-none focus:border-[#892f1a] transition-colors font-serif text-xl"
                id="roleInput"
                disabled={isSubmitting}
              />
              <label
                htmlFor="roleInput"
                className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] text-[#624a41]/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#624a41]/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#892f1a]"
              >
                Your Role (e.g. Founder)
              </label>
            </div>

            <div className="group relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=" "
                rows={4}
                className="peer w-full bg-transparent border-b border-[#624a41]/20 py-4 text-[#624a41] placeholder-transparent focus:outline-none focus:border-[#892f1a] transition-colors font-serif text-xl resize-none"
                id="messageInput"
                disabled={isSubmitting}
              />
              <label
                htmlFor="messageInput"
                className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] text-[#624a41]/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#624a41]/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#892f1a]"
              >
                Your Message
              </label>
            </div>

            <div className="flex flex-col items-center gap-10 mt-12">
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#624a41]/40">Rating</span>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setStar(n)}
                      className={cn(
                        "transition-transform focus:outline-none",
                        isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                      )}
                    >
                      <Star
                        size={24}
                        className={cn(
                          "transition-colors duration-300",
                          n <= star ? "fill-[#892f1a] text-[#892f1a]" : "text-[#624a41]/20"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className={cn(
                  "bg-[#624a41] text-[#e8e6d8] px-12 py-4 text-[10px] uppercase tracking-[0.4em] transition-all duration-500 shadow-xl flex items-center gap-2",
                  isSubmitting || !message.trim()
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-[#892f1a]"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </motion.button>

              <AnimatePresence>
                {reviewSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[#892f1a] font-serif italic text-lg"
                  >
                    {reviewSuccess}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-8 ring-1 ring-neutral-700/10 dark:bg-neutral-800 text-center">
        <div className="mt-8">
          <ThreeDMarquee images={images} />
        </div>
      </div>
    </div>
  );
}
