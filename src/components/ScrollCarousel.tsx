"use client";

import { motion, useMotionValue, useSpring, useVelocity } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CarouselPlane } from "./CarouselPlane";
import { ViewModeButton } from "./ViewModeButton";
import { cn } from "@/lib/utils/cn";
import { useClubFormDialog } from "@/context/ClubFormDialogContext";
import { Target } from "@/types/DialogModal";
import { useGroupPreview } from "@/context/GroupPreviewContext";
import { Club } from "@/types/Club";
import { PlaneItem } from "@/types/PlaneItem";

interface ScrollCarouselProps {
  data: Club[];
}

export function ScrollCarousel({ data }: ScrollCarouselProps) {
  const { setOpen: setFormOpen, setTarget } = useClubFormDialog();
  const { setOpen: setPreviewOpen, setClub } = useGroupPreview();

  const planes: PlaneItem[] = [
    ...data.map(
      (club, index): PlaneItem => ({
        index,
        title: club.name,
        text: club.previewText,
        image: club.previewImage,
        targetModal: Target.JOIN,
      }),
    ),
    {
      index: -1,
      title: "Form a Tribe",
      text: "Request to form a tribe.",
      image: "/images/heritage/form-a-tribe.jpg",
      targetModal: Target.FORM,
      isFormTribe: true,
    },
  ];

  const rawScrollX = useMotionValue(0);
  const scrollX = useSpring(rawScrollX, {
    stiffness: 100,
    damping: 40,
    mass: 0.75,
  });
  const scrollVelocity = useVelocity(scrollX);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalPlanes = planes.length * 2;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      rawScrollX.set(rawScrollX.get() - delta);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [rawScrollX]);

  return (
    <>
      <motion.div
        ref={containerRef}
        className={cn(
          "carousel-container",
          "w-screen h-screen overflow-hidden touch-none",
        )}
        onPan={(_, info) => {
          rawScrollX.set(rawScrollX.get() + info.delta.x * 2.5);
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn("absolute top-[max(60px,4vw)] left-[4vw] z-10")}
        >
          <img
            src="/images/country-club-logo.png"
            alt="Country Club"
            className={cn("w-[12rem] h-auto")}
          />
          <div
            className={cn(
              "gradient-text text-2xl leading-[1.1] text-center font-normal lowercase w-fit mt-6 mx-auto",
            )}
          >
            Find Your Tribe
          </div>
        </motion.div>

        <motion.div
          className={cn(
            "carousel-viewport",
            "relative w-full h-full flex items-center justify-center perspective-[2000px] [perspective-origin:10%_10%]",
          )}
        >
          <div
            className={cn(
              "carousel-planes",
              "relative flex items-center justify-center [transform-style:preserve-3d] translate-y-[100px]",
            )}
          >
            {[...planes, ...planes].map((item, i) => (
              <CarouselPlane
                key={i}
                totalPlanes={totalPlanes}
                scrollX={scrollX}
                scrollVelocity={scrollVelocity}
                isHovered={hoveredIndex === i}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => {
                  if (item.targetModal === Target.FORM) {
                    setFormOpen(true);
                    setTarget(Target.FORM);
                    return;
                  }

                  setClub(data[item.index]);
                  setPreviewOpen(true);
                }}
                {...item}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
      <ViewModeButton href="/grid">← Go to grid view</ViewModeButton>
    </>
  );
}
