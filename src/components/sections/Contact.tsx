"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

type FormState = "idle" | "sending" | "success" | "error";

const DETAILS = [
  "Free 20-minute consultation call",
  "Online sessions available in California",
  "Response within 1–2 business days",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 68%" } });
      gsap.fromTo(rightRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 68%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const { submitContactForm } = await import("@/lib/supabase");
      await submitContactForm(values);
      setFormState("success");
      setValues({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const inputCls = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 border";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-36 px-8 md:px-14 relative overflow-hidden"
      style={{ background: "#F0EEF1" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 65%)" }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-16 md:gap-24 items-start relative z-10">

        {/* Left */}
        <div ref={leftRef} className="opacity-0">
          <p className="text-xs uppercase tracking-[0.3em] mb-6 font-semibold" style={{ color: "#3E3842", opacity: 0.55 }}>
            Get in Touch
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] mb-8"
            style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
          >
            Ready to explore
            <br />
            <span className="italic" style={{ color: "#7F6D8B" }}>what&apos;s possible?</span>
          </h2>
          <p className="leading-relaxed text-sm md:text-base mb-10" style={{ color: "rgba(62,56,66,0.7)" }}>
            Reach out to schedule a free 20 minute consultation. A simple, no pressure space to connect and see if working together feels right.
          </p>

          <div className="flex flex-col gap-4">
            {DETAILS.map((d, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(62,56,66,0.12)" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="#3E3842" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "rgba(62,56,66,0.75)" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div ref={rightRef} className="opacity-0">
          <motion.div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: "#FFFFFF", border: "1px solid rgba(186,167,185,0.2)" }}
            whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(127,109,139,0.12)" }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "#F0E0F4" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7F6D8B" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl mb-3" style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}>Message received</h3>
                  <p className="text-sm" style={{ color: "#7F6D8B" }}>I&apos;ll be in touch within 1–2 business days.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                >
                  {[
                    <div key="row1" className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold" style={{ color: "#BAA7B9" }}>Name *</label>
                        <input name="name" required value={values.name} onChange={handleChange} placeholder="Your full name" className={inputCls} style={{ background: "#F0EEF1", borderColor: "#D3DADA", color: "#3E3842" }} />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold" style={{ color: "#BAA7B9" }}>Email *</label>
                        <input name="email" type="email" required value={values.email} onChange={handleChange} placeholder="you@example.com" className={inputCls} style={{ background: "#F0EEF1", borderColor: "#D3DADA", color: "#3E3842" }} />
                      </div>
                    </div>,
                    <div key="row2" className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold" style={{ color: "#BAA7B9" }}>Phone</label>
                        <input name="phone" type="tel" value={values.phone} onChange={handleChange} placeholder="(555) 000-0000" className={inputCls} style={{ background: "#F0EEF1", borderColor: "#D3DADA", color: "#3E3842" }} />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold" style={{ color: "#BAA7B9" }}>Interested in</label>
                        <select name="service" value={values.service} onChange={handleChange} className={inputCls} style={{ background: "#F0EEF1", borderColor: "#D3DADA", color: "#3E3842" }}>
                          <option value="">Select one...</option>
                          {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                          <option value="general">Not sure yet</option>
                        </select>
                      </div>
                    </div>,
                    <div key="row3">
                      <label className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold" style={{ color: "#BAA7B9" }}>What brings you here? *</label>
                      <textarea name="message" required value={values.message} onChange={handleChange} rows={4} placeholder="Share a bit about what you're looking for..." className={`${inputCls} resize-none`} style={{ background: "#F0EEF1", borderColor: "#D3DADA", color: "#3E3842" }} />
                    </div>,
                  ].map((field, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      {field}
                    </motion.div>
                  ))}

                  {formState === "error" && (
                    <p className="text-red-500 text-xs">Something went wrong — please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5 hover:opacity-90"
                    style={{ background: "#3E3842", color: "#F0E0F4" }}
                  >
                    {formState === "sending" ? "Sending..." : "Send Message"}
                  </button>

                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
