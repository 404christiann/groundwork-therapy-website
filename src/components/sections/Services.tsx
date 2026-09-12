"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "act",
    num: "01",
    label: "ACT",
    name: "Acceptance & Commitment Therapy",
    description:
      "Notice and step back from unhelpful thought loops so your values—not anxiety—can guide your choices. ACT is especially useful for perfectionism, worry, and feeling stuck despite being self-aware.",
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

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-stack-card");
      const heading = sectionRef.current?.querySelector<HTMLElement>(
        ".service-stack-heading",
      );
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(cards, { clearProps: "transform,opacity,visibility,filter" });
        if (heading) {
          gsap.set(heading, { clearProps: "transform,opacity,visibility" });
        }
        return;
      }

      const isCompact = window.matchMedia("(max-width: 767px)").matches;
      const scaleStep = isCompact ? 0.07 : 0.12;
      const maximumVisibleDepth = 3;

      const renderStack = (progress: number) => {
        // Include one final interval so the last card exits before the following
        // section arrives. Reversing the scroll reconstructs the same stack.
        const activePosition = progress * cards.length;
        const stageBottom =
          sectionRef.current?.querySelector<HTMLElement>(".service-stack-stage")
            ?.getBoundingClientRect().bottom ?? window.innerHeight;

        // Keep the section title present while the cards are active, then let
        // it leave with the final card. Because this is derived from scroll
        // progress, it restores itself naturally when the user scrolls back.
        if (heading) {
          const headingExitStart = 0.94;
          const headingExitProgress = gsap.utils.clamp(
            0,
            1,
            (progress - headingExitStart) / (1 - headingExitStart),
          );
          const easedHeadingExit =
            headingExitProgress *
            headingExitProgress *
            (3 - 2 * headingExitProgress);

          gsap.set(heading, {
            y: -12 * easedHeadingExit,
            opacity: 1 - easedHeadingExit,
            visibility: easedHeadingExit < 0.99 ? "visible" : "hidden",
          });
        }

        cards.forEach((card, index) => {
          const relativePosition = index - activePosition;

          if (relativePosition < 0) {
            const leaving = Math.min(1, Math.abs(relativePosition));
            const completedScale = 1.12 + index * 0.008;

            gsap.set(card, {
              yPercent: 0,
              y: -stageBottom * leaving,
              scale: 1 + (completedScale - 1) * leaving,
              rotateX: 15 * leaving,
              opacity: 1,
              visibility: "visible",
              filter: "blur(0px)",
              zIndex: cards.length - index,
              transformOrigin: "50% 100%",
            });
            return;
          }

          const visualDepth = Math.min(relativePosition, maximumVisibleDepth);
          const depthOffset =
            15 * Math.min(visualDepth, 1) + 5 * Math.max(visualDepth - 1, 0);

          gsap.set(card, {
            yPercent: 0,
            y: isCompact ? depthOffset * 0.72 : depthOffset,
            scale: 1 - visualDepth * scaleStep,
            rotateX: 0,
            opacity: 1,
            visibility: "visible",
            filter: "blur(0px)",
            zIndex: cards.length - index,
            transformOrigin: "50% 100%",
          });
        });
      };

      renderStack(0);

      ScrollTrigger.create({
        trigger: trackRef.current,
        start: isCompact ? "top top+=88" : "top top+=112",
        end: "bottom bottom",
        scrub: 0.35,
        invalidateOnRefresh: true,
        onRefresh: (self) => renderStack(self.progress),
        onUpdate: (self) => renderStack(self.progress),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="services-stack-section bg-[#F7F7F7]">
      <div ref={trackRef} className="service-stack-track px-4 md:px-8">
        <div className="service-stack-viewport">
          <div className="service-stack-heading mx-auto max-w-[1000px]">
            <h2
              className="text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-playfair)", color: "#3E3842" }}
            >
              Specialities
            </h2>
          </div>

          <div className="service-stack-stage mx-auto max-w-[1000px]">
            {SERVICES.map((service, index) => (
              <article
                key={service.id}
                className="service-stack-card"
                style={{ backgroundColor: service.color, zIndex: SERVICES.length - index }}
                aria-labelledby={`service-${service.id}-title`}
              >
                <div className="service-stack-copy">
                  <p className="service-stack-number">{service.num}</p>
                  <p className="service-stack-label">{service.label}</p>
                  <h3 id={`service-${service.id}-title`} className="service-stack-title">
                    {service.name}
                  </h3>
                  <p className="service-stack-description">{service.description}</p>
                </div>

                <div className="service-stack-image-wrap" aria-hidden="true">
                  <Image
                    src={service.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 767px) calc(100vw - 52px), 408px"
                    className="service-stack-image"
                    style={{ objectPosition: service.imagePosition }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
