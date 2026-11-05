"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SERVICES = [
  {
    id: "act",
    num: "01",
    label: "ACT",
    name: "Acceptance & Commitment Therapy",
    description:
      "Notice and step back from unhelpful thought loops so your values, not anxiety, can guide your choices. ACT is especially useful for perfectionism, worry, and feeling stuck despite self-awareness.",
    color: "#9FBF2D",
    imageSrc: "/images/stack-services/service1.png",
    imagePosition: "center 30%",
  },
  {
    id: "cbt",
    num: "02",
    label: "CBT",
    name: "Cognitive Behavioral Therapy",
    description:
      "Identify the thought patterns and behaviors maintaining your struggles, then work systematically to shift them. It is practical, structured work designed to create meaningful change.",
    color: "#0083A1",
    imageSrc: "/images/stack-services/service2.png",
    imagePosition: "center center",
  },
  {
    id: "dbt",
    num: "03",
    label: "DBT",
    name: "Dialectical Behavior Therapy",
    description:
      "Build concrete skills for managing intense emotions, tolerating distress, and navigating relationships with more ease. Expect a usable toolkit, not insight alone.",
    color: "#A10060",
    imageSrc: "/images/stack-services/service3.png",
    imagePosition: "center center",
  },
  {
    id: "trauma",
    num: "04",
    label: "Trauma",
    name: "Trauma-Informed Care",
    description:
      "Process difficult experiences without losing your sense of safety or control. We move at a manageable pace so the past can stop dictating the present.",
    color: "#4600A1",
    imageSrc: "/images/stack-services/service4.png",
    imagePosition: "center center",
  },
  {
    id: "anxiety-adhd",
    num: "05",
    label: "Anxiety & ADHD",
    name: "Support for a Mind That Is Always On",
    description:
      "Untangle overthinking, self-doubt, and emotional overwhelm so you can respond with clarity instead of reacting from fear. We address anxiety and ADHD with targeted, practical strategies.",
    color: "#F47A23",
    imageSrc: "/images/stack-services/service5.png",
    imagePosition: "center 30%",
  },
  {
    id: "life-transitions",
    num: "06",
    label: "Life Transitions",
    name: "Support Through Change",
    description:
      "For teens and adults navigating identity shifts, relationships, grief, school, work, or a season that no longer fits. We make room for what is changing and build a steadier way forward.",
    color: "#2864DC",
    imageSrc: "/images/stack-services/service6.png",
    imagePosition: "center center",
  },
] as const;

const COUNT = SERVICES.length;
const DEAL_MS = 380;
const SWIPE_PX = 48;

// Depth 0 is the top card. Small alternating angles and uneven offsets make the
// pile look like loose cards. Cards deeper than 2 stay hidden behind it.
const POSES = [
  { x: 0, y: 0, r: -2 },
  { x: 18, y: -8, r: 4 },
  { x: -18, y: 10, r: -6 },
] as const;
const GONE = "translate(-70%, 6%) rotate(-14deg)";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Services() {
  const [top, setTop] = useState(0);
  // The card being dealt away (next) or brought back from the left (previous)
  const [leaving, setLeaving] = useState<number | null>(null);
  const [entering, setEntering] = useState<number | null>(null);
  const topRef = useRef(0);
  const busy = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const frame = useRef<number | undefined>(undefined);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    topRef.current = top;
  }, [top]);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    },
    [],
  );

  const release = () => {
    timer.current = window.setTimeout(() => {
      busy.current = false;
    }, DEAL_MS);
  };

  const next = useCallback(() => {
    if (busy.current) return;
    const current = topRef.current;
    if (reduceMotion) {
      setTop((current + 1) % COUNT);
      return;
    }
    busy.current = true;
    setLeaving(current);
    timer.current = window.setTimeout(() => {
      setTop((current + 1) % COUNT);
      setLeaving(null);
      busy.current = false;
    }, DEAL_MS);
  }, [reduceMotion]);

  const previous = useCallback(() => {
    if (busy.current) return;
    const target = (topRef.current - 1 + COUNT) % COUNT;
    if (reduceMotion) {
      setTop(target);
      return;
    }
    busy.current = true;
    // Place the returning card off to the left with no transition, then animate
    // it onto the top of the pile on the next frame.
    setEntering(target);
    frame.current = window.requestAnimationFrame(() => {
      frame.current = window.requestAnimationFrame(() => {
        setTop(target);
        setEntering(null);
        release();
      });
    });
  }, [reduceMotion]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else previous();
  };

  const service = SERVICES[top];

  return (
    <section id="services" className="specialities-section" aria-labelledby="specialities-heading">
      <div className="specialities-inner">
        <h2
          id="specialities-heading"
          className="text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
        >
          Specialities
        </h2>

        {/* Every speciality in full as page text, so screen readers and search
            engines get all six while the deck below shows one at a time. It is
            visually hidden rather than display:none, so screen readers still read it. */}
        <ul className="sr-only">
          {SERVICES.map((item) => (
            <li key={item.id}>
              <h3>
                {item.label}: {item.name}
              </h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>

        <div
          className="deck"
          role="group"
          aria-roledescription="carousel"
          aria-label="Specialities"
          onKeyDown={onKeyDown}
        >
          <div
            className="deck-pile"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
          >
            {SERVICES.map((item, index) => {
              const depth = (index - top + COUNT) % COUNT;
              const pose = POSES[Math.min(depth, POSES.length - 1)];
              const away = leaving === index || entering === index;
              return (
                <article
                  key={item.id}
                  className="deck-card"
                  aria-hidden="true"
                  data-top={depth === 0 && !away ? "" : undefined}
                  data-leaving={leaving === index ? "" : undefined}
                  data-entering={entering === index ? "" : undefined}
                  style={{
                    backgroundColor: item.color,
                    zIndex: away ? COUNT + 1 : COUNT - depth,
                    opacity: away || depth > 2 ? 0 : 1,
                    transform: away ? GONE : `translate(${pose.x}px, ${pose.y}px) rotate(${pose.r}deg)`,
                  }}
                >
                  <div className="deck-art">
                    <Image
                      src={item.imageSrc}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 248px, 300px"
                      draggable={false}
                      className="deck-image"
                      style={{ objectPosition: item.imagePosition }}
                    />
                  </div>
                  <div className="deck-band">
                    <span className="deck-num">{item.num}</span>
                    <span className="deck-label">{item.label}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="deck-copy">
            <p className="deck-count" aria-hidden="true">
              <span>{service.num}</span>
              <span className="deck-count-of">/ {pad(COUNT)}</span>
            </p>
            {/* The list above holds the full text of all six. This visible copy
                only repeats the top card, so it is hidden from assistive tech. */}
            <p className="sr-only" aria-live="polite">
              Showing {service.label}, {Number(service.num)} of {COUNT}
            </p>
            <div className="deck-text" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={service.id}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.14, ease: "easeOut" } }}
                  transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="deck-name">{service.name}</p>
                  <p className="deck-desc">{service.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="deck-controls">
              <button type="button" className="deck-btn" onClick={previous} aria-label="Previous speciality">
                <ChevronLeft size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button type="button" className="deck-btn deck-btn--primary" onClick={next} aria-label="Next speciality">
                <ChevronRight size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
