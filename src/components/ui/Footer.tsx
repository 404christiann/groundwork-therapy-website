"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = footerRef.current?.querySelectorAll(".footer-reveal");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items ?? [], { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }
      gsap.fromTo(
        items ?? [],
        { opacity: 0, y: 18, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, stagger: 0.09, ease: "power2.out", scrollTrigger: { trigger: footerRef.current, start: "top 88%" } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{ background: "var(--espresso)" }}>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-8 md:px-14 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

          {/* Col 1 — Logo + tagline */}
          <div className="footer-reveal opacity-0 flex flex-col gap-5">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="self-start">
              <Image
                src="/images/newlogo_newfont_white_solid.png"
                alt="Ground Work Therapy"
                width={2048}
                height={2048}
                className="h-28 w-auto opacity-90"
              />
            </button>
            <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: "rgba(254,249,239,0.66)" }}>
              Evidence-based therapy for high-functioning adults and teens in California.
            </p>
          </div>

          {/* Col 2 — Credentials */}
          <div className="footer-reveal opacity-0 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.25em] mb-0 font-semibold" style={{ color: "rgba(254,249,239,0.66)" }}>
              License
            </p>
            <div
              className="rounded-xl px-5 py-4 inline-flex flex-col gap-1"
              style={{ background: "rgba(254,249,239,0.06)", border: "1px solid var(--line-light)" }}
            >
              <p className="text-base font-semibold" style={{ fontFamily: "var(--font-playfair)", color: "var(--ivory)" }}>
                Tiffany Venegas
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(254,249,239,0.74)" }}>
                Licensed Clinical Social Worker
              </p>
              <p className="text-xs font-semibold tracking-[0.1em] mt-1" style={{ color: "var(--ivory)" }}>
                LCSW #130210
              </p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(254,249,239,0.66)" }}>
              Providing telehealth services throughout California.
            </p>
          </div>

          {/* Col 3 — Nav */}
          <div className="footer-reveal opacity-0 flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.25em] mb-4 font-semibold" style={{ color: "rgba(254,249,239,0.66)" }}>
              Navigate
            </p>
            {["About", "Approach", "Services"].map(label => (
              <button
                key={label}
                onClick={() => document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium text-left py-1.5 transition-all duration-200 hover:translate-x-1"
                style={{ color: "rgba(254,249,239,0.74)" }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm font-medium text-left py-1.5 transition-all duration-200 hover:translate-x-1"
              style={{ color: "rgba(254,249,239,0.74)" }}
            >
              Connect
            </button>
          </div>

        </div>
      </div>

      {/* Crisis line */}
      <div style={{ borderTop: "1px solid var(--line-light)" }}>
        <div className="footer-reveal opacity-0 max-w-7xl mx-auto px-8 md:px-14 py-4 text-center">
          <p className="text-xs leading-relaxed" style={{ color: "rgba(254,249,239,0.66)" }}>
            If you are experiencing a mental health crisis, please call{" "}
            <a href="tel:988" className="underline underline-offset-2 hover:opacity-80 transition-opacity">988</a>{" "}
            or go to your nearest emergency room.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--line-light)" }}>
        <div className="footer-reveal opacity-0 max-w-7xl mx-auto px-8 md:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(254,249,239,0.66)" }}>
            © {new Date().getFullYear()} Ground Work Therapy. All rights reserved.
          </p>
          <p className="text-xs text-center md:text-right max-w-sm" style={{ color: "rgba(254,249,239,0.66)" }}>
            This site is for informational purposes only and does not constitute a therapeutic relationship.
          </p>
        </div>
      </div>

    </footer>
  );
}
