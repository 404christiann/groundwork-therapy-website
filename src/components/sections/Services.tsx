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
    const media = gsap.matchMedia();
    media.add({
      compact: "(max-width: 767px)",
      desktop: "(min-width: 768px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
      shortScreen: "(max-height: 599px)",
    }, (context) => {
      const section = sectionRef.current!;
      const stage = section.querySelector<HTMLElement>(".service-stack-stage")!;
      const cards = Array.from(section.querySelectorAll<HTMLElement>(".service-stack-card"));
      const heading = sectionRef.current?.querySelector<HTMLElement>(
        ".service-stack-heading",
      );
      const { compact: isCompact, reducedMotion, shortScreen } = context.conditions!;

      if (reducedMotion || shortScreen) {
        section.dataset.stackFlow = "true";
        gsap.set(cards, { clearProps: "transform,opacity,visibility,filter" });
        if (heading) {
          gsap.set(heading, { clearProps: "transform,opacity,visibility" });
        }
        return () => {
          delete section.dataset.stackFlow;
        };
      }

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
            // Finished cards must stop painting, including after anchor jumps
            // and refreshes where the stage may already be above the viewport.
            if (leaving >= 1) {
              gsap.set(card, { opacity: 0, visibility: "hidden" });
              return;
            }
            const completedScale = 1.12 + index * 0.008;

            gsap.set(card, {
              yPercent: 0,
              y: -Math.max(0, stageBottom) * leaving,
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

      let trigger: ScrollTrigger | undefined;
      let frame = 0;
      let lastLayout = "";
      const content = cards.map((card) =>
        card.querySelector<HTMLElement>(".service-stack-content")!,
      );
      const verticalPadding = (element: HTMLElement) => {
        const style = getComputedStyle(element);
        return parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      };

      const updateLayout = () => {
        frame = 0;
        const wasFlow = section.dataset.stackFlow === "true";
        // Measure the pinned layout before deciding whether its full contents
        // fit. Restore the final mode synchronously, before the browser paints.
        delete section.dataset.stackFlow;
        const stageHeight = stage.clientHeight;
        const requiredHeights = content.map((text, index) => {
          const card = cards[index];
          const copy = text.parentElement!;
          const image = card.querySelector<HTMLElement>(".service-stack-image-wrap")!;
          return text.offsetHeight + verticalPadding(copy) + verticalPadding(card)
            + (isCompact ? parseFloat(getComputedStyle(image).minHeight) : 0);
        });
        const needsFlow = requiredHeights.some((height) => height > stageHeight);
        if (needsFlow) section.dataset.stackFlow = "true";

        const trackTop = Math.round(trackRef.current!.getBoundingClientRect().top + window.scrollY);
        const layout = [
          stage.clientWidth, stageHeight, window.innerHeight, trackTop,
          ...requiredHeights, needsFlow,
        ].join(":");
        if (layout === lastLayout) return;
        lastLayout = layout;

        if (needsFlow) {
          trigger?.kill();
          trigger = undefined;
          gsap.set(cards, { clearProps: "transform,opacity,visibility,filter" });
          if (heading) gsap.set(heading, { clearProps: "transform,opacity,visibility" });
        } else if (!trigger) {
          trigger = ScrollTrigger.create({
            trigger: trackRef.current,
            start: isCompact ? "top top+=88" : "top top+=112",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            onRefresh: (self) => renderStack(self.progress),
            onUpdate: (self) => renderStack(self.progress),
          });
          renderStack(trigger.progress);
        } else {
          trigger.refresh();
        }
        if (wasFlow !== needsFlow) ScrollTrigger.refresh();
      };

      const scheduleLayout = () => {
        if (!frame) frame = window.requestAnimationFrame(updateLayout);
      };
      const observer = new ResizeObserver(scheduleLayout);
      observer.observe(stage);
      // Accordions and late-loading content above can move the track without
      // changing the cards themselves. Keep its scroll boundaries current.
      observer.observe(section.closest("main") ?? document.body);
      content.forEach((text) => observer.observe(text));
      window.addEventListener("resize", scheduleLayout, { passive: true });
      updateLayout();

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", scheduleLayout);
        if (frame) window.cancelAnimationFrame(frame);
        trigger?.kill();
        delete section.dataset.stackFlow;
      };
    }, sectionRef);

    return () => media.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="services-stack-section">
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
                  <div className="service-stack-content">
                    <p className="service-stack-number">{service.num}</p>
                    <p className="service-stack-label">{service.label}</p>
                    <h3 id={`service-${service.id}-title`} className="service-stack-title">
                      {service.name}
                    </h3>
                    <p className="service-stack-description">{service.description}</p>
                  </div>
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
