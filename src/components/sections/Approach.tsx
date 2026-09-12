"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PILLARS = [
  {
    id: "resilience",
    name: "Resilience over Perfection",
    description:
      "Realizing that a sink of dirty dishes or a \"messy\" day isn't a moral failure.",
    imageSrc: "/images/starts-to-click/resilience-over-perfection.png",
    imageAlt:
      "Illustration of a person balancing a range of emotions with resilience",
  },
  {
    id: "presence",
    name: "Presence over Pressure",
    description:
      "Moving from the \"frozen\" state of survival mode to actually owning your day.",
    imageSrc: "/images/starts-to-click/presence-over-pressure.png",
    imageAlt:
      "Illustration of a person breathing deeply and returning to the present moment",
  },
  {
    id: "connection",
    name: "Deeper Connections",
    description:
      "Having the emotional bandwidth to be curious about the people you love, rather than just reacting to them.",
    imageSrc: "/images/starts-to-click/deeper-connections.png",
    imageAlt: "Illustration of two people building connection together",
  },
] as const;

type PillarId = (typeof PILLARS)[number]["id"];

const ACCORDION_EASE = [0.22, 1, 0.36, 1] as const;
const IMAGE_EASE = [0.16, 1, 0.3, 1] as const;

export default function Approach() {
  const [expandedId, setExpandedId] = useState<PillarId | null>(PILLARS[0].id);
  const [imageId, setImageId] = useState<PillarId>(PILLARS[0].id);
  const sectionId = useId();
  const reduceMotion = useReducedMotion();

  const togglePillar = (pillarId: PillarId) => {
    setImageId(pillarId);
    setExpandedId((currentId) => (currentId === pillarId ? null : pillarId));
  };

  return (
    <section id="approach" className="approach-click-section">
      <div className="approach-click-glow" aria-hidden="true" />

      <div className="approach-click-layout">
        <div className="approach-click-copy">
          <h2 className="approach-click-heading">When the work starts to click.</h2>

          <div className="approach-click-accordion">
            {PILLARS.map((pillar) => {
              const isExpanded = pillar.id === expandedId;
              const panelId = `${sectionId}-${pillar.id}-panel`;
              const triggerId = `${sectionId}-${pillar.id}-trigger`;

              return (
                <motion.article
                  key={pillar.id}
                  layout
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                    ease: ACCORDION_EASE,
                  }}
                  className={`approach-click-item ${isExpanded ? "is-active" : ""}`}
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => togglePillar(pillar.id)}
                      className="approach-click-trigger"
                    >
                      <span className="approach-click-label">{pillar.name}</span>
                      <span
                        className={`approach-click-plus ${isExpanded ? "is-active" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.3,
                          ease: ACCORDION_EASE,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="approach-click-description">{pillar.description}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="approach-click-media" aria-live="polite">
          {PILLARS.map((pillar) => {
            const isActive = pillar.id === imageId;

            return (
              <motion.div
                key={pillar.id}
                aria-hidden={!isActive}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.015,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  ease: IMAGE_EASE,
                }}
                className="pointer-events-none absolute inset-0"
              >
                <Image
                  src={pillar.imageSrc}
                  alt={isActive ? pillar.imageAlt : ""}
                  fill
                  sizes="(min-width: 900px) 620px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
