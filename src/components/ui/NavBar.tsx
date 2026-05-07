"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NAV_LINKS } from "@/lib/content";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!logoRef.current) return;
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[var(--warm-white)]/90 backdrop-blur-md border-b border-[var(--cream-dark)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span
              ref={logoRef}
              className="font-playfair text-[var(--teal-deep)] text-lg tracking-wide select-none"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ground Work
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
              >
                <button
                  onClick={() => handleNav(link.href)}
                  className="text-sm text-[var(--text-mid)] hover:text-[var(--teal-deep)] transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </button>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button
                onClick={() => handleNav("#contact")}
                className="text-sm px-5 py-2 rounded-full border border-[var(--teal-deep)] text-[var(--teal-deep)] hover:bg-[var(--teal-deep)] hover:text-white transition-all duration-300"
              >
                Free Consultation
              </button>
            </motion.li>
          </ul>

          {/* Mobile burger */}
          <button
            className="md:hidden text-[var(--teal-deep)]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 z-40 w-72 bg-[var(--warm-white)] shadow-2xl flex flex-col pt-24 px-8 md:hidden"
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            className="text-left py-4 text-lg text-[var(--text-dark)] border-b border-[var(--cream-dark)] hover:text-[var(--teal-deep)] transition-colors"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => handleNav("#contact")}
          className="mt-8 py-3 px-6 rounded-full bg-[var(--teal-deep)] text-white text-sm tracking-wide"
        >
          Free Consultation
        </button>
      </motion.div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
