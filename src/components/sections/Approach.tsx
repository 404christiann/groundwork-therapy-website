"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    num: "01",
    label: "ACT",
    name: "Acceptance & Commitment Therapy",
    description:
      "Notice and step back from unhelpful thought loops instead of fighting them. ACT builds psychological flexibility so your values, not your anxiety, drive your choices.",
  },
  {
    num: "02",
    label: "CBT",
    name: "Cognitive Behavioral Therapy",
    description:
      "Identify and shift the thought patterns keeping you stuck. Practical, evidence based work that creates real, measurable change in how you think and respond.",
  },
  {
    num: "03",
    label: "DBT",
    name: "Dialectical Behavior Therapy",
    description:
      "Build concrete tools to regulate emotions, tolerate distress, and navigate relationships with more ease. DBT is a practical toolkit for life's hardest moments.",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 78%" } }
      );
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: quoteRef.current, start: "top 80%" } }
      );
      const cards = cardsRef.current?.querySelectorAll(".pillar-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 78%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" ref={sectionRef} className="py-24 md:py-36 px-8 md:px-14" style={{ background: "#D3DADA" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headingRef} className="opacity-0 mb-14 md:mb-20">
          <p className="text-sm uppercase tracking-[0.25em] mb-6" style={{ color: "#7F6D8B" }}>My Approach</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
          >
            Science meets
            <br />
            <span className="italic" style={{ color: "#7F6D8B" }}>real connection.</span>
          </h2>
        </div>

        {/* Pull quote */}
        <div ref={quoteRef} className="opacity-0 mb-16 md:mb-24 border-l-4 pl-8 py-2" style={{ borderColor: "#BAA7B9" }}>
          <p className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}>
            The goal isn&apos;t just understanding your patterns. It&apos;s changing how you relate to them so they stop running your life.
          </p>
        </div>

        {/* Pillar cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {PILLARS.map((p) => (
            <div
              key={p.num}
              className="pillar-card opacity-0 flex flex-col gap-6 p-8 rounded-2xl"
              style={{ background: "#F0EEF1", border: "1px solid #BAA7B9" }}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs tabular-nums" style={{ color: "#BAA7B9" }}>{p.num}</span>
                <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "#7F6D8B" }}>{p.label}</span>
              </div>

              <div>
                <h3
                  className="text-xl md:text-2xl leading-snug mb-4"
                  style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
                >
                  {p.name}
                </h3>
                <p className="leading-relaxed text-sm" style={{ color: "#5A4D61" }}>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
