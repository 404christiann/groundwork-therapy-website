"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type SendState = "idle" | "sending" | "sent" | "error";
type Values = { name: string; email: string; phone: string; service: string; message: string };
type Field = "message" | "name" | "email";

const EMPTY: Values = { name: "", email: "", phone: "", service: "", message: "" };

const DETAILS = [
  "Free 20-minute consultation call",
  "Online sessions available in California",
  "Response within 1–2 business days",
];

// The speciality menu: plain-language concerns first, then the approaches,
// then "Not sure yet". Values are what the Supabase `service` column stores.
const SPECIALITY_OPTIONS = [
  { value: "anxiety", name: "Anxiety & ADHD", line: "For a mind that’s always on" },
  { value: "trauma", name: "Trauma", line: "Processing difficult experiences safely" },
  { value: "life-transitions", name: "Life Transitions", line: "Support through a season of change" },
  { value: "act", name: "ACT", line: "Let your values, not anxiety, guide you" },
  { value: "cbt", name: "CBT", line: "Shift the thought patterns keeping you stuck" },
  { value: "dbt", name: "DBT", line: "Concrete skills for intense emotions" },
  { value: "general", name: "Not sure yet", line: "That’s okay. We can figure it out together." },
] as const;

const MESSAGES: Record<Field, string> = {
  message: "Share a sentence or two, whatever feels right.",
  name: "Please add your name.",
  email: "Please add a valid email.",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldError = (field: Field, values: Values) => {
  const value = values[field].trim();
  if (!value) return true;
  return field === "email" ? !EMAIL.test(value) : false;
};

function SpecialitySelect({
  value,
  onChange,
  labelId,
}: {
  value: string;
  onChange: (value: string) => void;
  labelId: string;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const selectedIndex = SPECIALITY_OPTIONS.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? SPECIALITY_OPTIONS[selectedIndex] : null;

  const openMenu = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
    requestAnimationFrame(() => listRef.current?.focus({ preventScroll: true }));
  };

  const closeMenu = (returnFocus: boolean) => {
    setOpen(false);
    setActive(-1);
    if (returnFocus) triggerRef.current?.focus({ preventScroll: true });
  };

  const choose = (index: number) => {
    onChange(SPECIALITY_OPTIONS[index].value);
    closeMenu(true);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenu(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu();
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const last = SPECIALITY_OPTIONS.length - 1;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, last));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(last);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (active >= 0) choose(active);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
    } else if (event.key === "Tab") {
      closeMenu(false);
    }
  };

  return (
    <div ref={rootRef} className="contact-select" data-open={open ? "" : undefined}>
      <button
        ref={triggerRef}
        type="button"
        className="contact-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${labelId} ${id}-value`}
        onClick={() => (open ? closeMenu(true) : openMenu())}
        onKeyDown={onTriggerKeyDown}
      >
        <span id={`${id}-value`} className="contact-select-value">
          {selected ? (
            <>
              <span className="contact-select-name">{selected.name}</span>
              <span className="contact-select-line">{selected.line}</span>
            </>
          ) : (
            <span className="contact-select-placeholder">Choose one, if you know</span>
          )}
        </span>
        <ChevronDown className="contact-select-chevron" size={18} strokeWidth={2} aria-hidden="true" />
      </button>

      <ul
        ref={listRef}
        id={`${id}-list`}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={labelId}
        aria-activedescendant={open && active >= 0 ? `${id}-option-${active}` : undefined}
        className="contact-select-menu"
        onKeyDown={onListKeyDown}
      >
        {SPECIALITY_OPTIONS.map((option, index) => (
          <li
            key={option.value}
            id={`${id}-option-${index}`}
            role="option"
            aria-selected={option.value === value}
            data-active={index === active ? "" : undefined}
            data-separated={option.value === "general" ? "" : undefined}
            className="contact-select-option"
            onPointerMove={() => setActive(index)}
            onClick={() => choose(index)}
          >
            <span className="contact-select-name">{option.name}</span>
            <span className="contact-select-line">{option.line}</span>
            <Check className="contact-select-check" size={18} strokeWidth={2.4} aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const sentTimer = useRef<number | undefined>(undefined);
  const id = useId();

  const [values, setValues] = useState<Values>(EMPTY);
  const [invalid, setInvalid] = useState<Partial<Record<Field, boolean>>>({});
  const [sendState, setSendState] = useState<SendState>("idle");
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = leftRef.current?.querySelectorAll(".contact-word");
      const reveals = leftRef.current?.querySelectorAll(".contact-reveal");

      if (reducedMotion) {
        gsap.set([words, reveals, rightRef.current], { opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      gsap.fromTo(words ?? [], { opacity: 0, y: 10, filter: "blur(9px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } });
      gsap.fromTo(reveals ?? [], { opacity: 0, y: 18, filter: "blur(5px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } });
      gsap.fromTo(rightRef.current, { opacity: 0, clipPath: "inset(0% 0% 14% 0% round 1rem)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 1rem)", duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => () => window.clearTimeout(sentTimer.current), []);

  const update = (key: keyof Values, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (sendState === "error") setSendState("idle");
    // An error clears the moment the value is fixed
    if (key in MESSAGES && invalid[key as Field] && !fieldError(key as Field, next)) {
      setInvalid((current) => ({ ...current, [key]: false }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (sendState === "sending" || sendState === "sent") return;

    const fields: Field[] = ["message", "name", "email"];
    const nextInvalid = Object.fromEntries(fields.map((field) => [field, fieldError(field, values)])) as Record<Field, boolean>;
    setInvalid(nextInvalid);
    const firstInvalid = fields.find((field) => nextInvalid[field]);
    if (firstInvalid) {
      const target = { message: messageRef, name: nameRef, email: emailRef }[firstInvalid];
      target.current?.focus();
      return;
    }

    setSendState("sending");
    try {
      const { submitContactForm } = await import("@/lib/supabase");
      await submitContactForm(values);
      setSendState("sent");
      // Let "Sent" register on the button, then the thank-you takes the card
      sentTimer.current = window.setTimeout(() => {
        setThanks(true);
        setValues(EMPTY);
      }, 650);
    } catch {
      setSendState("error");
    }
  };

  const fieldProps = (field: Field) => ({
    "aria-invalid": invalid[field] ? true : undefined,
    "aria-describedby": `${id}-${field}-msg`,
  });

  const errorLine = (field: Field) => (
    <p id={`${id}-${field}-msg`} className="contact-field-msg" aria-live="polite">
      {invalid[field] ? MESSAGES[field] : ""}
    </p>
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-36 px-8 md:px-14 relative overflow-hidden"
      style={{ background: "var(--ivory)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,255,255,0.40) 0%, transparent 65%)" }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-16 md:gap-24 items-start relative z-10">

        {/* Left */}
        <div ref={leftRef}>
          <p className="contact-reveal opacity-0 text-sm uppercase tracking-[0.25em] mb-6 font-semibold" style={{ color: "var(--button)" }}>
            Get in Touch
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] mb-8"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--charcoal)" }}
          >
            <span className="contact-word inline-block opacity-0 mr-[0.16em]">Ready</span>
            <span className="contact-word inline-block opacity-0 mr-[0.16em]">to</span>
            <span className="contact-word inline-block opacity-0">explore</span>
            <br />
            <span className="italic accent-highlight">
              <span className="contact-word inline-block opacity-0 mr-[0.16em]">what&apos;s</span>
              <span className="contact-word inline-block opacity-0">possible?</span>
            </span>
          </h2>
          <p className="contact-reveal opacity-0 leading-relaxed text-sm md:text-base mb-10" style={{ color: "var(--muted)" }}>
            Reach out to schedule a free 20 minute consultation. A simple, no pressure space to connect and see if working together feels right.
          </p>

          <div className="contact-reveal opacity-0 flex flex-col gap-4">
            {DETAILS.map((d, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(106,74,92,0.12)" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="var(--button)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "var(--muted)" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: one gentle step. What you'd like support with comes first,
            how to reach you second, all on one card with one Send. */}
        <div ref={rightRef} className="opacity-0">
          <div className="contact-card">
            <div className="contact-swap" data-sent={thanks ? "" : undefined}>
              <form className="contact-form" onSubmit={handleSubmit} noValidate aria-hidden={thanks || undefined}>
                <div className="contact-group">
                  <h3 className="contact-group-title">What would you like support with?</h3>
                  <p id={`${id}-speciality-label`} className="contact-hint">
                    Pick one if you know. It’s fine if you don’t.
                  </p>
                  <SpecialitySelect
                    value={values.service}
                    onChange={(value) => update("service", value)}
                    labelId={`${id}-speciality-label`}
                  />
                  <div className="contact-field" data-invalid={invalid.message ? "" : undefined}>
                    <label htmlFor={`${id}-message`}>What brings you here?</label>
                    <textarea
                      ref={messageRef}
                      id={`${id}-message`}
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={(event) => update("message", event.target.value)}
                      placeholder="Share a bit about what you’re looking for…"
                      className="contact-control contact-control--area"
                      {...fieldProps("message")}
                    />
                    {errorLine("message")}
                  </div>
                </div>

                <div className="contact-group">
                  <h3 className="contact-group-title">How can I reach you?</h3>
                  <div className="contact-two">
                    <div className="contact-field" data-invalid={invalid.name ? "" : undefined}>
                      <label htmlFor={`${id}-name`}>Name</label>
                      <input
                        ref={nameRef}
                        id={`${id}-name`}
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={(event) => update("name", event.target.value)}
                        placeholder="Your full name"
                        className="contact-control"
                        {...fieldProps("name")}
                      />
                      {errorLine("name")}
                    </div>
                    <div className="contact-field" data-invalid={invalid.email ? "" : undefined}>
                      <label htmlFor={`${id}-email`}>Email</label>
                      <input
                        ref={emailRef}
                        id={`${id}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(event) => update("email", event.target.value)}
                        placeholder="you@example.com"
                        className="contact-control"
                        {...fieldProps("email")}
                      />
                      {errorLine("email")}
                    </div>
                    <div className="contact-field contact-field--full">
                      <label htmlFor={`${id}-phone`}>
                        Phone <span className="contact-optional">optional</span>
                      </label>
                      <input
                        id={`${id}-phone`}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(event) => update("phone", event.target.value)}
                        placeholder="(555) 000-0000"
                        className="contact-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-foot">
                  <button
                    type="submit"
                    className="contact-send"
                    data-state={sendState === "error" ? "idle" : sendState}
                    aria-disabled={sendState === "sending" || sendState === "sent" || undefined}
                  >
                    <span className="contact-send-state contact-send-idle">
                      Send message <ArrowRight className="contact-send-arrow" size={18} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="contact-send-state contact-send-sending" aria-hidden={sendState !== "sending"}>
                      <span className="contact-spinner" aria-hidden="true" />
                      Sending
                    </span>
                    <span className="contact-send-state contact-send-sent" aria-hidden={sendState !== "sent"}>
                      <Check size={18} strokeWidth={2.4} aria-hidden="true" />
                      Sent
                    </span>
                  </button>
                  <p className="contact-error" role="alert">
                    {sendState === "error" ? "Something went wrong. Please try again." : ""}
                  </p>
                  <p className="contact-crisis">
                    In a mental health crisis, please call <a href="tel:988">988</a>.
                  </p>
                </div>
              </form>

              <div className="contact-thanks" aria-live="polite">
                {thanks ? (
                  <>
                    <span className="contact-thanks-tick" aria-hidden="true">
                      <Check size={24} strokeWidth={2.2} />
                    </span>
                    <h3 className="contact-thanks-title">Message received</h3>
                    <p className="contact-thanks-copy">I&apos;ll be in touch within 1–2 business days.</p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
