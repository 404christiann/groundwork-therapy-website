"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/content";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoSrc = "/images/newlogo_newfont_header_tone.png";

  useEffect(() => {
    const onScroll = () => setOnHero(window.scrollY < 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!logoRef.current) return;
    gsap.fromTo(logoRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out", delay: 0.8 });
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  // Hero is now light lavender — nav always uses dark text
  const tc = "text-[var(--text-mid)] hover:text-[var(--teal-deep)]";
  const cc = "border-[var(--teal-deep)] text-[var(--teal-deep)] hover:bg-[var(--teal-deep)] hover:text-white";

  return (
    <>
      {/* Main navbar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 py-2 transition-all duration-300 ${
          !onHero && !menuOpen
            ? "bg-[var(--warm-white)]/90 backdrop-blur-md border-b border-[var(--cream-dark)]/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-14 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex-shrink-0"
          >
            <div ref={logoRef} className="opacity-0 transition-all duration-300">
              <Image
                src={logoSrc}
                alt="Ground Work Therapy"
                width={2048}
                height={2048}
                className="h-36 w-auto md:h-48"
                priority
              />
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link, i) => (
              <motion.li key={link.href} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.07, duration: 0.5 }}>
                <button onClick={() => handleNav(link.href)} className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${tc}`}>
                  {link.label}
                </button>
              </motion.li>
            ))}
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
              <button
                onClick={() => handleNav("#contact")}
                className={`text-xs font-semibold uppercase tracking-[0.15em] px-6 py-2.5 rounded-full border transition-all duration-300 ${cc}`}
              >
                Connect
              </button>
            </motion.li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden transition-colors duration-300 text-[var(--teal-deep)]"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col md:hidden"
            style={{ background: "#F0E0F4" }}
          >
            {/* Close button */}
            <div className="flex justify-end px-6 pt-6">
              <button onClick={() => setMenuOpen(false)} style={{ color: "#3E3842" }} className="hover:opacity-60 transition-opacity">
                <X size={28} />
              </button>
            </div>

            {/* Logo */}
            <div className="flex justify-center mt-4 mb-10">
              <Image
                src={logoSrc}
                alt="Ground Work Therapy"
                width={2048}
                height={2048}
                className="h-40 w-auto"
              />
            </div>

            {/* Nav links */}
            <div className="flex flex-col items-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  onClick={() => handleNav(link.href)}
                  className="w-full text-center py-5 text-sm font-semibold uppercase tracking-[0.2em] transition-colors"
                  style={{ color: "#5A4D61", borderBottom: "1px solid #BAA7B9" }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center mt-10 px-8">
              <button
                onClick={() => handleNav("#contact")}
                className="w-full py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                style={{ border: "1px solid #7F6D8B", color: "#3E3842" }}
              >
                Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
