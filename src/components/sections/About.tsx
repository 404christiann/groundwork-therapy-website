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
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const reveals = sectionRef.current?.querySelectorAll(".about-reveal");

      if (reducedMotion) {
        gsap.set([photoRef.current, reveals], { opacity: 1, x: 0, y: 0, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      gsap.fromTo(
        photoRef.current,
        { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "power4.inOut", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } }
      );
      gsap.fromTo(
        photoRef.current?.querySelector(".about-photo-image") ?? null,
        { scale: 1.1 },
        { scale: 1, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } }
      );
      gsap.fromTo(
        reveals ?? [],
        { opacity: 0, y: 20, filter: "blur(7px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: contentRef.current, start: "top 76%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
    >
      <div className="about-panel">
        {/* Portrait */}
        <div ref={photoRef} className="about-photo opacity-0">
          <Image
            src="/images/therapist.png"
            alt="Tiffany — Ground Work Therapy"
            fill
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 50vw, 700px"
            className="about-photo-image"
          />
        </div>

        {/* Biography */}
        <div ref={contentRef} className="about-copy">
          <h2 className="about-reveal about-name opacity-0">
            Tiffany Venegas
          </h2>

          <p className="about-reveal about-role opacity-0">
            LCSW (she/her)
          </p>

          <p className="about-reveal about-intro opacity-0">
            A highly relational approach—showing up as a real person in the room.
          </p>

          <div className="about-bio">
            <p className="about-reveal opacity-0">
              Hi, I&apos;m Tiffany! I use humor to keep things human and grounded, while bringing the structure and
              directness needed to create real change. I won&apos;t let you stay stuck.
            </p>
            <p className="about-reveal opacity-0">
              I earned my B.S. in Psychology from the University of San Francisco before completing
              my MSW at UCLA with an emphasis in health and mental health across the lifespan.
              My clinical training spanned school aged children at West End Family Counseling,
              the CalWORKs program at Harbor UCLA, and high acuity work at Didi Hirsch in Glendale.
            </p>
            <p className="about-reveal opacity-0">
              I&apos;m now building my private practice working with both teens and adults, bringing
              the same curiosity, warmth, and directness to every session.
            </p>
          </div>

          {/* Credentials */}
          <div className="about-reveal about-background opacity-0">
            <p className="about-background-title">Background</p>
            <div className="about-credentials">
              {CREDENTIALS.map((credential) => (
                <div key={credential.tag} className="about-credential">
                  <p>{credential.tag}</p>
                  <span>{credential.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
