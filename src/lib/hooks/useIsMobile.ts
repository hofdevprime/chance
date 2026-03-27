"use client";

import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint: number = 768) => {
  const [m, setM] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const fn = () => setM(window.innerWidth < breakpoint);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return m;
};
