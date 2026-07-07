"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "play" | "view" | "pointer">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for fluid interpolation
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile touch interface
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isTouch);
    };

    checkDevice();
    
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for parent items marked with custom cursors
      const customCursorItem = target.closest("[data-cursor]");
      if (customCursorItem) {
        const type = customCursorItem.getAttribute("data-cursor");
        setCursorType(type as "play" | "view" | "pointer" | "default");
        return;
      }

      // Check standard interactive elements
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.tagName === "SELECT" || 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" ||
        target.getAttribute("role") === "button";

      if (isInteractive) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (isMobile || !isVisible) {
    return null;
  }

  const isPointer = cursorType === "pointer";
  const isPlay = cursorType === "play";
  const isView = cursorType === "view";

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isPlay || isView ? 80 : isPointer ? 48 : 8,
        height: isPlay || isView ? 80 : isPointer ? 48 : 8,
        backgroundColor: isPlay || isView ? "rgba(255,255,255,0.95)" : isPointer ? "rgba(255,255,255,0.08)" : "rgb(255,255,255)",
        border: isPointer ? "1px solid rgba(255,255,255,0.3)" : "none",
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center select-none text-[10px] font-bold tracking-widest text-black shadow-lg"
      )}
    >
      {isPlay && <span>PLAY</span>}
      {isView && <span>VIEW</span>}
    </motion.div>
  );
}
