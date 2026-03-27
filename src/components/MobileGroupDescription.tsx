"use client";

import { useState } from "react";
import { motion } from "motion/react";

const TRUNCATE_LENGTH = 45;

const MobileGroupDescription = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const [settled, setSettled] = useState(true);

  const handleToggle = () => {
    setSettled(false);
    setExpanded((prev) => !prev);
  };

  const isCollapsed = !expanded && settled;
  const truncated = text.slice(0, TRUNCATE_LENGTH).trimEnd() + "...";

  return (
    <div className="text-[#FFFFFFA3] font-[Google_Sans_Flex] leading-tight">
      <motion.div
        animate={{ height: expanded ? "auto" : "1.25rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onAnimationComplete={() => setSettled(true)}
        className="overflow-hidden"
      >
        <pre className="whitespace-pre-line font-[Google_Sans_Flex]">
          {isCollapsed ? truncated : text}
          {isCollapsed && (
            <button
              onClick={handleToggle}
              className="text-[#FFFFFF66] underline cursor-pointer ml-1"
            >
              {" "}
              read more
            </button>
          )}
        </pre>
      </motion.div>

      {expanded && (
        <button
          onClick={handleToggle}
          className="mt-1.5 text-[#FFFFFF66] underline cursor-pointer"
        >
          hide
        </button>
      )}
    </div>
  );
};

export default MobileGroupDescription;
