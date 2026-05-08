"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "act",
    num: "01",
    label: "ACT",
    name: "Acceptance & Commitment Therapy",
    tagline: "Build psychological flexibility.",
    description:
      "ACT helps you notice and step back from unhelpful thought loops instead of fighting them. Rather than trying to eliminate difficult thoughts or feelings, you learn to change your relationship with them so your values, not your anxiety, drive your choices. This approach is especially effective for anxiety, perfectionism, and feeling stuck despite self-awareness.",
    photoBg: "#BAA7B9",
    contentBg: "#F0EEF1",
    imageSrc: "/images/act.png",
  },
  {
    id: "cbt",
    num: "02",
    label: "CBT",
    name: "Cognitive Behavioral Therapy",
    tagline: "Change the patterns keeping you stuck.",
    description:
      "CBT is one of the most well researched approaches in therapy. We identify the specific thought patterns and behaviors that are maintaining your struggles, then work systematically to shift them. This isn't about positive thinking. It's about accurate thinking. Practical, structured, and results oriented work that creates measurable change in how you think and respond to life.",
    photoBg: "#7F6D8B",
    contentBg: "#F0E0F4",
    imageSrc: "/images/cbt.png",
  },
  {
    id: "dbt",
    num: "03",
    label: "DBT",
    name: "Dialectical Behavior Therapy",
    tagline: "Tools for life's hardest moments.",
    description:
      "DBT gives you a concrete, skill based toolkit for managing intense emotions, tolerating distress without making things worse, and navigating relationships with more ease. Originally developed for borderline personality disorder, DBT skills are now used widely for anyone who feels emotions deeply or struggles with emotional regulation. Expect real tools, not just insight.",
    photoBg: "#D3DADA",
    contentBg: "#F0EEF1",
    imageSrc: "/images/dbt.png",
  },
  {
    id: "trauma",
    num: "04",
    label: "Trauma",
    name: "Trauma Informed Care",
    tagline: "Heal without getting overwhelmed.",
    description:
      "Trauma work doesn't have to mean reliving the past. A trauma informed approach means we always prioritize your sense of safety and control, moving at a pace that feels manageable. We'll work toward processing what happened so it stops dictating your present. Whether you've experienced a single event or a lifetime of difficult experiences, healing is possible.",
    photoBg: "#3E3842",
    contentBg: "#F0E0F4",
    imageSrc: "/images/trauma.png",
  },
  {
    id: "anxiety",
    num: "05",
    label: "Anxiety & ADHD",
    name: "Anxiety & ADHD",
    tagline: "Quiet the mind that never shuts off.",
    description:
      "For the mind that's always on, cycling through worries, second guessing decisions, or struggling to start or finish things. We'll untangle the overthinking, self doubt, and emotional overwhelm so you can respond from clarity instead of reacting from fear. Whether anxiety and ADHD are separate struggles or deeply intertwined, we'll address both with targeted, practical strategies.",
    photoBg: "#C4C484",
    contentBg: "#F0EEF1",
    imageSrc: "/images/anxiety.png",
  },
];

type Service = typeof SERVICES[0];

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const handleBook = () => {
    onClose();
    setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(62,56,66,0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: service.contentBg }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color bar top */}
        <div className="h-2 w-full" style={{ background: service.photoBg }} />

        <div className="p-8 md:p-10">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "rgba(62,56,66,0.08)", color: "#3E3842" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Label + number */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "#BAA7B9" }}>{service.num}</span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "#7F6D8B" }}>{service.label}</span>
          </div>

          {/* Title */}
          <h3
            className="text-2xl md:text-3xl leading-snug mb-2"
            style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
          >
            {service.name}
          </h3>

          {/* Tagline */}
          <p className="text-sm font-medium mb-6 italic" style={{ color: "#7F6D8B" }}>
            {service.tagline}
          </p>

          {/* Divider */}
          <div className="w-10 h-px mb-6" style={{ background: "#BAA7B9" }} />

          {/* Description */}
          <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: "#5A4D61" }}>
            {service.description}
          </p>

          {/* Book CTA */}
          <button
            onClick={handleBook}
            className="w-full py-4 rounded-full text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "#3E3842", color: "#F0E0F4" }}
          >
            Book a Session
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<Service | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll(".service-row");
      rows?.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 80%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeService ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeService]);

  return (
    <>
      <section id="services" ref={sectionRef} className="py-24 md:py-36 bg-[var(--warm-white)]">
        <div className="px-8 md:px-14 mb-14 md:mb-20">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm uppercase tracking-[0.25em] mb-6" style={{ color: "#BAA7B9" }}>Specialties</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
            >
              Where we do
              <br />
              <span className="italic" style={{ color: "#7F6D8B" }}>the work together.</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-8">
          {SERVICES.map((service, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div
                key={service.id}
                className="service-row opacity-0 rounded-2xl overflow-hidden"
              >
                <div className={`flex flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""}`}>

                  {/* Photo panel */}
                  <div
                    className="relative w-full md:w-1/2 h-56 md:h-auto md:min-h-[380px] flex items-center justify-center"
                    style={{ background: service.photoBg }}
                  >
                    <Image
                      src={service.imageSrc}
                      alt={service.name}
                      fill
                      className="object-cover"
                      onError={() => {}}
                    />
                  </div>

                  {/* Content panel */}
                  <div
                    className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-hidden"
                    style={{ background: service.contentBg }}
                  >
                    {/* Decorative number */}
                    <span
                      className="absolute select-none pointer-events-none"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "clamp(6rem, 12vw, 10rem)",
                        color: "#3E3842",
                        opacity: 0.05,
                        top: "-0.15em",
                        right: "0.1em",
                        lineHeight: 1,
                      }}
                    >
                      {service.num}
                    </span>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "#BAA7B9" }}>{service.num}</span>
                        <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "#7F6D8B" }}>{service.label}</span>
                      </div>

                      <h3
                        className="text-2xl md:text-3xl lg:text-4xl leading-snug mb-3"
                        style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
                      >
                        {service.name}
                      </h3>

                      <p className="text-sm italic mb-6" style={{ color: "#7F6D8B" }}>
                        {service.tagline}
                      </p>

                      <div className="w-8 h-px mb-8" style={{ background: "#BAA7B9" }} />

                      <button
                        onClick={() => setActiveService(service)}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:opacity-80 hover:-translate-y-0.5"
                        style={{ border: "1px solid #7F6D8B", color: "#3E3842" }}
                      >
                        Learn more
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {activeService && (
          <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
