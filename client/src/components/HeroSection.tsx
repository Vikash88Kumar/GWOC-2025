'use client'
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
export default  function HeroSection(){
    return (
  <div className="container w-full bg-black min-h-screen">
    <div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />
 
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Blooming <br /> Your Brands.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-base font-normal text-neutral-300">
          Spotlight effect is a great way to draw attention to a specific part
          of the page. Here, we are drawing the attention towards the text
          section of the page. I don&apos;t know why but I&apos;m running out of
          copy.
        </p>
        <div className="mt-16 flex items-center justify-center gap-8">
        <HoverBorderGradient
        containerClassName="rounded-lg"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        
        <span>Aceternity UI</span>
      </HoverBorderGradient>

        <button className="px-6 py-3 bg-white border border-white/20 text-black font-bold rounded-lg hover:bg-zinc-100 transition-colors uppercase text-xs tracking-widest">
          View Pricing
        </button>
      </div>
      </div>
    </div>
  </div>
);
}