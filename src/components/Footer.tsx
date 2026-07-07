"use client";

import React from "react";
import { FadeIn } from "./Animations";

export default function Footer() {

  return (
    <footer className="bg-background pt-0 pb-16 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Large Signature Wordmark */}
        <div className="w-full text-center -mt-16 md:-mt-28 mb-8 overflow-hidden">
          <FadeIn direction="up" duration={1.2}>
            <span className="text-[14vw] font-black tracking-[-0.07em] leading-none select-none text-white/[0.02] block translate-y-3">
              VISTARA
            </span>
          </FadeIn>
        </div>

        {/* Lower Row Grid */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5 text-center md:text-left">
          
          {/* Logo & Rights */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">
              VISTARA STUDIOS
            </span>
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
              © {new Date().getFullYear()} VISTARA STUDIOS. ALL RIGHTS RESERVED.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
