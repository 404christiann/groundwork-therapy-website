"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Booking and messages go through SimplePractice, which is HIPAA compliant.
// The site itself never collects client details.
const CLIENT_PORTAL_URL = "https://tiffanyvenegaslcsw.clientsecure.me";

const DETAILS = [
  "Free 20-minute consultation call",
  "Online sessions available in California",
  "Response within 1–2 business days",
];

const STEPS = [
  {
    title: "Request a time",
    copy: "Click below to open my secure client portal via SimplePractice and choose a 20-minute consult slot (or send a quick message).",
  },
  {
    title: "We connect",
    copy: "We’ll talk briefly by phone or video about what you’re looking for and answer any questions you have.",
  },
  {
    title: "Decide together",
    copy: "If it feels like a good fit, we’ll schedule your first full session.",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = leftRef.current?.querySelectorAll(".contact-word");
      const reveals = leftRef.current?.querySelectorAll(".contact-reveal");

      if (reducedMotion) {
        gsap.set([words, reveals, rightRef.current], { opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      gsap.fromTo(words ?? [], { opacity: 0, y: 10, filter: "blur(9px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } });
      gsap.fromTo(reveals ?? [], { opacity: 0, y: 18, filter: "blur(5px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } });
      gsap.fromTo(rightRef.current, { opacity: 0, clipPath: "inset(0% 0% 14% 0% round 1rem)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 1rem)", duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-36 px-8 md:px-14 relative overflow-hidden"
      style={{ background: "var(--ivory)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,255,255,0.40) 0%, transparent 65%)" }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-16 md:gap-24 items-start relative z-10">

        {/* Left */}
        <div ref={leftRef}>
          <p className="contact-reveal opacity-0 text-sm uppercase tracking-[0.25em] mb-6 font-semibold" style={{ color: "var(--button)" }}>
            Get in Touch
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] mb-8"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--charcoal)" }}
          >
            <span className="contact-word inline-block opacity-0 mr-[0.16em]">Ready</span>
            <span className="contact-word inline-block opacity-0 mr-[0.16em]">to</span>
            <span className="contact-word inline-block opacity-0">explore</span>
            <br />
            <span className="italic accent-highlight">
              <span className="contact-word inline-block opacity-0 mr-[0.16em]">what&apos;s</span>
              <span className="contact-word inline-block opacity-0">possible?</span>
            </span>
          </h2>
          <p className="contact-reveal opacity-0 leading-relaxed text-sm md:text-base mb-10" style={{ color: "var(--muted)" }}>
            Reach out to schedule a free 20-minute consultation. It&apos;s a simple, no-pressure space to connect and see if working together feels right.
          </p>

          <div className="contact-reveal opacity-0 flex flex-col gap-4">
            {DETAILS.map((d, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(106,74,92,0.12)" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="var(--button)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "var(--muted)" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: what happens next, then the button to the client portal */}
        <div ref={rightRef} className="opacity-0">
          <div className="contact-card">
            <h3 className="contact-card-title">What happens next</h3>
            <ol className="contact-steps">
              {STEPS.map((step, i) => (
                <li key={step.title} className="contact-step">
                  <span className="contact-step-num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <p className="contact-step-title">{step.title}</p>
                    <p className="contact-step-copy">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="contact-foot">
              <a className="contact-portal" href={CLIENT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                Request a free consultation
                <ArrowRight className="contact-portal-arrow" size={18} strokeWidth={2} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="contact-note">Opens my secure SimplePractice client portal.</p>
              <p className="contact-crisis">
                In a mental health crisis, please call <a href="tel:988">988</a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
