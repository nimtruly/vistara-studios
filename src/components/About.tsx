"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";

const STATS = [
  { numericValue: 150, suffix: "+", label: "PROJECTS COMPLETED" },
  { numericValue: 15, suffix: "+", label: "AWARDS & HONORS" },
  { numericValue: 8, suffix: "+", label: "COUNTRIES FILMED" },
  { numericValue: 12, suffix: "", label: "CREATIVE PROS" },
];

const CLIENTS = [
  "Royal Enfield", "Kia", "KTM", "BMW Motorrad", "Ducati", "Kawasaki", "Red Bull", "Hero"
];

function CounterValue({ numericValue, suffix }: { numericValue: number; suffix: string }) {
  const [count, setCount] = useState(1);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 1;
    const end = numericValue;
    if (start === end) {
      setCount(end);
      return;
    }

    const duration = 1.5; // seconds
    const totalMiliseconds = duration * 1000;
    const incrementTime = 16; // ~60fps
    const steps = totalMiliseconds / incrementTime;
    const stepIncrement = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericValue, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function BrandLogo({ name }: { name: string }) {
  switch (name) {
    case "Royal Enfield":
      return (
        <span className="font-serif font-black tracking-widest text-[9px] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-500">
          ROYAL ENFIELD
        </span>
      );
    case "Kia":
      return (
        <svg className="h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-500" viewBox="0 0 60 16" fill="currentColor">
          {/* K */}
          <path d="M4 16h3.2l5.6-7.8V16h3.2V0h-3.2v7.8L7.2 0H4l6 8.5-6 7.5z" />
          {/* I */}
          <path d="M22 0h3.2v16H22z" />
          {/* A without crossbar (Λ) */}
          <path d="M30 16h3.2l4.8-16h3.2l4.8 16h-3.2l-3.2-11-3.2 11H30z" />
        </svg>
      );
    case "KTM":
      return (
        <span className="font-sans font-black italic tracking-tighter text-muted-foreground group-hover:text-orange-500 text-base transition-colors duration-500">
          KTM
        </span>
      );
    case "BMW Motorrad":
      return (
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="7" />
            <path d="M12 2v20M2 12h20" />
          </svg>
          <span className="text-[8px] font-black tracking-widest text-muted-foreground group-hover:text-foreground uppercase">
            MOTORRAD
          </span>
        </div>
      );
    case "Ducati":
      return (
        <span className="font-sans font-black italic tracking-tighter text-muted-foreground group-hover:text-red-600 text-sm transition-colors duration-500">
          DUCATI
        </span>
      );
    case "Kawasaki":
      return (
        <span className="font-sans font-extrabold tracking-normal text-muted-foreground group-hover:text-green-500 text-xs transition-colors duration-500 uppercase">
          Kawasaki
        </span>
      );
    case "Red Bull":
      return (
        <span className="font-sans font-black tracking-tighter uppercase text-muted-foreground group-hover:text-foreground text-[10px] transition-colors duration-500 flex items-center gap-1">
          <span className="text-red-500 text-xs">⚡</span> RED BULL
        </span>
      );
    case "Hero":
      return (
        <span className="font-sans font-black italic tracking-tight text-muted-foreground group-hover:text-red-500 text-sm transition-colors duration-500">
          Hero
        </span>
      );
    default:
      return <span className="text-[10px] uppercase tracking-widest">{name}</span>;
  }
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Philosophy & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
          <div className="lg:col-span-6">
            <FadeIn direction="up">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight mt-4 leading-none text-foreground">
                WE CRAFT STORIES THAT DEMAND ATTENTION.
              </h2>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-6 flex flex-col justify-end">
            <FadeIn direction="up" delay={0.2}>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light tracking-wide">
                Founded in 2021, VISTARA STUDIOS is an international media agency specialized in commercial cinematography, premium storytelling, and visual production. We collaborate with forward-thinking brands, musicians, and filmmakers to create memorable visual experiences.
              </p>
              <p className="mt-6 text-muted-foreground text-sm md:text-base leading-relaxed font-light tracking-wide">
                By bridging high-end cinematic craftsmanship with modern digital distribution strategy, we make sure that our projects don&apos;t just look beautiful — they capture hearts and convert clients.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Statistics Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-y border-white/5 my-24 animate-fade-in">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label} className="text-center md:text-left">
              <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground block">
                <CounterValue numericValue={stat.numericValue} suffix={stat.suffix} />
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase block mt-2">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Client Showcase */}
        <div>
          <FadeIn direction="up" className="text-center mb-12">
            <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              Trusted By Industry Leaders
            </span>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {CLIENTS.map((client) => (
              <StaggerItem key={client}>
                <div className="h-16 flex items-center justify-center border border-white/5 bg-white/[0.01] rounded-lg hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 group">
                  <BrandLogo name={client} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </section>
  );
}
