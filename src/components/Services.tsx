"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Film, Palette, Zap, Volume2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: Film,
    title: "CREATIVE DIRECTION",
    description: "From concept design to storyboarding and scripts. We shape the overarching vision that defines your visual identity.",
  },
  {
    icon: Camera,
    title: "CINEMATOGRAPHY",
    description: "High-fidelity capture using premium camera platforms (ARRI, RED). Expert lighting, composition, and aerial capture.",
  },
  {
    icon: Zap,
    title: "COMMERCIAL PRODUCTION",
    description: "High-end corporate campaigns, product films, and social spots designed for deep visual impact and audience conversion.",
  },
  {
    icon: Palette,
    title: "COLOR GRADING",
    description: "Precision cinematic color grading. Establishing custom lookup-tables (LUTs) and color spaces tailored to the story.",
  },
  {
    icon: Volume2,
    title: "SOUND DESIGN",
    description: "Custom audio scoring, foley, multi-track mixing, and sound design to create an immersive, theater-quality sensory experience.",
  },
];

function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized pointer position from -0.5 to 0.5
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;

    // Rotate bounds (up to 8 degrees)
    setRotateX(-yVal * 12);
    setRotateY(xVal * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.4 }}
      className="h-full"
    >
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="group h-full p-8 md:p-10 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-500 ease-out flex flex-col justify-between"
      >
        <div>
          {/* Icon container */}
          <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-foreground group-hover:bg-white group-hover:text-black transition-colors duration-500 mb-8">
            <Icon size={20} className="stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-foreground">
            {service.title}
          </h3>
          <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed font-light">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-card relative border-t border-white/5">
      {/* Background Lights (Premium Gradient Glow) */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <FadeIn direction="up">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-2 text-foreground">
              Production Capabilities
            </h2>
            <p className="mt-4 text-muted-foreground text-sm md:text-base font-light tracking-wide leading-relaxed">
              We handle the entire production pipeline. Our focus is delivering pristine visual quality, cinematic pacing, and strong brand narrative.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service) => {
            return (
              <StaggerItem key={service.title} className="h-full">
                <ServiceCard service={service} />
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
