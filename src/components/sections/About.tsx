"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CREDENTIALS = [
  { tag: "University of San Francisco", detail: "B.S. Psychology" },
  { tag: "University of California, Los Angeles", detail: "Master of Social Work" },
  { tag: "Harbor UCLA Medical Center", detail: "CalWORKs Program" },
  { tag: "Didi Hirsch Mental Health Services", detail: "High Acuity Clinical Work" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.1, ease: "power3.out", delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[var(--warm-white)] py-24 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-14">

        {/* Eyebrow */}
        <p className="text-lg uppercase tracking-[0.25em] text-[var(--teal-light)] mb-12" style={{ fontFamily: "var(--font-playfair)" }}>
          About
        </p>

        <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">

          {/* Photo column */}
          <div ref={photoRef} className="opacity-0">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--cream)]">
              <Image
                src="/images/therapist.png"
                alt="Tiffany — Ground Work Therapy"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Content column */}
          <div ref={contentRef} className="opacity-0 flex flex-col justify-center h-full">

            {/* Pull quote */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-10 text-[var(--text-dark)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              A highly relational approach.{" "}
              <span className="italic" style={{ color: "var(--teal-mid)" }}>
                Showing up as a real person in the room.
              </span>
            </h2>

            {/* Bio */}
            <div className="space-y-5 text-[var(--text-mid)] leading-relaxed text-base md:text-lg mb-12">
              <p>
                I use humor to keep things human and grounded, while bringing the structure and
                directness needed to create real change. I won&apos;t let you stay stuck.
              </p>
              <p>
                I earned my B.S. in Psychology from the University of San Francisco before completing
                my MSW at UCLA with an emphasis in health and mental health across the lifespan.
                My clinical training spanned school aged children at West End Family Counseling,
                the CalWORKs program at Harbor UCLA, and high acuity work at Didi Hirsch in Glendale.
              </p>
              <p>
                I&apos;m now building my private practice working with both teens and adults, bringing
                the same curiosity, warmth, and directness to every session.
              </p>
            </div>

            {/* Credentials */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-light)] mb-5">
                Background
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {CREDENTIALS.map((c) => (
                  <div key={c.tag} className="border-l-2 border-[var(--teal-light)] pl-4">
                    <p className="text-sm font-semibold text-[var(--text-dark)]">{c.tag}</p>
                    <p className="text-xs text-[var(--text-light)] mt-0.5">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
