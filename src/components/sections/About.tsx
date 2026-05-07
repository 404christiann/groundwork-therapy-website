"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: "USF", label: "B.S. Psychology" },
  { year: "UCLA", label: "MSW — Health & Mental Health" },
  { year: "Harbor-UCLA", label: "CalWORKs Internship" },
  { year: "Didi Hirsch", label: "High-Acuity Nonprofit Work" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 px-6 bg-[var(--cream)]"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div ref={textRef} className="opacity-0">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--teal-light)] mb-4">
            About
          </p>
          <h2
            className="text-4xl md:text-5xl text-[var(--teal-deep)] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Real presence.
            <br />
            <span className="italic text-[var(--text-mid)]">Real change.</span>
          </h2>
          <div className="space-y-4 text-[var(--text-mid)] leading-relaxed">
            <p>
              I take a highly relational approach—showing up as a real person
              in the room—while using humor to keep things human and grounded.
              At the same time, I won&apos;t let you stay stuck.
            </p>
            <p>
              I went to the University of San Francisco before earning my MSW
              from UCLA with an emphasis in health and mental health across the
              lifespan. My training has spanned school-aged children, the
              CalWORKs program at Harbor-UCLA, and high-acuity clients at Didi
              Hirsch in Glendale.
            </p>
            <p>
              I&apos;m now building my private practice, where I work with both
              teens and adults—bringing the same curiosity and warmth to every
              session.
            </p>
          </div>

          {/* Credentials */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {MILESTONES.map((m) => (
              <div key={m.year} className="border-l-2 border-[var(--teal-light)] pl-4">
                <p className="text-xs font-semibold text-[var(--teal-deep)] uppercase tracking-wider">
                  {m.year}
                </p>
                <p className="text-sm text-[var(--text-mid)] mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait placeholder */}
        <div ref={imageRef} className="opacity-0 relative">
          <div className="relative aspect-[3/4] max-w-sm mx-auto">
            {/* Decorative offset border */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-[var(--teal-light)]/30" />
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[var(--teal-deep)]/10 flex items-center justify-center">
              {/* Replace with real <Image> once you have a photo */}
              <div className="text-center text-[var(--teal-light)] p-8">
                <div className="w-20 h-20 rounded-full bg-[var(--teal-light)]/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <p className="text-sm opacity-60">Therapist photo</p>
                <p className="text-xs opacity-40 mt-1">Add to /public/images/</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
