"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

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

  const inputCls =
    "w-full bg-[var(--cream)] border border-[var(--cream-dark)] rounded-xl px-4 py-3 text-sm text-[var(--text-dark)] placeholder-[var(--text-light)] focus:outline-none focus:border-[var(--teal-mid)] transition-colors duration-200";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 px-6 bg-[var(--warm-white)]"
    >
      <div className="max-w-3xl mx-auto">
        <div ref={headingRef} className="opacity-0 text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--teal-light)] mb-4">
            Get In Touch
          </p>
          <h2
            className="text-4xl md:text-5xl text-[var(--teal-deep)] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to explore
            <br />
            <span className="italic text-[var(--text-mid)]">what&apos;s possible?</span>
          </h2>
          <p className="text-[var(--text-mid)] leading-relaxed">
            Reach out to schedule a free 20-minute consultation call. It&apos;s a
            simple, no-pressure space for us to connect, talk about what
            you&apos;re looking for, and see if working together feels right.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 px-8 rounded-3xl bg-[var(--cream)]"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--teal-light)]/20 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3
                className="text-2xl text-[var(--teal-deep)] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Message received
              </h3>
              <p className="text-[var(--text-mid)]">
                Thank you for reaching out. I&apos;ll be in touch within 1–2 business days.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="opacity-0 space-y-5 bg-[var(--cream)] p-8 md:p-12 rounded-3xl"
              initial={false}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--text-light)] mb-2">
                    Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--text-light)] mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--text-light)] mb-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--text-light)] mb-2">
                    Area of Interest
                  </label>
                  <select
                    name="service"
                    value={values.service}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    <option value="">Select one...</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                    <option value="general">General / Not sure yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--text-light)] mb-2">
                  What brings you here? *
                </label>
                <textarea
                  name="message"
                  required
                  value={values.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Share a bit about what you're looking for..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {formState === "error" && (
                <p className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again or email directly.
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "sending"}
                className="w-full py-4 rounded-full bg-[var(--teal-deep)] text-white text-sm tracking-wider uppercase hover:bg-[var(--teal-mid)] transition-all duration-300 disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {formState === "sending" ? "Sending..." : "Send Message"}
              </button>

              <p className="text-center text-xs text-[var(--text-light)]">
                I typically respond within 1–2 business days. Online sessions available.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
