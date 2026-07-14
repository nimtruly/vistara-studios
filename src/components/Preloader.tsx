"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 20; // refresh rate
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait for slide-up exit animation to finish
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = "VISTARA".split("");

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-neutral-950 z-[9999] flex flex-col justify-between p-12 select-none"
        >
          {/* Top metadata tags */}
          <div className="flex justify-between text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
            <span>STUDIO CODES: 2026</span>
            <span>CINEMATIC VENTURE</span>
          </div>

          {/* Centered letter stagger */}
          <div className="flex items-center justify-center overflow-hidden">
            {letters.map((char, index) => {
              // Reveal letters gradually as progress climbs
              const threshold = (index / letters.length) * 80;
              const isVisible = progress >= threshold;

              return (
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[-0.05em] text-white inline-block px-1"
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

          {/* Bottom progress counter */}
          <div className="flex items-end justify-between border-t border-white/5 pt-8">
            <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
              INITIALIZING CREATIVE PIPELINE
            </span>
            <span className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white font-mono w-24 text-right">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
