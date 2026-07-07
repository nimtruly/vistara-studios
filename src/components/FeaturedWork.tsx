"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "./Animations";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Commercial", "Narrative", "Documentary", "Fashion"];

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  imageUrl: string;
  videoPreviewUrl?: string;
  aspectRatio: "video" | "square" | "portrait";
  instagramUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "DIRT TRACK RACING",
    category: "Commercial",
    client: "Vistara Studios",
    year: "2026",
    imageUrl: "https://www.instagram.com/reel/DWRd1jjE7v1/media/?size=l",
    aspectRatio: "video",
    instagramUrl: "https://www.instagram.com/reel/DWRd1jjE7v1/",
  },
  {
    id: "2",
    title: "RE SLIDE SCHOOL FINALS",
    category: "Commercial",
    client: "Royal Enfield Motorsports",
    year: "2026",
    imageUrl: "https://www.instagram.com/reel/DWJLPqmk4-z/media/?size=l",
    aspectRatio: "video",
    instagramUrl: "https://www.instagram.com/reel/DWJLPqmk4-z/",
  },
  {
    id: "3",
    title: "CREATIVE CONCEPT GLIMPSES",
    category: "Fashion",
    client: "Rajat Negi Conceptual",
    year: "2025",
    imageUrl: "https://www.instagram.com/p/DUSG4LsEsj1/media/?size=l",
    aspectRatio: "video",
    instagramUrl: "https://www.instagram.com/p/DUSG4LsEsj1/",
  },
  {
    id: "4",
    title: "SLIDE SCHOOL CUP SEASON 2",
    category: "Documentary",
    client: "Motoring World",
    year: "2026",
    imageUrl: "https://www.instagram.com/p/DYhHfNRH5Er/media/?size=l",
    aspectRatio: "video",
    instagramUrl: "https://www.instagram.com/p/DYhHfNRH5Er/",
  },
];

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track the scroll of this specific card relative to the window
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Calculate parallax offset for image crop translation
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => {
        if (project.instagramUrl) {
          window.open(project.instagramUrl, "_blank");
        }
      }}
      className="group cursor-pointer"
      data-cursor="view"
    >
      {/* Image Showcase Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/5 shadow-md transform-gpu transition-all duration-700 ease-out group-hover:border-white/20">
        <motion.div
          style={{ y, height: "116%", top: "-8%", position: "absolute", left: 0, right: 0 }}
          className="w-full"
        >
          <Image
            className="object-cover scale-102 group-hover:scale-100 transition-transform duration-1000 ease-out"
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-w-768px) 100vw, 50vw"
            priority={idx < 2}
            unoptimized
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/45 transition-colors duration-500 flex items-end p-6 md:p-8" />

        {/* Subtle reveal details overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest transition-transform duration-500 translate-y-3 group-hover:translate-y-0 shadow-lg">
            View Project
          </span>
        </div>
      </div>

      {/* Text Metadata */}
      <div className="mt-6 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            {project.category} &bull; CLIENT: {project.client}
          </span>
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide mt-1 text-foreground">
            {project.title}
          </h3>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {project.year}
        </span>
      </div>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-32 px-6 md:px-12 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <FadeIn direction="up">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Selected Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-2 text-foreground">
              Featured Work
            </h2>
          </FadeIn>

          {/* Categories Tab Selector */}
          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2 md:pb-0">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all duration-300 relative rounded-md",
                    activeCategory === category
                      ? "text-foreground bg-white/5"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
