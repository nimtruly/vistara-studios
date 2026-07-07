import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import Services from "@/components/Services";
import About from "@/components/About";
import BookingForm from "@/components/BookingForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-white selection:text-black">
      {/* Floating navigation header */}
      <Navbar />

      {/* Hero display */}
      <Hero />

      {/* Portfolio items */}
      <FeaturedWork />

      {/* Agency capabilities */}
      <Services />

      {/* Studio details & metrics */}
      <About />

      {/* Booking form section */}
      <BookingForm />

      {/* Locations & contact channels */}
      <Contact />

      {/* Site footer */}
      <Footer />
    </main>
  );
}
