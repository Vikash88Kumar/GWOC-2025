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
  const [data,setData]=useState<any>(null)
  useEffect(()=>{
    const fetchStory=async()=>{
      try{
        const res=await getStoryPage()
        // getStoryPage returns ApiResponse-like object: { statusCode, data, message }
        setData(res?.data ?? res)
      }catch(e){
        console.error('Failed to load story page', e)
      }
    }
    fetchStory()
  },[])
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <Hero hero={data?.hero} />
      <Timeline timeline={data?.timeline} />
      {/* <Services /> */}
      {/* <Stats /> */}
      {/* <CTA /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Index;