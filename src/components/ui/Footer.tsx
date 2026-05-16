"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#3E3842" }}>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-8 md:px-14 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

          {/* Col 1 — Logo + tagline */}
          <div className="flex flex-col gap-5">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="self-start">
              <Image
                src="/images/newlogo_newfont_white_solid.png"
                alt="Ground Work Therapy"
                width={2048}
                height={2048}
                className="h-28 w-auto opacity-90"
              />
            </button>
            <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: "rgba(186,167,185,0.55)" }}>
              Evidence-based therapy for high-functioning adults and teens in California.
            </p>
          </div>

          {/* Col 2 — Credentials */}
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.25em] mb-0 font-semibold" style={{ color: "rgba(186,167,185,0.4)" }}>
              License
            </p>
            <div
              className="rounded-xl px-5 py-4 inline-flex flex-col gap-1"
              style={{ background: "rgba(186,167,185,0.08)", border: "1px solid rgba(186,167,185,0.15)" }}
            >
              <p className="text-base font-semibold" style={{ fontFamily: "var(--font-playfair)", color: "#F0E0F4" }}>
                Tiffany Venegas
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(186,167,185,0.7)" }}>
                Licensed Clinical Social Worker
              </p>
              <p className="text-xs font-semibold tracking-[0.1em] mt-1" style={{ color: "#BAA7B9" }}>
                LCSW #130210
              </p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(186,167,185,0.35)" }}>
              Providing telehealth services throughout California.
            </p>
          </div>

          {/* Col 3 — Nav */}
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.25em] mb-4 font-semibold" style={{ color: "rgba(186,167,185,0.4)" }}>
              Navigate
            </p>
            {["About", "Approach", "Services"].map(label => (
              <button
                key={label}
                onClick={() => document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium text-left py-1.5 transition-all duration-200 hover:translate-x-1"
                style={{ color: "rgba(186,167,185,0.65)" }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm font-medium text-left py-1.5 transition-all duration-200 hover:translate-x-1"
              style={{ color: "rgba(186,167,185,0.65)" }}
            >
              Connect
            </button>
          </div>

        </div>
      </div>

      {/* Crisis line */}
      <div style={{ borderTop: "1px solid rgba(186,167,185,0.12)" }}>
        <div className="max-w-7xl mx-auto px-8 md:px-14 py-4 text-center">
          <p className="text-xs leading-relaxed" style={{ color: "rgba(186,167,185,0.5)" }}>
            If you are experiencing a mental health crisis, please call{" "}
            <a href="tel:988" className="underline underline-offset-2 hover:opacity-80 transition-opacity">988</a>{" "}
            or go to your nearest emergency room.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(186,167,185,0.08)" }}>
        <div className="max-w-7xl mx-auto px-8 md:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(186,167,185,0.3)" }}>
            © {new Date().getFullYear()} Ground Work Therapy. All rights reserved.
          </p>
          <p className="text-xs text-center md:text-right max-w-sm" style={{ color: "rgba(186,167,185,0.3)" }}>
            This site is for informational purposes only and does not constitute a therapeutic relationship.
          </p>
        </div>
      </div>

    </footer>
  );
}
