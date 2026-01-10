'use client';
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Instagram } from "lucide-react";
import  Link  from "next/link";
// import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-bloom-pattern">
      {/* <Header /> */}
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
              >
                <Sparkles className="h-4 w-4" />
                Creative Branding Studio
              </motion.div>
              
              <h1 className="font-display text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
                Where brands{" "}
                <span className="text-gradient-bloom">bloom</span>
                {" "}& stories unfold
              </h1>
              
              <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
                We're a creative branding studio that helps ambitious brands grow through 
                strategic storytelling, stunning visuals, and high-impact digital experiences.
              </p>
              
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
                  >
                    View Our Services
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
                
                <a
                  href="https://www.instagram.com/bloom.branding_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-4 font-semibold text-primary transition-all duration-300 hover:bg-primary/5"
                  >
                    <Instagram className="h-5 w-5" />
                    Follow Us
                  </motion.button>
                </a>
              </div>
            </motion.div>
            
            {/* Decorative visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                {/* Abstract decorative circles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-accent" />
                  <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary" />
                </motion.div>
                
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-primary/20" />
                <div className="absolute inset-16 rounded-full border-2 border-accent/20" />
                <div className="absolute inset-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl bg-card p-8 shadow-2xl">
                    <span className="font-display text-6xl font-bold text-gradient-bloom">B</span>
                  </div>
                </div>
              </div>
              
              {/* Background blurs */}
              <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute -left-10 bottom-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-muted-foreground to-transparent" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Values Section */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Our Creative Approach
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Every brand has a unique story waiting to bloom. We combine strategy, 
              creativity, and craft to bring your vision to life.
            </p>
          </motion.div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Strategy First",
                description: "We dive deep into understanding your brand, audience, and market before creating anything."
              },
              {
                number: "02",
                title: "Bold Creativity",
                description: "We push boundaries and challenge conventions to create work that truly stands out."
              },
              {
                number: "03",
                title: "Growth Mindset",
                description: "Every decision is guided by your brand's growth potential and long-term success."
              }
            ].map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-xl">
                  <span className="font-display text-5xl font-bold text-accent/20 transition-colors group-hover:text-accent/40">
                    {item.number}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-primary p-12 text-center md:p-20"
          >
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
                Let's create something extraordinary
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                Ready to transform your brand? Let's start a conversation.
              </p>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 font-semibold text-primary transition-all duration-300 hover:shadow-2xl"
                >
                  Explore Our Services
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-sm font-bold text-primary-foreground">B</span>
              </div>
              <span className="font-display text-lg font-semibold text-foreground">
                Bloom Branding
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 Bloom Branding. All rights reserved.
            </p>
            
            <a
              href="https://www.instagram.com/bloom.branding_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
            >
              @bloom.branding_
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;