"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Slide } from "@/types/Slide";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

// -------------------------------------------------------------------
// Sub-components
// -------------------------------------------------------------------

interface StepIndicatorsProps {
  total: number;
  current: number;
  duration: number;
}

const StepIndicators = ({ total, current, duration }: StepIndicatorsProps) => (
  <div className="flex w-full gap-1 px-3 pt-3">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-[#FFFFFF33]"
      >
        {i < current && <div className="absolute inset-0 bg-white" />}
        {i === current && (
          <div
            key={current}
            className="absolute inset-y-0 left-0 bg-white"
            style={{
              animation: `progress ${duration}ms linear forwards`,
            }}
          />
        )}
      </div>
    ))}
  </div>
);

interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  hidden: boolean;
}

const NavButton = ({ direction, onClick, hidden }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#00000066] p-1.5 text-white transition-opacity cursor-pointer hover:bg-[#000000AA]",
      direction === "prev" ? "left-3" : "right-3",
      hidden && "pointer-events-none opacity-0",
    )}
  >
    {direction === "prev" ? (
      <ChevronLeft size={18} />
    ) : (
      <ChevronRight size={18} />
    )}
  </button>
);

// -------------------------------------------------------------------
// Main component
// -------------------------------------------------------------------

interface LoreGalleryProps {
  slides: Slide[];
  duration?: number;
}

const LoreGallery = ({ slides, duration = 5000 }: LoreGalleryProps) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile(1024);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, duration);
  }, [duration, slides.length]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [current, startTimer]);

  const goTo = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
  };

  const handlePrev = () => goTo(current - 1);
  const handleNext = () => goTo(current + 1);

  return (
    // Background
    <div
      className={cn([
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-[#151419] rounded-lg",
        isMobile && "aspect-[9/16]",
      ])}
    >
      {/* Container */}
      <div
        className={cn(
          "relative z-10 flex h-full max-h-full w-full flex-col",
          !isMobile && "max-w-[405px]",
        )}
      >
        {/* Controls — step indicators */}
        <div className="absolute inset-x-0 top-0 z-20">
          <StepIndicators
            total={slides.length}
            current={current}
            duration={duration}
          />
        </div>

        {/* Slide */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={slides[current].imageSrc}
            alt={`Slide ${current + 1}`}
            className="object-cover"
          />

          {/* Controls — nav buttons */}
          <NavButton
            direction="prev"
            onClick={handlePrev}
            hidden={slides.length <= 1}
          />
          <NavButton
            direction="next"
            onClick={handleNext}
            hidden={slides.length <= 1}
          />
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
};

export default LoreGallery;
