"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  AudioWaveform,
  Compass,
  Drama,
  Handshake,
  Plus,
  RotateCcw,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IDEAL_TRAITS = [
  {
    num: "01",
    heading: "Always \"on\"",
    body: "Overthinking, overanalyzing, and struggling to quiet the mental noise.",
    icon: AudioWaveform,
  },
  {
    num: "02",
    heading: "High functioning outside",
    body: "You look fine to everyone else, but internally you feel exhausted or stuck.",
    icon: Drama,
  },
  {
    num: "03",
    heading: "Navigating something hard",
    body: "Anxiety, ADHD, trauma, grief, or a major life transition you can't outrun.",
    icon: Compass,
  },
  {
    num: "04",
    heading: "Self aware but still stuck",
    body: "You understand your patterns. Insight alone just hasn't been enough to change them.",
    icon: RotateCcw,
  },
  {
    num: "05",
    heading: "Ready for accountability",
    body: "You want a real working relationship, not someone who just nods along.",
    icon: Handshake,
  },
  {
    num: "06",
    heading: "Want actual tools",
    body: "You're looking for direction and structure, not just a space to vent.",
    icon: Wrench,
  },
] as const;

const ACCORDION_EASE = [0.22, 1, 0.36, 1] as const;

const GALLERY_IMAGES = [
  { src: "/images/ideal-client-gallery/floral-portrait-v2.png", alt: "Woman holding a colorful bouquet" },
  { src: "/images/ideal-client-gallery/mind-garden.png", alt: "Woman watering flowers in a head-shaped planter" },
] as const;

function TraitIcon({ active, icon: Icon }: { active: boolean; icon: LucideIcon }) {
  return (
    <span className={`trait-accordion-icon ${active ? "is-active" : ""}`} aria-hidden="true">
      <Icon size={23} strokeWidth={1.7} />
    </span>
  );
}

export default function Consultation() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const toggleTrait = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      return;
    }

    setActiveIndex(index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set([accordionRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.fromTo(
        accordionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: accordionRef.current, start: "top 76%" } },
      );

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
      className="relative overflow-hidden px-8 pb-24 pt-20 md:px-14 md:pb-14 md:pt-12"
      style={{ background: "var(--ivory)" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(153,88,42,0.08) 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-[1240px] relative z-10">
        <div ref={accordionRef} className="ideal-client-layout mb-16 opacity-0 md:mb-10">
          <div className="ideal-client-copy">
            <div className="ideal-client-heading">
              <h2
                className="text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--charcoal)" }}
              >
                Is this <span style={{ color: "var(--sienna)" }}>you?</span>
              </h2>
            </div>

            {/* Ideal-client trait accordion */}
            <div className="trait-accordion-shell">
              <div className="trait-accordion-list">
                {IDEAL_TRAITS.map((trait, index) => {
                  const active = activeIndex === index;
                  const triggerId = `ideal-trait-trigger-${trait.num}`;
                  const panelId = `ideal-trait-panel-${trait.num}`;

                  return (
                    <motion.div
                      key={trait.num}
                      layout
                      transition={{ duration: reduceMotion ? 0 : 0.25, ease: ACCORDION_EASE }}
                      className={`trait-accordion-item ${active ? "is-active" : ""}`}
                    >
                      <h3>
                        <button
                          id={triggerId}
                          type="button"
                          aria-expanded={active}
                          aria-controls={panelId}
                          onClick={() => toggleTrait(index)}
                          className="trait-accordion-trigger"
                        >
                          <TraitIcon active={active} icon={trait.icon} />
                          <span className="trait-accordion-label">{trait.heading}</span>
                          <span className={`trait-accordion-plus ${active ? "is-active" : ""}`} aria-hidden="true">
                            <Plus size={23} strokeWidth={1.8} />
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {active ? (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={triggerId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.3, ease: ACCORDION_EASE }}
                            className="overflow-hidden"
                          >
                            <p className="trait-accordion-copy">{trait.body}</p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="ideal-client-gallery" aria-label="Two overlapping portraits">
            {GALLERY_IMAGES.map((image) => (
              <figure key={image.src} className="ideal-client-stamp">
                <div className="ideal-client-stamp-photo">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 767px) 42vw, (max-width: 1279px) 27vw, 320px"
                    className="ideal-client-stamp-image"
                  />
                </div>
                <Image
                  src="/images/ideal-client-gallery/stamp-frame.png"
                  alt=""
                  fill
                  sizes="(max-width: 767px) 42vw, (max-width: 1279px) 27vw, 320px"
                  className="ideal-client-stamp-frame"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0 flex flex-col items-center gap-5 text-center">
          <p className="text-xl md:text-2xl" style={{ color: "var(--muted)", fontFamily: "var(--font-playfair)" }}>
            If this sounds like you, I&apos;d love to connect.
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "var(--sienna)", color: "var(--ivory)" }}
          >
            Schedule Free Consult
          </button>
        </div>

      </div>
    </section>
  );
}
