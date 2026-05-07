"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="service-card opacity-0 cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((v) => !v)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
        className="w-full"
      >
        {/* FRONT */}
        <div
          className="relative overflow-hidden rounded-[2rem] aspect-[3/4]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Gradient image placeholder (replace with real images) */}
          <div
            className="absolute inset-0 flex items-end p-6"
            style={{
              background: `linear-gradient(160deg, ${service.color}cc, ${service.color}99)`,
            }}
          >
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>

          {/* Card background color */}
          <div
            className="absolute inset-0"
            style={{ background: service.color, opacity: 0.85 }}
          />

          {/* Decorative circle */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-10 border border-white"
          />
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-[0.06] border border-white"
          />

          {/* Text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60 mb-1">
              {service.subtitle}
            </p>
            <h3
              className="text-2xl font-medium leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {service.title}
            </h3>
            <div className="mt-3 flex items-center gap-2 text-white/60 text-xs">
              <span>Tap to learn more</span>
              <span>→</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-[2rem] overflow-hidden aspect-[3/4] flex flex-col justify-between p-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: service.color,
          }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-white/60 mb-2">
              {service.subtitle}
            </p>
            <h3
              className="text-2xl text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {service.title}
            </h3>
            <p className="text-white/85 leading-relaxed text-sm">
              {service.description}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-6 py-3 px-6 rounded-full border border-white/40 text-white text-xs tracking-widest uppercase hover:bg-white hover:text-[var(--teal-deep)] transition-all duration-300"
          >
            Book a Session
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
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
      id="services"
      ref={sectionRef}
      className="py-28 px-6 bg-[var(--cream)]"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="opacity-0 text-center mb-20 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--teal-light)] mb-4">
            Specialties
          </p>
          <h2
            className="text-4xl md:text-5xl text-[var(--teal-deep)] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Here&apos;s how I support
            <br />
            <span className="italic text-[var(--text-mid)]">your journey</span>
          </h2>
          <p className="text-[var(--text-mid)] leading-relaxed text-sm">
            Tap any card to learn more about how we&apos;d work together.
          </p>
        </div>

        {/* 5-card layout matching the inspiration screenshot */}
        <div ref={cardsRef}>
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 max-w-3xl mx-auto">
            {SERVICES.slice(0, 3).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
          {/* Bottom row: 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {SERVICES.slice(3).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
