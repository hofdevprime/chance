"use client";

import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
  useMotionValueEvent,
  wrap,
} from "motion/react";
import { useEffect } from "react";
import type { MotionValue } from "motion/react";
import { PlaneItem } from "@/types/PlaneItem";
import { cn } from "@/lib/utils/cn";

const PLANE_WIDTH = 320;
const PLANE_GAP = -80;

interface CarouselPlaneProps extends PlaneItem {
  index: number;
  totalPlanes: number;
  scrollX: MotionValue<number>;
  scrollVelocity: MotionValue<number>;
  isHovered: boolean;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function CarouselPlane({
  title,
  text,
  image,
  index,
  totalPlanes,
  scrollX,
  scrollVelocity,
  isHovered,
  onClick,
  onHoverStart,
  onHoverEnd,
  isFormTribe,
}: CarouselPlaneProps) {
  const hoverOffset = useSpring(0, { stiffness: 400, damping: 25 });
  const planeWidth = PLANE_WIDTH + PLANE_GAP;
  const totalWidth = planeWidth * totalPlanes;
  const startPosition = index * planeWidth;

  const waveOffset = useSpring(0, { stiffness: 300, damping: 20, mass: 0.3 });

  useMotionValueEvent(scrollVelocity, "change", (velocity) => {
    const scroll = scrollX.get();
    const pos = startPosition + scroll;
    const centered = wrap(-totalWidth / 2, totalWidth / 2, pos);

    const normalizedPos = centered / (totalWidth / 2);
    const wavePhase = Math.sin(normalizedPos * Math.PI * 2);
    const waveAmount = (velocity / 50) * wavePhase * 5;

    waveOffset.set(waveAmount);
  });

  useEffect(() => {
    hoverOffset.set(isHovered ? -30 : 0);
  }, [isHovered, hoverOffset]);

  const transform = useTransform(() => {
    const scroll = scrollX.get();
    const wave = waveOffset.get();
    const hover = hoverOffset.get();

    const pos = startPosition + scroll;
    const centered = wrap(-totalWidth / 2, totalWidth / 2, pos);

    const yOffset = centered * -0.35 + wave + hover;
    const zOffset = centered * -1.2;

    return `translate3d(${centered}px, ${yOffset}px, ${zOffset}px) rotateY(-50deg)`;
  });

  return (
    <motion.div
      className={cn(
        "plane",
        "w-[320px] h-[384px] flex items-center justify-center text-[#f5f5f5] text-[48px] font-bold shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] absolute [transform-style:preserve-3d] transition-[filter] duration-200 ease-in-out",
      )}
      style={{
        transform,
        zIndex: isHovered ? 100 : 1,
        filter: isHovered ? "brightness(1.15)" : "brightness(1)",
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
    >
      <div
        className={cn(
          "plane-image-container",
          "absolute inset-0 overflow-hidden rounded-2xl",
        )}
      >
        <img
          src={image}
          alt={title}
          className={cn("plane-image", "w-full h-full object-cover")}
          draggable={false}
        />
      </div>

      <div
        className={cn(
          "plane-title",
          "absolute font-sans text-[#f5f5f5] left-0 text-[18px] font-normal tracking-[0.05em]",
          !isFormTribe && "-top-8",
          isFormTribe && "gradient-pill px-2 py-1 rounded-md -top-12",
        )}
      >
        {title}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={cn(
              "label-container",
              "absolute flex items-center pointer-events-none left-full top-1/2 ml-3",
              "before:content-[''] before:absolute before:inset-[-20px_-40px] before:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_75%)] before:blur-[20px] before:[-z-index:1]",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className={cn(
                "label-line",
                "w-[120px] h-px bg-[#f5f5f5] origin-left",
              )}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div
              className={cn(
                "label-text",
                "px-2 py-1 w-40 font-display bg-transparent text-[#f5f5f5] text-sm font-normal tracking-[0.05em]",
              )}
            >
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
