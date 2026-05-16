"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(186,167,185,0.3)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-6 gap-6">
        <p
          className="text-base md:text-lg font-medium leading-snug"
          style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
        >
          {q}
        </p>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: open ? "#3E3842" : "rgba(62,56,66,0.08)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke={open ? "#F0E0F4" : "#3E3842"} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="text-sm md:text-base leading-relaxed pb-6 max-w-2xl"
              style={{ color: "#5A4D61" }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 78%" } }
      );
      gsap.fromTo(
        listRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: listRef.current, start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 md:py-36 px-8 md:px-14"
      style={{ background: "#F0EEF1" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div ref={headingRef} className="opacity-0 mb-14 md:mb-20">
          <p className="text-lg uppercase tracking-[0.25em] mb-6" style={{ color: "#7F6D8B", fontFamily: "var(--font-playfair)" }}>
            Common Questions
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
          >
            Everything you
            <br />
            <span className="italic" style={{ color: "#7F6D8B" }}>want to know.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div ref={listRef} className="opacity-0">
          <div style={{ borderTop: "1px solid rgba(186,167,185,0.3)" }}>
            {FAQS.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-center gap-5">
            <p className="text-sm" style={{ color: "rgba(62,56,66,0.55)" }}>
              Still have questions?
            </p>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "#3E3842", color: "#F0E0F4" }}
            >
              Reach Out
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
