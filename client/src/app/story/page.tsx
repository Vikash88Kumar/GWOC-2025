'use client'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import { useEffect, useState } from "react";
import {getStoryPage } from "../../services/story.api.js"
// import Stats from "@/components/Stats";
// import CTA from "@/components/CTA";
// import Footer from "@/components/Footer";

const Index = () => {
  const [data,setData]=useState({})
  useEffect(()=>{
    const fetchStory=async()=>{
      const res=await getStoryPage()
      setData(res?.data)
    }
    fetchStory()
  },[])
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <Hero />
      <Timeline />
      {/* <Services /> */}
      {/* <Stats /> */}
      {/* <CTA /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Index;