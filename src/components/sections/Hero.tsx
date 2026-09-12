"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = headingRef.current?.querySelectorAll(".hero-word");

      if (reducedMotion) {
        gsap.set([words, descriptionRef.current], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
        return;
      }

      gsap
        .timeline({ delay: 0.2 })
        .fromTo(
          words ?? [],
          { opacity: 0, y: 10, filter: "blur(7px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.05"
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-section relative flex min-h-[calc(100svh-71px)] flex-col px-[22px] pb-[64px] pt-[72px] lg:min-h-screen lg:px-[48px] lg:pb-[88px] lg:pt-[158px]"
    >
      <div className="my-auto">
        <h1
          ref={headingRef}
          className="max-w-[640px] text-[48px] font-bold leading-[1.08] text-[var(--text-dark)] sm:text-[56px] lg:text-[64px]"
          style={{ lineHeight: 1.08 }}
        >
          <span className="hero-word block opacity-0">Where insight</span>
          <span className="hero-word block pt-[10px] italic text-[var(--teal-mid)] opacity-0">
            becomes change.
          </span>
        </h1>

        <p
          ref={descriptionRef}
          className="mt-[28px] max-w-[520px] text-[18px] leading-[1.55] text-[var(--text-mid)] opacity-0"
        >
          I&apos;m a licensed therapist working with teens and adults in California. Grounded in ACT, CBT &amp; DBT.
        </p>
      </div>
    </section>
  );
}
