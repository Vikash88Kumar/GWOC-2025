'use client';

import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import VisionValues from "@/components/VisionValues";
import { getStoryPage } from "../../services/story.api.js";

const Index = () => {
  // We can fetch data if needed, or use static defaults for the Story narrative
  const [data, setData] = useState<any>(null);

  // Optional: Fetch dynamic data if existing API supports it, otherwise defaults in components work
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await getStoryPage();
        setData(res?.data ?? res);
      } catch (e) {
        console.error(e);
      }
    }
    fetchStory();
  }, []);

  const storyHeroData = {
    miniTag: "Blooming Since 2018",
    titleLines: ["Our Story", "Unfolded"],
    subtitle: "From a small coffee shop table to a global branding studio. This is how we grew, one brand at a time.",
    ctas: {
      primary: { label: "View Our Work", href: "/#portfolio", variant: "outline" },
      secondary: { label: "Contact Us", href: "/contact", variant: "ghost" }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--earth-gray)]">
      <Hero hero={data?.hero || storyHeroData} />
      <VisionValues />
      <Timeline timeline={data?.timeline} />
    </div>
  );
};

export default Index;