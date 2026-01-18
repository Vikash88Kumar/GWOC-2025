// "use client";
// import { cn } from "@/lib/utils";
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Star, Loader2 } from 'lucide-react';
// import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
// import { ThreeDMarquee } from '@/components/ui/3d-marquee';
// import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
// import Link from 'next/link';

// // ✅ Updated Imports
// import { createTestimonial } from "../services/testimonial.api.js";
// import { getHomePage } from "../services/homepage.api.js";
// // Assuming the file you created is named Testimonial.tsx in your ui folder
// import TestimonialSection from '@/components/ui/Testimonials'; 
// import { useAdmin } from "@/contexts/AdminContext";

// const HomePage = () => {
//   const [data, setData] = useState<any>({});
//   // ❌ Removed dbTestimonials state (handled inside TestimonialSection now)
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // --- SLIDER STATE ---
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // --- SUBMIT REVIEW STATE ---
//   const [role, setRole] = useState('');
//   const [message, setMessage] = useState('');
//   const [star, setStar] = useState<number | null>(5);
//   const [reviewSuccess, setReviewSuccess] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- FETCH DATA ---
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // ✅ Only fetch Homepage data here (Testimonials fetch themselves)
//         const homeRes = await getHomePage();

//         // Handle Homepage Data structure
//         setData(homeRes?.data ?? homeRes ?? {});

//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//         setError(String(err));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // --- HERO SLIDER LOGIC ---
//   const heroImages = Array.isArray(data?.hero?.backgroundImage) && data.hero.backgroundImage.length > 0
//     ? data.hero.backgroundImage
//     : ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000"]; // Fallback

//   useEffect(() => {
//     if (heroImages.length <= 1) return; 
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroImages.length);
//     }, 5000); 
//     return () => clearInterval(interval);
//   }, [heroImages.length]);


//   // --- DATA MAPPING ---
  
//   // Projects
//   const { addTestimonial } = useAdmin(); // We still need addTestimonial for the form
  
//   const apiProjects = (data?.projects?.items ?? []).map((it: any) => ({
//     title: it.title || '',
//     date: it.subtitle || '',
//     img: it.image || '',
//     id: it._id,
//     order: it.order || 0
//   })).sort((a: any, b: any) => a.order - b.order);

//   const projects = apiProjects.length > 0 ? apiProjects : [];

//   // Footer Marquee Images
//   const marqueeImages = (data?.footer?.marqueeImages && data.footer.marqueeImages.length > 0)
//     ? data.footer.marqueeImages
//     : [
//         "/1.png", "/2.png", "/3.png", "/4.png", "/5.png" 
//       ];


//   // --- SUBMIT REVIEW FUNCTION ---
//   const submitReview = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     const payload = { role, message, star };

//     try {
//       const res = await createTestimonial(payload);

//       if (res?.data) {
//         const t = res.data;
//         addTestimonial({
//           // ✅ FIX: Use 'id' and handle missing _id
//           id: t._id || Date.now().toString(), 
          
//           clientName: t.name || 'Anonymous',
//           clientRole: t.role || role,
//           clientCompany: t.company || '',
//           clientImage: t.avatar || '/placeholder-profile.png',
//           content: t.message || message,
          
//           // ✅ FIX: Ensure rating is a number
//           rating: t.star || star || 5, 
          
//           status: t.status || 'pending',
//           createdAt: t.createdAt || new Date().toISOString(),
//         });
//       } else {
//         // Fallback for failed response structure
//         addTestimonial({
//           id: Date.now().toString(),
//           clientName: 'Anonymous',
//           clientRole: role,
//           clientCompany: '',
//           clientImage: '/placeholder-profile.png',
//           content: message,
//           rating: star || 5, 
//           status: 'pending',
//           createdAt: new Date().toISOString(),
//         });
//       }

//       setRole('');
//       setMessage('');
//       setStar(5);
//       setReviewSuccess('Thanks for your review! It will appear after approval.');
//       setTimeout(() => setReviewSuccess(''), 3000);

//     } catch (err) {
//       console.error('Failed to submit testimonial to server', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//       return <div className="min-h-screen bg-[#e8e6d8] flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-[#624a41]" /></div>;
//   }

//   return (
//     <div className="w-full bg-[#e8e6d8] text-[#624a41] font-serif selection:bg-[#bdaf62] selection:text-white">

//       {/* ================= HERO SECTION ================= */}
//       <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <AnimatePresence mode="popLayout">
//             <motion.img
//               key={currentSlide}
//               src={heroImages[currentSlide]}
//               alt={data?.hero?.headline ?? 'Studio Interior'}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 1.5, ease: "easeInOut" }}
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//           </AnimatePresence>
//           <div className="absolute inset-0 bg-[#892f1a]/40 mix-blend-multiply z-[1]"></div>
//           <div className="absolute inset-0 bg-gradient-to-b from-[#624a41]/60 via-transparent to-[#e8e6d8] z-[2]"></div>
//         </div>
//       </section>

//       {/* ================= INTRO SECTION ================= */}
//       <section className="w-full py-32 px-8 md:px-20 grid md:grid-cols-1 gap-20 items-center bg-[#e8e6d8]">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="relative flex w-full items-center justify-center">
//             <DottedGlowBackground
//               className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
//               opacity={0.5}
//               gap={10}
//               radius={2.5}
//               colorLightVar="--color-neutral-500"
//               glowColorLightVar="--color-neutral-600"
//               colorDarkVar="--color-neutral-500"
//               glowColorDarkVar="--color-dark"
//               backgroundOpacity={0.01}
//               speedMin={0.3}
//               speedMax={1.6}
//               speedScale={1}
//             />
//             <div className="w-full relative z-10 flex items-center justify-between space-y-6 px-4 py-16 text-center md:flex-row md:px-40">
//                 <motion.div
//                   initial={{ opacity: 0, y: 40 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 1.2, ease: "easeOut" }}
//                   className="max-w-5xl z-10 mx-auto"
//                 >
//                   <h1 className="text-5xl md:text-[85px] font-light leading-[1.05] mb-10 text-[#624a41]">
//                     {data?.intro?.heading || data?.hero?.headline || (
//                       <>Creating strategic, <span className="italic text-[#bdaf62]">confident</span> and timeless designs.</>
//                     )}
//                   </h1>
//                   <p className="font-sans text-sm md:text-base tracking-[0.3em] mb-12 text-[#624a41] uppercase max-w-3xl mx-auto">
//                     {data?.intro?.description || data?.hero?.subHeadline || 'We ensure your brand feels like home to those it serves.'}
//                   </p>
                  
//                   {data?.intro?.floatingCircleText && (
//                       <div className="absolute -top-20 -right-20 hidden md:block animate-spin-slow">
//                           <svg viewBox="0 0 100 100" width="140" height="140">
//                             <defs>
//                                 <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
//                             </defs>
//                             <text fontSize="11" fill="#624a41" fontWeight="bold" letterSpacing="2">
//                                 <textPath xlinkHref="#circle">
//                                     {data.intro.floatingCircleText} • {data.intro.floatingCircleText} •
//                                 </textPath>
//                             </text>
//                           </svg>
//                       </div>
//                   )}

//                   <Link href={data?.hero?.ctaLink ?? '/services'}>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       className="hover:bg-[#e8e6d8] hover:text-[#624a41] px-10 py-4 text-[10px] rounded-xl uppercase tracking-[0.4em] bg-[#892f1a] text-white transition-all duration-500 shadow-xl"
//                     >
//                       {data?.hero?.ctaText ?? "Let's Get Started"}
//                     </motion.button>
//                   </Link>
//                 </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* ================= WORK SHOWCASE (PROJECTS) ================= */}
//       <section className="bg-[#624a41] text-[#e8e6d8] py-32 px-8 md:px-20 relative">
//         <div className={cn(
//             "absolute inset-0",
//             "bg-size-[40px_40px]",
//             "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
//             "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
//           )}
//         />
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
//           <div className="md:w-1/3 pr-8">
//             <div className="sticky top-32 flex justify-center flex-col">
//               <h2 className="text-5xl font-light mb-6">{data?.projects?.heading ?? "Glimpse into our work"}</h2>
//               <p className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62]">{data?.projects?.subHeading ?? "Selected Works"}</p>
//             </div>
//           </div>

//           <div className="md:w-2/3 space-y-40">
//             {projects.map((proj: any, idx: number) => (
//               <motion.div
//                 key={proj.id || idx}
//                 initial={{ opacity: 0, y: 80 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-10%" }}
//                 transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//                 className="group"
//               >
//                 <CardContainer className="inter-var md:w-full w-auto h-auto perspective-1000px">
//                   <CardBody className="bg-transparent relative group/card w-auto md:w-full rounded-xl p-0 border-none">
//                     <CardItem translateZ="50" className="w-full h-auto mt-4">
//                       <img
//                         src={proj.img}
//                         className="w-full object-cover rounded-xl group-hover/card:shadow-xl aspect-[4/3]"
//                         alt={proj.title}
//                       />
//                     </CardItem>
//                   </CardBody>
//                 </CardContainer>

//                 <div className="flex flex-col border-l-2 border-[#892f1a] pl-6 transition-all duration-500 group-hover:pl-10 mt-8">
//                   <span className="text-[10px] uppercase tracking-[0.3em] text-[#bdaf62] mb-3">{proj.date}</span>
//                   <h3 className="text-4xl tracking-wide font-light">{proj.title}</h3>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= CLIENTS SECTION ================= */}
//       {data?.clients?.logos?.length > 0 && (
//           <section className="py-24 px-8 md:px-20 bg-[#e8e6d8]">
//              <div className="max-w-7xl mx-auto">
//                 <div className="text-center mb-16">
//                     <h3 className="text-2xl font-light text-[#624a41]">{data.clients.heading || "Trusted By"}</h3>
//                     <div className="h-px w-12 bg-[#892f1a] mx-auto mt-4 opacity-50"></div>
//                 </div>
                
//                 <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
//                     {data.clients.logos.map((logo: string, i: number) => (
//                         <div key={i} className="w-32 h-20 relative flex items-center justify-center">
//                              {/* eslint-disable-next-line @next/next/no-img-element */}
//                              <img src={logo} alt="Client Logo" className="max-w-full max-h-full object-contain" />
//                         </div>
//                     ))}
//                 </div>
//              </div>
//           </section>
//       )}

//       {/* ================= STATS SECTION ================= */}
//       <section className="py-40 px-8 bg-[#624a41]/5 text-center">
//         <h2 className="text-3xl italic mb-24 text-[#892f1a]">{data?.stats?.heading ?? "Our story in numbers"}</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
//           {(data?.stats?.items ?? []).map((stat: any, i: number) => (
//             <div key={stat._id || i}>
//               <div className="text-6xl font-light mb-4 text-[#624a41]">{stat.title}</div>
//               <p className="font-sans text-[10px] uppercase tracking-[0.4em] font-black text-[#bdaf62]">{stat.subtitle}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= TESTIMONIALS SECTION (Self-Fetching) ================= */}
//       <TestimonialSection />

//       {/* ================= GIVE A REVIEW ================= */}
//       <section className="py-32 px-8 md:px-20 bg-[#e8e6d8] relative border-t border-[#624a41]/10">
//         <div className="max-w-2xl mx-auto">

//           <div className="text-center mb-16">
//             <span className="text-[10px] uppercase tracking-[0.4em] text-[#bdaf62] font-bold block mb-4">
//               Feedback
//             </span>
//             <h3 className="text-4xl md:text-5xl font-light text-[#624a41] mb-6">
//               Share your experience
//             </h3>
//             <div className="h-px w-24 bg-[#892f1a] mx-auto opacity-50"></div>
//           </div>

//           <form onSubmit={submitReview} className="space-y-12">
//             <div className="group relative">
//               <input
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 placeholder=" "
//                 className="peer w-full bg-transparent border-b border-[#624a41]/20 py-4 text-[#624a41] placeholder-transparent focus:outline-none focus:border-[#892f1a] transition-colors font-serif text-xl"
//                 id="roleInput"
//                 disabled={isSubmitting}
//               />
//               <label htmlFor="roleInput" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] text-[#624a41]/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#624a41]/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#892f1a]">
//                 Your Role (e.g. Founder)
//               </label>
//             </div>

//             <div className="group relative">
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder=" "
//                 rows={4}
//                 className="peer w-full bg-transparent border-b border-[#624a41]/20 py-4 text-[#624a41] placeholder-transparent focus:outline-none focus:border-[#892f1a] transition-colors font-serif text-xl resize-none"
//                 id="messageInput"
//                 disabled={isSubmitting}
//               />
//               <label htmlFor="messageInput" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] text-[#624a41]/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#624a41]/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#892f1a]">
//                 Your Message
//               </label>
//             </div>

//             <div className="flex flex-col items-center gap-10 mt-12">
//               <div className="flex flex-col items-center gap-4">
//                 <span className="text-[10px] uppercase tracking-[0.2em] text-[#624a41]/40">Rating</span>
//                 <div className="flex gap-2">
//                   {[1, 2, 3, 4, 5].map((n) => (
//                     <button
//                       key={n}
//                       type="button"
//                       disabled={isSubmitting}
//                       onClick={() => setStar(n)}
//                       className={cn(
//                         "transition-transform focus:outline-none",
//                         isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
//                       )}
//                     >
//                       <Star
//                         size={24}
//                         className={cn(
//                           "transition-colors duration-300",
//                           star && n <= star ? "fill-[#892f1a] text-[#892f1a]" : "text-[#624a41]/20"
//                         )}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={!isSubmitting ? { scale: 1.05 } : {}}
//                 whileTap={!isSubmitting ? { scale: 0.95 } : {}}
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={cn(
//                   "bg-[#624a41] text-[#e8e6d8] px-12 py-4 text-[10px] uppercase tracking-[0.4em] transition-all duration-500 shadow-xl flex items-center gap-2",
//                   isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#892f1a]"
//                 )}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="animate-spin w-4 h-4" />
//                     Submitting...
//                   </>
//                 ) : (
//                   "Submit Review"
//                 )}
//               </motion.button>

//               <AnimatePresence>
//                 {reviewSuccess && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="text-[#892f1a] font-serif italic text-lg"
//                   >
//                     {reviewSuccess}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </form>
//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-8 ring-1 ring-neutral-700/10 dark:bg-neutral-800 text-center">
//          <div className="mb-10">
//             {data?.footer?.heading && (
//                 <h2 className="text-3xl md:text-5xl font-light text-[#624a41] mb-6">{data.footer.heading}</h2>
//             )}
//             {data?.footer?.ctaText && (
//                  <Link href="/contact">
//                     <button className="bg-[#892f1a] text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs hover:bg-[#624a41] transition-colors">
//                         {data.footer.ctaText}
//                     </button>
//                  </Link>
//             )}
//          </div>

//          <div className="mt-8">
//             <ThreeDMarquee images={marqueeImages} />
//          </div>
//       </div>

//     </div>
//   );
// };

// export default HomePage;