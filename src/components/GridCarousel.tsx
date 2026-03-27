"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { MobileCarouselCard } from "./MobileCarouselCard";
import { DesktopCarouselCard } from "./DesktopCarouselCard";
import { ViewModeButton } from "./ViewModeButton";
import { cn } from "@/lib/utils/cn";
import { Club } from "@/types/Club";
import { Target } from "@/types/DialogModal";

interface GridCarouselProps {
  data: Club[];
}

export function GridCarousel({ data }: GridCarouselProps) {
  const isMobile = useIsMobile();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Track cursor so we can replay its position when scrolling stops
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Drag-to-scroll on desktop */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || isMobile) return;
    let isDown = false,
      startX = 0,
      scrollLeft = 0;
    const onDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onUp = () => {
      isDown = false;
      el.style.cursor = "grab";
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      setIsScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
        requestAnimationFrame(() => {
          const { x, y } = lastMousePos.current;
          let target: Element | null = document.elementFromPoint(x, y);
          while (target && target !== document.documentElement) {
            target.dispatchEvent(
              new PointerEvent("pointerenter", {
                bubbles: false,
                cancelable: false,
                clientX: x,
                clientY: y,
                pointerId: 1,
                isPrimary: true,
              }),
            );
            target = target.parentElement;
          }
        });
      }, 200);
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
    };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="min-h-screen text-white antialiased relative">
        <div className="relative z-[1]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ padding: "20px 20px 24px" }}
          >
            <h1 className="text-2xl font-normal mb-2 leading-[1.05] tracking-[-1px]">
              Find Your Tribe
            </h1>
            <p className="text-sm text-white/80 m-0 font-normal">
              Chance Country Club
            </p>
          </motion.div>

          <div className="flex flex-col gap-[14px] px-4 pb-[100px]">
            {data.map((club, index) => (
              <MobileCarouselCard
                key={index}
                index={index}
                club={club}
                target={Target.JOIN}
              />
            ))}
            <MobileCarouselCard
              index={data.length}
              title="Request to Form a Tribe"
              image="/images/heritage/form-a-tribe-square.jpg"
              target={Target.FORM}
            />
          </div>
        </div>

        <ViewModeButton href="/scroll">← Carousel</ViewModeButton>
      </div>
    );
  }

  return (
    <div className="h-screen text-white antialiased relative overflow-hidden">
      <div className="relative z-[1] h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "max(60px, 4vw)",
            left: "4vw",
            zIndex: 10,
          }}
        >
          <img
            src="/images/country-club-logo.png"
            alt="Country Club"
            className={cn("w-[12rem] h-auto")}
          />
          <div
            className={cn(
              "text-[#f5f5f5] text-base text-center font-normal lowercase italic mt-2",
            )}
          >
            Find Your Tribe
          </div>
        </motion.div>

        <div
          ref={trackRef}
          className="flex flex-row gap-5 px-8 pb-12 overflow-x-auto overflow-y-visible flex-1 items-start cursor-grab [scrollbar-width:none] pt-[calc(max(60px,4vw)+128px+48px)]"
        >
          {data.map((club, index) => (
            <DesktopCarouselCard
              key={index}
              index={index}
              isScrolling={isScrolling}
              club={club}
              title={club.name}
              description={club.description}
              image={club.cardImage}
              target={Target.JOIN}
            />
          ))}
          <DesktopCarouselCard
            index={data.length}
            isScrolling={isScrolling}
            title="Request to Form a Tribe"
            description=""
            image="/images/heritage/form-a-tribe-square.jpg"
            target={Target.FORM}
          />
        </div>
      </div>

      <ViewModeButton href="/scroll">← Go to carousel view</ViewModeButton>
    </div>
  );
}
