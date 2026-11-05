"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import BrandWordmark from "@/components/ui/BrandWordmark";
import { NAV_LINKS } from "@/lib/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = [...NAV_LINKS, { label: "Connect", href: "#contact" }];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = footerRef.current?.querySelectorAll(".footer-reveal");
      const trigger = { trigger: footerRef.current, start: "top 90%" };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(items ?? [], { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none", scrollTrigger: trigger });
        return;
      }
      gsap.fromTo(
        items ?? [],
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", scrollTrigger: trigger }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const backToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer ref={footerRef} className="site-footer">
      <button
        type="button"
        onClick={backToTop}
        className="footer-reveal footer-brand opacity-0"
        aria-label="Tiffany Venegas, LCSW — back to top"
      >
        <Image src="/images/mark-ink.png" alt="" width={706} height={755} className="footer-brand-mark" />
        <BrandWordmark className="footer-brand-wordmark" />
      </button>

      <p className="footer-reveal footer-tagline opacity-0">
        Evidence-based therapy for high-functioning adults and teens in California.
      </p>

      <nav className="footer-reveal footer-nav opacity-0" aria-label="Footer">
        {FOOTER_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="footer-link">
            {link.label}
          </a>
        ))}
      </nav>

      <p className="footer-reveal footer-license opacity-0">
        <span>Licensed Clinical Social Worker</span>
        <span>LCSW #130210</span>
        <span>Telehealth throughout California</span>
      </p>

      <p className="footer-reveal footer-crisis opacity-0">
        <a href="tel:988" className="footer-crisis-number" aria-label="Call 988">
          988
        </a>
        <span>If you are experiencing a mental health crisis, please call 988 or go to your nearest emergency room.</span>
      </p>

      <div className="footer-reveal footer-base opacity-0">
        <p>© {new Date().getFullYear()} Ground Work Therapy. All rights reserved.</p>
        <p>This site is for informational purposes only and does not constitute a therapeutic relationship.</p>
      </div>
    </footer>
  );
}
