"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Lightbulb,
  Users,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  ArrowRight,
  Trophy,
  Loader2
} from "lucide-react";

import { getFounderPage } from "@/services/founder.api";

/* ---------------- TYPES ---------------- */

type Social = { label: string; url: string };
type Value = { title: string; description: string; icon: string };
type Award = { title: string; description: string; year: number };
type Milestone = { year: string; title: string; description: string };

type FounderData = {
  hero: {
    role: string;
    firstName: string;
    lastName: string;
    tagline: string;
    experienceYears: number;
    profileImage: string;
  };
  story: {
    quote: string;
    paragraphs: string[];
  };
  connect: {
    headline: string;
    subHeadline: string;
    email: string;
    socials: Social[];
  };
  values: Value[];
  awards: Award[];
  milestones: Milestone[];
};

/* ---------------- ICON MAP ---------------- */

const iconMap: Record<string, any> = {
  Heart,
  Lightbulb,
  Users,
  Twitter,
  Linkedin,
  Instagram,
  Mail
};

const getIcon = (name: string) => iconMap[name] || Lightbulb;

/* ---------------- PAGE ---------------- */

export default function FounderPage() {
  const [data, setData] = useState<FounderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFounderPage()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e8e6d8]">
        <Loader2 className="w-10 h-10 animate-spin text-[#624a41]" />
      </div>
    );
  }

  if (!data) return <div className="bg-[#e8e6d8] text-[#892f1a] min-h-screen flex items-center justify-center font-serif">Error loading page</div>;

  const { hero, story, values, awards, milestones, connect } = data;

  return (
    <main className="bg-[#e8e6d8] text-[#624a41] font-serif selection:bg-[#bdaf62] selection:text-white">

      {/* HERO */}
      <section className="min-h-screen flex items-center px-10 bg-[#e8e6d8]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-widest text-sm mb-4 text-[#892f1a]">{hero.role}</p>
            <h1 className="text-6xl font-light">
              {hero.firstName} <span className="italic text-[#bdaf62]">{hero.lastName}</span>
            </h1>
            <p className="mt-6 text-lg text-[#624a41]">{hero.tagline}</p>

            <div className="mt-8 flex gap-4">
              <Link href="/services" className="px-6 py-3 bg-[#624a41] text-[#e8e6d8] rounded-full font-sans hover:bg-[#892f1a] hover:text-white transition-all duration-300">
                View Services <ArrowRight className="inline w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <img
            src={hero.profileImage}
            alt="Founder"
            className="rounded-xl shadow-lg border-4 border-[#bdaf62]"
          />
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 max-w-4xl mx-auto px-6 bg-[#e8e6d8]">
        <blockquote className="text-2xl italic mb-10 border-l-4 pl-6 border-[#892f1a] text-[#892f1a]">{story.quote}</blockquote>
        <div className="grid md:grid-cols-2 gap-10">
          {story.paragraphs.map((p, i) => (
            <p key={i} className="text-[#624a41]">{p}</p>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-[#f7f6f2]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {values.map((v) => {
            const Icon = getIcon(v.icon);
            return (
              <div key={v.title} className="p-6 bg-[#e8e6d8] rounded-xl shadow border border-[#bdaf62]/30">
                <Icon className="w-8 h-8 mb-4 text-[#892f1a]" />
                <h3 className="text-xl font-semibold">{v.title}</h3>
                <p className="text-[#624a41] mt-2">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* AWARDS */}
      <section className="py-24 bg-[#624a41] text-[#e8e6d8]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
          {awards.map((a, i) => (
            <div key={i} className="p-6 border border-[#bdaf62]/20 rounded-xl">
              <Trophy className="mb-4 text-[#bdaf62]" />
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm opacity-80">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONNECT */}
      <section className="py-24 text-center bg-[#e8e6d8]">
        <h2 className="text-4xl font-bold mb-6 text-[#624a41]">{connect.headline}</h2>
        <p className="text-[#624a41] mb-8">{connect.subHeadline}</p>

        <a
          href={`mailto:${connect.email}`}
          className="inline-block px-8 py-4 bg-[#892f1a] text-white rounded-full font-sans hover:bg-[#624a41] transition-all duration-300"
        >
          Send a Message
        </a>

        <div className="flex justify-center gap-6 mt-10">
          {connect.socials.map((s) => {
            const Icon = getIcon(s.label);
            return (
              <a key={s.label} href={s.url} target="_blank" className="hover:text-[#892f1a] transition-colors duration-300">
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>
      </section>

    </main>
  );
}
