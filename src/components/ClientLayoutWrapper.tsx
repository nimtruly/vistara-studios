"use client";

import React, { useState, useEffect } from "react";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      // Ensure page starts scrolled at top
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      {!loading && <CustomCursor />}
      <div className={loading ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-1000 ease-out"}>
        {children}
      </div>
    </>
  );
}
