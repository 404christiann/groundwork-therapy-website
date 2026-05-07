"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IDEAL_TRAITS = [
  "Mind is always \"on\" — overthinking or overanalyzing",
  "Feel internally dysregulated despite appearing high-functioning",
  "Navigating anxiety, ADHD, trauma, or life transitions",
  "Insightful but insight alone hasn't created change",
  "Ready for both support AND accountability",
  "Want tools, not just validation",
];

export default function Consultation() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="py-28 px-6 bg-[var(--teal-deep)] overflow-hidden relative"
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-white/10" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border border-white/10" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left */}
        <div ref={leftRef} className="opacity-0">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
            Is This You?
          </p>
          <h2
            className="text-4xl md:text-5xl text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            You might be
            <br />
            <span className="italic text-white/70">my ideal client</span>
          </h2>
          <p className="text-white/70 leading-relaxed mb-10">
            My clients are often adults who feel like their mind is always
            &ldquo;on&rdquo;—overthinking, overanalyzing, or getting stuck in
            loops of worry, self-doubt, or emotional overwhelm. They&apos;re
            looking for more than just validation—they want tools, direction,
            and a different way of relating to their thoughts and emotions.
          </p>
          <button
            onClick={handleScroll}
            className="px-8 py-4 rounded-full bg-white text-[var(--teal-deep)] text-sm tracking-wider uppercase hover:bg-[var(--gold-light)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Schedule Free Consult
          </button>
        </div>

        {/* Right — traits list */}
        <div ref={rightRef} className="opacity-0 space-y-4">
          {IDEAL_TRAITS.map((trait, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <span className="mt-0.5 w-5 h-5 rounded-full border border-[var(--teal-light)] flex items-center justify-center flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-[var(--teal-light)]" />
              </span>
              <p className="text-white/80 text-sm leading-relaxed">{trait}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
