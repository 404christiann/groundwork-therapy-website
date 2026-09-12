"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "How much does a session cost?",
    a: "Sessions are $160 for a 55 minute appointment. If cost feels like a barrier, reach out — I'm happy to have an honest conversation about it.",
  },
  {
    q: "Do you accept insurance?",
    a: "I'm out of network with all insurance providers, which means I don't bill insurance directly. However, I can provide a superbill — a detailed receipt you can submit to your insurance company for potential out of network reimbursement. Many clients get a portion of their sessions covered this way. I'd recommend calling your insurance ahead of time to ask about your out of network mental health benefits.",
  },
  {
    q: "How long are sessions and how often will we meet?",
    a: "Sessions are 55 minutes. Most clients start with weekly appointments — that consistency is what creates momentum and allows the work to actually build over time.",
  },
  {
    q: "Is therapy online only?",
    a: "Yes, all sessions are conducted via telehealth. That means you can join from anywhere in California — your home, your car, your office. No commute, no waiting room. Just a private space and a reliable internet connection.",
  },
  {
    q: "What is a Good Faith Estimate?",
    a: "California law requires me to provide a Good Faith Estimate before we begin working together. It's a written document outlining the expected cost of therapy so there are no surprises. You'll receive one before your first session.",
  },
  {
    q: "What if I've tried therapy before and it didn't help?",
    a: "That's more common than you'd think. A lot of people come to me after gaining insight elsewhere but still feeling stuck. The fit between therapist and client matters enormously, as does the approach. If therapy hasn't clicked before, I'd encourage you to try a free consultation before writing it off.",
  },
  {
    q: "How do I get started?",
    a: "Start by scheduling a free 20 minute consultation. It's a low pressure conversation where we can connect and see if working together feels right — no commitment required.",
  },
];

const FAQ_EASE = [0.22, 1, 0.36, 1] as const;

function FAQItem({
  q,
  a,
  index,
  open,
  onToggle,
  reduceMotion,
}: {
  q: string;
  a: string;
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

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: FAQ_EASE }}
            className="overflow-hidden"
          >
            <p className="approach-click-description faq-accordion-description">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
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
      className="py-24 md:py-36 px-8 md:px-14"
      style={{ background: "var(--ivory)" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div ref={headingRef} className="opacity-0 mb-14 md:mb-20">
          <p className="text-sm uppercase tracking-[0.25em] mb-6 font-semibold" style={{ color: "var(--sienna)" }}>
            Common Questions
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--charcoal)" }}
          >
            <span className="faq-word inline-block opacity-0 mr-[0.16em]">Everything</span>
            <span className="faq-word inline-block opacity-0">you</span>
            <br />
            <span className="italic" style={{ color: "var(--sienna)" }}>
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
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Still have questions?
            </p>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "var(--sienna)", color: "var(--ivory)" }}
            >
              Reach Out
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
