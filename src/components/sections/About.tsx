"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CREDENTIALS = [
  { tag: "University of San Francisco", detail: "B.A. Psychology" },
  { tag: "University of California, Los Angeles", detail: "Master of Social Welfare" },
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
            src="/images/groundWorkTherapyAbout.jpg"
            alt="Tiffany, Ground Work Therapy"
            fill
            unoptimized
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
            MSW, LCSW (she/her)
          </p>

          <p className="about-reveal about-intro opacity-0">
            A highly relational approach, showing up as a real person in the room.
          </p>

          <div className="about-bio">
            <p className="about-reveal opacity-0">
              If you&apos;re the person everyone relies on, the high-functioning overthinker who looks
              put-together on the outside while quietly burning out on the inside… you&apos;re in the right place.
            </p>
            <p className="about-reveal opacity-0">
              You don&apos;t need to be &ldquo;fixed,&rdquo; and you don&apos;t need a therapist who just nods while you
              vent. Together, we&apos;ll untangle old patterns, quiet the mental noise, and build practical skills for
              boundaries and confidence.
            </p>
            <p className="about-reveal opacity-0">
              As a 1.5-generation Mexican-Puerto Rican American and eldest daughter, I bring lived cultural humility
              alongside humor and real talk. No clinical jargon, no passive nodding, just a grounded space to finally
              put yourself first.
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
