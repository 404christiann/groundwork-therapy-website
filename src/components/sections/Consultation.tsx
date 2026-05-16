"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IDEAL_TRAITS = [
  {
    num: "01",
    heading: "Always \"on\"",
    body: "Overthinking, overanalyzing, and struggling to quiet the mental noise.",
  },
  {
    num: "02",
    heading: "High functioning outside",
    body: "You look fine to everyone else, but internally you feel exhausted or stuck.",
  },
  {
    num: "03",
    heading: "Navigating something hard",
    body: "Anxiety, ADHD, trauma, grief, or a major life transition you can't outrun.",
  },
  {
    num: "04",
    heading: "Self aware but still stuck",
    body: "You understand your patterns. Insight alone just hasn't been enough to change them.",
  },
  {
    num: "05",
    heading: "Ready for accountability",
    body: "You want a real working relationship, not someone who just nods along.",
  },
  {
    num: "06",
    heading: "Want actual tools",
    body: "You're looking for direction and structure, not just a space to vent.",
  },
];

export default function Consultation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } }
      );

      const cards = gridRef.current?.querySelectorAll(".trait-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: gridRef.current, start: "top 72%" } }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ctaRef.current, start: "top 85%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 px-8 md:px-14 relative overflow-hidden"
      style={{ background: "#D3DADA" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(186,167,185,0.12) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header — centered */}
        <div ref={headingRef} className="opacity-0 text-center mb-16 md:mb-20">
          <p className="text-lg uppercase tracking-[0.25em] mb-6" style={{ color: "#7F6D8B", fontFamily: "var(--font-playfair)" }}>
            Is this you?
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8"
            style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
          >
            You might be my
            <br />
            <span className="italic" style={{ color: "#7F6D8B" }}>ideal client.</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(62,56,66,0.65)" }}>
            My clients are high functioning on the outside but feel internally exhausted or frustrated by patterns they can&apos;t seem to shift on their own. They want real change.
          </p>
        </div>

        {/* Trait cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 md:mb-20">
          {IDEAL_TRAITS.map((trait) => (
            <div
              key={trait.num}
              className="trait-card opacity-0 rounded-2xl p-8 flex flex-col gap-6"
              style={{ background: "#F0EEF1", border: "1px solid #BAA7B9" }}
            >
              <h3
                className="text-xl md:text-2xl leading-snug"
                style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
              >
                {trait.heading}
              </h3>
              <p className="leading-relaxed text-sm" style={{ color: "#5A4D61" }}>
                {trait.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0 flex flex-col items-center gap-5 text-center">
          <p className="text-xl md:text-2xl" style={{ color: "rgba(62,56,66,0.65)", fontFamily: "var(--font-playfair)" }}>
            If this sounds like you, I&apos;d love to connect.
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "#3E3842", color: "#F0E0F4" }}
          >
            Schedule Free Consult
          </button>
        </div>

      </div>
    </section>
  );
}
