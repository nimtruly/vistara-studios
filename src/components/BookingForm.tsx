"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useBooking } from "@/hooks/useBooking";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FadeIn } from "./Animations";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(6, "Phone number must be at least 6 characters."),
  projectType: z.string().min(1, "Please select a project type."),
  budget: z.string().min(1, "Please select a budget range."),
  timeline: z.string().min(1, "Please select a timeline."),
  details: z.string().min(15, "Please explain your project in at least 15 characters."),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const { mutate: submitBooking, isPending } = useBooking();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      details: "",
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    submitBooking(data, {
      onSuccess: () => {
        toast.success("Inquiry Sent Successfully!", {
          description: "Our production team will review your project and get back to you within 24 hours.",
        });
        reset();
      },
      onError: (err: Error) => {
        toast.error("Submission Failed", {
          description: err.message || "Something went wrong. Please check your inputs.",
        });
      },
    });
  };

  return (
    <section id="booking" className="py-32 px-6 md:px-12 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column Text Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <FadeIn direction="up">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Inquiries
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
                LET&apos;S COLLABORATE
              </h2>
              <p className="mt-6 text-muted-foreground text-sm md:text-base font-light tracking-wide leading-relaxed">
                Have a project or story you want to bring to life? Fill out the form with your project parameters, and our producers will schedule a discovery session.
              </p>
              
              <div className="mt-12 space-y-6">
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase block">
                    Direct Line
                  </span>
                  <a href="mailto:production@vistarastudios.com" className="text-sm font-bold text-foreground hover:opacity-80 transition-opacity">
                    production@vistarastudios.com
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase block">
                    Response Window
                  </span>
                  <p className="text-sm text-foreground font-light">
                    Within 24 business hours (Monday – Friday)
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.2} className="p-8 md:p-10 rounded-2xl bg-white/[0.01] border border-white/5 relative">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Form Row: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs tracking-widest uppercase font-semibold text-muted-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Doe"
                      className="bg-zinc-950 border-white/10 text-white rounded-lg h-10 px-4 focus-visible:ring-1 focus-visible:border-white transition-all duration-300"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive/90">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-xs tracking-widest uppercase font-semibold text-muted-foreground">
                      Company / Organization
                    </Label>
                    <Input
                      id="company"
                      placeholder="e.g. Royal Enfield"
                      className="bg-zinc-950 border-white/10 text-white rounded-lg h-10 px-4 focus-visible:ring-1 focus-visible:border-white transition-all duration-300"
                      {...register("company")}
                    />
                  </div>
                </div>

                {/* Form Row: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs tracking-widest uppercase font-semibold text-muted-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-zinc-950 border-white/10 text-white rounded-lg h-10 px-4 focus-visible:ring-1 focus-visible:border-white transition-all duration-300"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive/90">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs tracking-widest uppercase font-semibold text-muted-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 0000000000"
                      className="bg-zinc-950 border-white/10 text-white rounded-lg h-10 px-4 focus-visible:ring-1 focus-visible:border-white transition-all duration-300"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive/90">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Form Row: Dropdown Selects */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Project Type */}
                  <div className="space-y-2 flex flex-col">
                    <Label className="text-xs tracking-widest uppercase font-semibold text-muted-foreground mb-1">
                      Project Type *
                    </Label>
                    <Controller
                      name="projectType"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full bg-zinc-950 border-white/10 text-white rounded-lg h-10 px-4 focus-visible:ring-1 focus-visible:border-white transition-all duration-300">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border border-white/10 text-white rounded-lg p-1">
                            <SelectItem value="Commercial">Commercial</SelectItem>
                            <SelectItem value="Narrative">Narrative</SelectItem>
                            <SelectItem value="Documentary">Documentary</SelectItem>
                            <SelectItem value="Fashion">Fashion</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.projectType && (
                      <p className="text-xs text-destructive/90">{errors.projectType.message}</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div className="space-y-2 flex flex-col">
                    <Label className="text-xs tracking-widest uppercase font-semibold text-muted-foreground mb-1">
                      Budget Range *
                    </Label>
                    <Controller
                      name="budget"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full bg-zinc-950 border-white/10 text-white rounded-lg h-10 px-4 focus-visible:ring-1 focus-visible:border-white transition-all duration-300">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border border-white/10 text-white rounded-lg p-1">
                            <SelectItem value="<1lakh">Under ₹1 Lakh</SelectItem>
                            <SelectItem value="1lakh-3lakh">₹1 Lakh – ₹3 Lakhs</SelectItem>
                            <SelectItem value="3lakh-5lakh">₹3 Lakhs – ₹5 Lakhs</SelectItem>
                            <SelectItem value="5lakh-10lakh">₹5 Lakhs – ₹10 Lakhs</SelectItem>
                            <SelectItem value="10lakh+">₹10 Lakhs+</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.budget && (
                      <p className="text-xs text-destructive/90">{errors.budget.message}</p>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2 flex flex-col">
                    <Label className="text-xs tracking-widest uppercase font-semibold text-muted-foreground mb-1">
                      Timeline *
                    </Label>
                    <Controller
                      name="timeline"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full bg-zinc-950 border-white/10 text-white rounded-lg h-10 px-4 focus-visible:ring-1 focus-visible:border-white transition-all duration-300">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border border-white/10 text-white rounded-lg p-1">
                            <SelectItem value="Immediate">Immediate</SelectItem>
                            <SelectItem value="1-3 Months">1 – 3 Months</SelectItem>
                            <SelectItem value="3-6 Months">3 – 6 Months</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.timeline && (
                      <p className="text-xs text-destructive/90">{errors.timeline.message}</p>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                  <Label htmlFor="details" className="text-xs tracking-widest uppercase font-semibold text-muted-foreground">
                    Project Details & Scope *
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Tell us about the project vision, goals, and any specific deliverables..."
                    rows={5}
                    className="bg-zinc-950 border-white/10 text-white rounded-lg px-4 py-3 focus-visible:ring-1 focus-visible:border-white transition-all duration-300 resize-none"
                    {...register("details")}
                  />
                  {errors.details && (
                    <p className="text-xs text-destructive/90">{errors.details.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-300 rounded-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  {isPending ? "SENDING INQUIRY..." : "SUBMIT INQUIRY"}
                </Button>

              </form>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
