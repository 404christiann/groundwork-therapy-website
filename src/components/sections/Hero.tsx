"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

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
      className="hero-section"
      aria-labelledby="hero-heading"
    >
      <div className="hero-portrait">
        <Image
          src="/images/groundWorkTherapyHome.jpg"
          alt="Tiffany Venegas smiling and holding her glasses"
          fill
          unoptimized
          sizes="(min-width: 1024px) 59vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="hero-portrait-image"
        />
      </div>

      <div className="hero-copy">
        <h1
          id="hero-heading"
          ref={headingRef}
          className="hero-heading"
        >
          <span className="hero-word">Where insight</span>{" "}
          <em>
            <span className="hero-word">becomes change.</span>
          </em>
        </h1>

        <p
          ref={descriptionRef}
          className="hero-description"
        >
          I&apos;m a licensed therapist working with teens and adults in California. Grounded in ACT, CBT &amp; DBT.
        </p>

        <a className="hero-connect" href="#contact">
          Let’s connect
        </a>
      </div>

      <p className="hero-caption">Tiffany Venegas, LCSW</p>
    </section>
  );
}
