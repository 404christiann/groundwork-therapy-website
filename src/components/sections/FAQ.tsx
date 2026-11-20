"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { FAQS } from "@/lib/faq";

gsap.registerPlugin(ScrollTrigger);

const FAQ_EASE = [0.22, 1, 0.36, 1] as const;

// **text** in the FAQ copy renders bold
const withBold = (text: string) =>
  text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));

function FAQItem({
  q,
  a,
  index,
  open,
  onToggle,
  reduceMotion,
}: {
  q: string;
  a: string[];
  index: number;
  open: boolean;
  onToggle: () => void;
  reduceMotion: boolean | null;
}) {
  const triggerId = `faq-trigger-${index + 1}`;
  const panelId = `faq-panel-${index + 1}`;

  return (
    <motion.article
      layout
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: FAQ_EASE }}
      className={`faq-row approach-click-item opacity-0${open ? " is-active" : ""}`}
    >
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="approach-click-trigger"
        >
          <span className="approach-click-label">{q}</span>
          <span
            className={`approach-click-plus${open ? " is-active" : ""}`}
            aria-hidden="true"
          />
        </button>
      </h3>

      {/* Every answer stays in the HTML (closed ones collapsed and inert) so
          search engines and AI tools that don't click can still read them */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: FAQ_EASE }}
        className="overflow-hidden"
      >
        <div className="approach-click-description faq-accordion-description">
          {a.map((paragraph, i) => (
            <p key={i}>{withBold(paragraph)}</p>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = headingRef.current?.querySelectorAll(".faq-word");
      const rows = listRef.current?.querySelectorAll(".faq-row");
      const cta = listRef.current?.querySelector(".faq-cta");

      if (reducedMotion) {
        gsap.set([headingRef.current, words, rows, cta], { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.fromTo(
        headingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, scrollTrigger: { trigger: headingRef.current, start: "top 82%" } }
      );
      gsap.fromTo(
        words ?? [],
        { opacity: 0, y: 10, filter: "blur(9px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 82%" } }
      );
      gsap.fromTo(
        rows ?? [],
        { opacity: 0, y: 18, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.065, ease: "power2.out", scrollTrigger: { trigger: listRef.current, start: "top 82%" } }
      );
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: cta, start: "top 90%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-8 md:px-14"
      style={{ background: "var(--ivory)" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div ref={headingRef} className="opacity-0 mb-14 md:mb-20">
          <p className="serif-label text-sm uppercase tracking-[0.25em] mb-6" style={{ color: "var(--button)" }}>
            Common Questions
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--charcoal)" }}
          >
            <span className="faq-word inline-block opacity-0 mr-[0.16em]">Everything</span>
            <span className="faq-word inline-block opacity-0">you</span>
            <br />
            <span className="italic accent-highlight">
              <span className="faq-word inline-block opacity-0 mr-[0.16em]">want</span>
              <span className="faq-word inline-block opacity-0 mr-[0.16em]">to</span>
              <span className="faq-word inline-block opacity-0">know.</span>
            </span>
          </h2>
        </div>

        {/* Accordion */}
        <div ref={listRef}>
          <div className="approach-click-accordion">
            {FAQS.map((item, i) => (
              <FAQItem
                key={item.q}
                q={item.q}
                a={item.a}
                index={i}
                open={activeIndex === i}
                onToggle={() => setActiveIndex((current) => (current === i ? null : i))}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="faq-cta opacity-0 mt-14 flex flex-col items-center gap-5">
            <p className="serif-label text-sm" style={{ color: "var(--muted)" }}>
              Still have questions?
            </p>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-[background-color,translate,scale,opacity] duration-200 ease-out hover:-translate-y-0.5 bg-[var(--button)] text-[var(--button-ink)] hover:bg-[var(--button-hover)] active:scale-[0.97]"
            >
              Reach Out
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
