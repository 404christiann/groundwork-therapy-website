"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(line1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" })
        .fromTo(line2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }, "-=0.8")
        .fromTo(taglineRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(descRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 0.4, duration: 0.7 }, "-=0.2");

      gsap.to(scrollHintRef.current, { y: 7, repeat: -1, yoyo: true, duration: 1.6, ease: "sine.inOut", delay: 2.2 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col"
      style={{ background: "#F0E0F4" }}
    >
      {/* Soft depth gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 75% 60% at 80% 10%, rgba(255,255,255,0.35) 0%, transparent 65%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 10% 90%, rgba(186,147,210,0.18) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 flex flex-col justify-between min-h-screen px-8 md:px-14 pb-14 pt-32">
        <div className="mt-auto">
          <h1
            className="leading-[0.95] select-none"
            style={{ fontFamily: "var(--font-playfair)", maxWidth: "calc(100vw - 10rem)" }}
          >
            <span
              ref={line1Ref}
              className="block opacity-0"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)", color: "#3E3842" }}
            >
              Where insight
            </span>
            <span
              ref={line2Ref}
              className="block opacity-0 italic pt-2.5"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)", color: "#7F6D8B" }}
            >
              becomes change.
            </span>
          </h1>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p ref={taglineRef} className="opacity-0 text-xs uppercase tracking-[0.25em]" style={{ color: "#BAA7B9" }}>
            Ground Work Therapy · Online Sessions Available
          </p>
          <p ref={descRef} className="opacity-0 text-base leading-relaxed max-w-xs md:text-right" style={{ color: "#5A4D61" }}>
            I&apos;m a licensed therapist working with teens and adults in California. Grounded in ACT, CBT & DBT.
          </p>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        style={{ color: "#BAA7B9" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3v14M10 17l-5-5M10 17l5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
