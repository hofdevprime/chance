"use client";

import { motion } from "motion/react";
import type { CardItem } from "@/types/CardItem";
import { useClubFormDialog } from "@/context/ClubFormDialogContext";
import { useGroupPreview } from "@/context/GroupPreviewContext";
import { Target } from "@/types/DialogModal";
import { Club } from "@/types/Club";

interface DesktopCarouselCardProps extends CardItem {
  index: number;
  isScrolling: boolean;
  club?: Club;
}

export function DesktopCarouselCard({
  index,
  title,
  description,
  image,
  target,
  isScrolling,
  club,
}: DesktopCarouselCardProps) {
  const { setOpen, setTarget } = useClubFormDialog();
  const { setOpen: setOpenPreview, setClub } = useGroupPreview();

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
      whileHover={
        isScrolling ? {} : { y: -6, zIndex: 2, transition: { duration: 0.2 } }
      }
      style={{
        flex: "0 0 auto",
        width: 300,
        height: 520,
        overflow: "hidden",
        background: "#0d1b2e",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        willChange: "transform",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 300,
          position: "relative",
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          padding: "16px 16px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
          userSelect: "none",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: 400,
            color: "#fff",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "11px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.45,
            userSelect: "none",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>
        <button
          style={{
            marginTop: "auto",
            width: "100%",
            padding: "10px 0",
            border: "none",
            background: "linear-gradient(90deg, #38bdf8 0%, #7c3aed 100%)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.3px",
            clipPath:
              "polygon(14px 0%, 100% 0%, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%, 0% 14px)",
          }}
          onClick={() => {
            if (club) {
              setClub(club);
              setOpenPreview(true);
            } else {
              setOpen(true);
              setTarget(target);
            }
          }}
        >
          {target === Target.JOIN ? "Join group" : "Request tribe"}
        </button>
      </div>
    </motion.div>
  );
}
