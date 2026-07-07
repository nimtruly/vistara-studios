"use client";


import React from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";

const SOCIALS = [
  { name: "INSTAGRAM", href: "https://www.instagram.com/vistara__studios/" },
  { name: "LINKEDIN", href: "https://linkedin.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="pt-32 pb-0 px-6 md:px-12 bg-card relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column: Direct info */}
          <div className="lg:col-span-5">
            <FadeIn direction="up">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
                CONNECT WITH US
              </h2>
              <p className="mt-6 text-muted-foreground text-sm md:text-base font-light tracking-wide leading-relaxed">
                Whether you want to discuss a new project, query our capabilities, or join our network of creative freelancers — reach out to our team.
              </p>
            </FadeIn>

            <div className="mt-12 space-y-8">
              {/* Emails */}
              <FadeIn direction="up" delay={0.1} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-muted-foreground shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase block">
                    EMAIL INBOX
                  </span>
                  <a href="mailto:hello@vistarastudios.com" className="text-sm font-bold text-foreground hover:underline mt-1 block">
                    hello@vistarastudios.com
                  </a>
                </div>
              </FadeIn>

              {/* Phone */}
              <FadeIn direction="up" delay={0.2} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-muted-foreground shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase block">
                    PHONE CHANNEL
                  </span>
                  <a href="tel:+13105550199" className="text-sm font-bold text-foreground hover:underline mt-1 block">
                    +rajat bhaiya ka phone number
                  </a>
                </div>
              </FadeIn>

              {/* Offices */}
              <FadeIn direction="up" delay={0.3} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-muted-foreground shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase block">
                    Based in
                  </span>
                  <p className="text-sm text-foreground font-light mt-1">
                    Dehradun, Uttarakhand, India
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right Column: Social channels Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <FadeIn direction="up" className="mb-6">
              <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                Digital Channels
              </span>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-2 gap-4">
              {SOCIALS.map((social) => (
                <StaggerItem key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 md:p-8 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-foreground">
                      {social.name}
                    </span>
                    <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>

      </div>
    </section>
  );
}
