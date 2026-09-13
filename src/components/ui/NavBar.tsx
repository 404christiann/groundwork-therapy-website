"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BrandWordmark from "@/components/ui/BrandWordmark";
import { NAV_LINKS } from "@/lib/content";

const MOBILE_NAV_ID = "mobile-site-navigation";
const SCROLL_THRESHOLD = 80;
const SCROLL_HYSTERESIS = 10;
const NAV_TRANSITION = {
  duration: 0.32,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};

const LOGO_MARK = {
  src: "/images/mark-ink.png",
  width: 706,
  height: 755,
};

function DesktopLogo({ compact }: { compact: boolean }) {
  return (
    <Link href="/" aria-label="Ground Work Therapy home" className="desktop-nav-logo">
      <span className="desktop-nav-mark-slot">
        <Image
          src={LOGO_MARK.src}
          width={LOGO_MARK.width}
          height={LOGO_MARK.height}
          alt=""
          className="desktop-nav-mark"
          priority
        />
      </span>
      <span className="desktop-nav-word-slot" aria-hidden={compact}>
        <BrandWordmark className="desktop-nav-word" />
      </span>
    </Link>
  );
}

function MobileLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      aria-label="Ground Work Therapy home"
      onClick={onClick}
      className="flex shrink-0 items-center gap-[10px]"
    >
      <Image
        src={LOGO_MARK.src}
        width={LOGO_MARK.width}
        height={LOGO_MARK.height}
        alt=""
        className="h-[38px] w-auto"
        priority
      />
      <BrandWordmark className="mobile-brand-wordmark" />
    </Link>
  );
}

function MenuBars({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-[15px] w-[26px] flex-col justify-center gap-[6px]" aria-hidden="true">
      <span
        className={`nav-menu-bar block h-[1.5px] w-[26px] bg-[var(--nav-ink)] transition-transform duration-200 ease-out ${
          open ? "translate-y-[3.75px] rotate-45" : ""
        }`}
      />
      <span
        className={`nav-menu-bar block h-[1.5px] w-[26px] bg-[var(--nav-ink)] transition-transform duration-200 ease-out ${
          open ? "-translate-y-[3.75px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pendingHref = useRef<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const updateDesktopNav = () => {
      frame = 0;
      const scrollY = window.scrollY;

      setIsScrolled((current) =>
        current
          ? scrollY > SCROLL_THRESHOLD - SCROLL_HYSTERESIS
          : scrollY > SCROLL_THRESHOLD,
      );

      const marker = 160;
      let nextActive: string | null = null;

      for (const link of NAV_LINKS) {
        const section = document.querySelector<HTMLElement>(link.href);
        if (!section) continue;

        const bounds = section.getBoundingClientRect();
        if (bounds.top <= marker && bounds.bottom > marker) {
          nextActive = link.href;
        }
      }

      setActiveHref((current) => (current === nextActive ? current : nextActive));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDesktopNav);
    };

    updateDesktopNav();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const toggleButton = toggleRef.current;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusCloseButton = window.requestAnimationFrame(() => {
      overlayRef.current?.querySelector<HTMLButtonElement>("[data-nav-close]")?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !overlayRef.current) return;

      const focusable = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const closeAtDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", closeAtDesktop, { passive: true });

    return () => {
      window.cancelAnimationFrame(focusCloseButton);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", closeAtDesktop);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      toggleButton?.focus({ preventScroll: true });
      const href = pendingHref.current;
      if (href) {
        pendingHref.current = null;
        document.querySelector(href)?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          block: "start",
        });
        window.history.replaceState(null, "", href);
      }
    };
  }, [menuOpen]);

  const navigateFromMenu = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    pendingHref.current = href;
    setMenuOpen(false);
  };

  const layoutTransition = reduceMotion ? { duration: 0 } : NAV_TRANSITION;

  return (
    <>
      <motion.nav
        layout
        transition={layoutTransition}
        data-scrolled={isScrolled}
        aria-label="Primary navigation"
        className={`desktop-nav-positioner hidden font-[family-name:var(--font-nunito)] font-medium lg:flex ${
          isScrolled ? "is-scrolled" : ""
        }`}
      >
        <motion.div layout className="desktop-nav-island" transition={layoutTransition}>
          <motion.div layout="position" className="desktop-nav-logo-piece" transition={layoutTransition}>
            <DesktopLogo compact={isScrolled} />
          </motion.div>

          <motion.div layout="position" className="desktop-nav-links" transition={layoutTransition}>
            {NAV_LINKS.map((link) => {
              const active = isScrolled && activeHref === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "location" : undefined}
                  className={`desktop-nav-link ${active ? "is-active" : ""}`}
                >
                  {link.label}
                </a>
              );
            })}
          </motion.div>

          <motion.a
            layout="position"
            transition={layoutTransition}
            href="#contact"
            className="desktop-nav-cta"
          >
            Connect
          </motion.a>
        </motion.div>
      </motion.nav>

      <header className="apple-glass-mobile sticky top-0 z-50 flex items-center justify-between border-b border-[var(--nav-rule)] px-[22px] py-[18px] font-[family-name:var(--font-nunito)] font-medium lg:hidden">
        <MobileLogo />
        <button
          ref={toggleRef}
          type="button"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls={MOBILE_NAV_ID}
          onClick={() => setMenuOpen(true)}
          className="nav-focus-ring flex h-11 w-11 items-center justify-center rounded-full py-[9px]"
        >
          <MenuBars open={false} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={overlayRef}
            id={MOBILE_NAV_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="apple-glass-overlay fixed inset-0 z-[100] flex min-h-[100dvh] flex-col font-[family-name:var(--font-nunito)] font-medium lg:hidden"
          >
            <div className="flex items-center justify-between px-[22px] py-[18px]">
              <MobileLogo onClick={() => setMenuOpen(false)} />
              <button
                data-nav-close
                type="button"
                aria-label="Close navigation"
                aria-expanded="true"
                aria-controls={MOBILE_NAV_ID}
                onClick={() => setMenuOpen(false)}
                className="nav-focus-ring flex h-11 w-11 items-center justify-center rounded-full py-[9px]"
              >
                <MenuBars open />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center gap-[6px] px-[26px]">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => navigateFromMenu(event, link.href)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.2,
                    delay: reduceMotion ? 0 : index * 0.03,
                    ease: "easeOut",
                  }}
                  className="nav-focus-ring min-h-11 py-[12px] font-[family-name:var(--font-newsreader)] text-[42px] font-light leading-none text-[var(--nav-ink)]"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-[16px] px-[26px] pb-[44px]">
              <a
                href="#contact"
                onClick={(event) => navigateFromMenu(event, "#contact")}
                className="nav-focus-ring min-h-11 w-full rounded-[999px] bg-[var(--nav-plum)] p-[18px] text-center text-[15px] uppercase leading-none tracking-[0.06em] text-[var(--nav-plum-text)] shadow-[0_10px_28px_rgba(43,24,10,0.20)]"
              >
                Connect
              </a>
              <p className="text-center text-[13px] leading-none text-[var(--nav-ink-faint)]">
                Free 20-minute consultation
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
