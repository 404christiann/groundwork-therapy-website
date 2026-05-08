"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-14 px-8 md:px-14"
      style={{ background: "#3E3842" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Image
            src="/images/logo-v3.png"
            alt="Ground Work Therapy"
            width={2048}
            height={2048}
            className="h-24 w-auto opacity-90"
          />
        </button>

        {/* Nav links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#BAA7B9" }}>
          {["About", "Approach", "Services"].map(label => (
            <button
              key={label}
              onClick={() => document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })}
              className="hover:opacity-100 transition-opacity duration-200 text-left"
              style={{ opacity: 0.6 }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Legal */}
        <p className="text-xs max-w-xs leading-relaxed" style={{ color: "rgba(186,167,185,0.4)" }}>
          © {new Date().getFullYear()} Ground Work Therapy. This site is for informational purposes only and does not constitute a therapeutic relationship.
        </p>

      </div>
    </footer>
  );
}
