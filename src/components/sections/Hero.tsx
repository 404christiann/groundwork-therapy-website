"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 60, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.1"
        );

      // Floating scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        delay: 1.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--warm-white)] px-6 overflow-hidden"
    >
      {/* Background texture / organic blob */}
      <div
        className="absolute top-[-10%] right-[-15%] w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "var(--teal-mid)" }}
      />
      <div
        className="absolute bottom-[-5%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "var(--gold)" }}
      />

      <div className="relative z-10 text-center max-w-4xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.2em] text-[var(--teal-light)] mb-6"
        >
          Therapy for Teens & Adults · Online Sessions Available
        </motion.p>

        {/* Main headline */}
        <h1
          className="overflow-hidden leading-tight mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span
            ref={line1Ref}
            className="block text-5xl md:text-7xl lg:text-8xl text-[var(--teal-deep)] opacity-0"
          >
            Ground Work
          </span>
          <span
            ref={line2Ref}
            className="block text-5xl md:text-7xl lg:text-8xl text-[var(--text-mid)] opacity-0 italic"
          >
            Therapy
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="opacity-0 text-lg md:text-xl text-[var(--text-mid)] max-w-xl mx-auto leading-relaxed mb-12"
        >
          Where insight turns into real, grounded change.
        </p>

        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleScroll("#contact")}
            className="px-8 py-4 rounded-full bg-[var(--teal-deep)] text-white text-sm tracking-wider uppercase hover:bg-[var(--teal-mid)] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Free 20-Min Consultation
          </button>
          <button
            onClick={() => handleScroll("#about")}
            className="px-8 py-4 rounded-full border border-[var(--teal-deep)] text-[var(--teal-deep)] text-sm tracking-wider uppercase hover:bg-[var(--cream)] transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 cursor-pointer"
        onClick={() => handleScroll("#about")}
      >
        <ArrowDown size={20} className="text-[var(--text-light)]" />
      </div>
    </section>
  );
}
