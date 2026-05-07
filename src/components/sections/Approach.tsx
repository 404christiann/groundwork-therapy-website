"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    label: "ACT",
    name: "Acceptance & Commitment",
    description:
      "Notice and step back from unhelpful thought loops. Build psychological flexibility so your values—not your anxiety—drive your choices.",
    icon: "○",
  },
  {
    label: "CBT",
    name: "Cognitive Behavioral",
    description:
      "Identify and shift the thought patterns keeping you stuck. Practical, skill-based work that creates real, measurable change.",
    icon: "△",
  },
  {
    label: "DBT",
    name: "Dialectical Behavior",
    description:
      "Build concrete tools to regulate emotions, tolerate distress, and navigate relationships. A practical toolkit for life's hardest moments.",
    icon: "□",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".approach-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 75%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="py-28 px-6 bg-[var(--warm-white)]"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="opacity-0 text-center mb-20 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--teal-light)] mb-4">
            My Approach
          </p>
          <h2
            className="text-4xl md:text-5xl text-[var(--teal-deep)] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            A blend of science
            <br />
            <span className="italic text-[var(--text-mid)]">and real human connection</span>
          </h2>
          <p className="text-[var(--text-mid)] leading-relaxed">
            I use a blend of ACT, CBT, and DBT to help you understand what&apos;s
            happening in your thoughts and emotions—and then work with them in a
            more flexible, effective way. The goal is more clarity,
            self-understanding, and the ability to respond to life in ways that
            actually feel aligned with you.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {PILLARS.map((p) => (
            <div
              key={p.label}
              className="approach-card opacity-0 group p-8 rounded-3xl bg-[var(--cream)] hover:bg-[var(--teal-deep)] transition-all duration-500 cursor-default"
            >
              <div className="text-4xl mb-6 text-[var(--teal-light)] group-hover:text-white/50 transition-colors duration-500 font-light">
                {p.icon}
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--teal-light)] group-hover:text-white/60 mb-2 transition-colors duration-500">
                {p.label}
              </p>
              <h3
                className="text-xl text-[var(--teal-deep)] group-hover:text-white mb-4 transition-colors duration-500 leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {p.name}
              </h3>
              <p className="text-sm text-[var(--text-mid)] group-hover:text-white/80 leading-relaxed transition-colors duration-500">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
