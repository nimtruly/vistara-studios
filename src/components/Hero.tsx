"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { FadeIn } from "./Animations";

export default function Hero() {
  const [isFullScreenPlayerOpen, setIsFullScreenPlayerOpen] = useState(false);

  const handleCardClick = () => {
    setIsFullScreenPlayerOpen(true);
  };

  return (
    <>
      <section 
        id="home"
        className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden"
      >
        {/* Background Lights (Premium Gradient Glow) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />

        <div className="max-w-6xl w-full flex flex-col items-center text-center">
          {/* Header Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h1 className="text-[12vw] sm:text-[8vw] md:text-[6.5vw] font-extrabold uppercase tracking-[-0.04em] leading-[0.9] text-foreground text-center">
              VISTARA STUDIOS
            </h1>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-light tracking-wide">
              Crafting Cinematic Stories. Elevating Brands.
            </p>
          </motion.div>

          {/* Showreel Card Wrapper */}
          <FadeIn delay={0.4} duration={1.2} direction="up" className="w-full max-w-5xl mt-6 relative group">
            <div 
              onClick={handleCardClick}
              data-cursor="play"
              className="relative aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl shadow-black/80 cursor-pointer transform-gpu hover:border-white/20 transition-all duration-700"
            >
              {/* Autoplayer Video Placeholder (Instagram Reel Embed cropped to aspect-video) */}
              <iframe
                src="https://www.instagram.com/reel/DWRd1jjE7v1/embed"
                className="absolute inset-0 w-full h-full border-0 pointer-events-none scale-[1.25] origin-center"
                style={{ height: "135%", top: "-17%" }}
                scrolling="no"
              />

              {/* Dark Overlay tint */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/45 transition-colors duration-500" />

              {/* Custom Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform-gpu transition-all duration-300 relative group/btn"
                >
                  <div className="absolute inset-0 rounded-full border border-white scale-100 opacity-30 group-hover/btn:scale-150 group-hover/btn:opacity-0 transition-all duration-700 ease-out" />
                  <Play className="fill-current w-6 h-6 ml-1 translate-x-[1px] text-black" />
                </motion.div>
              </div>

              {/* Corner Audio Indicator & Text */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-3">
                <span className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                  SHOWREEL 2026
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cinematic Fullscreen Modal Player */}
      <AnimatePresence>
        {isFullScreenPlayerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            {/* Close trigger backdrop */}
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsFullScreenPlayerOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden bg-black border border-white/10 z-10"
            >
              {/* Instagram Video Player embed */}
              <iframe
                src="https://www.instagram.com/reel/DWRd1jjE7v1/embed"
                className="w-full h-full border-0 absolute inset-0"
                scrolling="no"
              />

              {/* Close Button */}
              <button
                onClick={() => setIsFullScreenPlayerOpen(false)}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/60 hover:bg-black/95 text-white border border-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none z-20"
                aria-label="Close video player"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
