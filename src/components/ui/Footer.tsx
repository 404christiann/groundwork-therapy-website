"use client";

export default function Footer() {
  return (
    <footer className="bg-[var(--teal-deep)] text-white/60 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <span
          className="text-white text-base tracking-wide"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ground Work Therapy
        </span>
        <p className="text-center">
          © {new Date().getFullYear()} Ground Work Therapy. All rights reserved.
        </p>
        <p className="text-center text-xs max-w-xs">
          This site is for informational purposes only and does not constitute
          therapeutic advice or a therapeutic relationship.
        </p>
      </div>
    </footer>
  );
}
