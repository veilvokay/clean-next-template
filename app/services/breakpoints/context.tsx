"use client";

import React, { useEffect, useState } from "react";
import { Breakpoints } from "./appBreakpoints";

const updateRem = () => {
  if (typeof window === "undefined" || !document.body) {
    return 16; // Default rem value for SSR
  }

  const width = document.body.clientWidth;
  const height = window.innerHeight;

  Breakpoints.resize(width, height);

  try {
    return Breakpoints.Current.rem;
  } catch {
    return 16; // Default rem value if breakpoint not set
  }
};

// Only initialize on client side
if (typeof window !== "undefined") {
  updateRem();
}

export const GemContext = React.createContext(16); // Default rem value for SSR
export const BreakpointContext = React.createContext<number | null>(null);

export const BreakpointsContextProvider = (props: React.PropsWithChildren) => {
  const [rem, setRem] = useState(() => {
    if (typeof window === "undefined") {
      return 16; // Default for SSR
    }
    return updateRem();
  });

  const [breakpointId, setBreakpointId] = useState<number | null>(() => {
    if (typeof window === "undefined") {
      return null; // Default for SSR
    }
    try {
      updateRem();
      return Breakpoints.Current.breakpoint?.id || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const doResize = () => {
      const newRem = updateRem();
      setRem(newRem);

      try {
        setBreakpointId(Breakpoints.Current.breakpoint?.id || null);
      } catch {
        setBreakpointId(null);
      }
    };

    doResize();
    window.addEventListener("resize", doResize);
    return () => window.removeEventListener("resize", doResize);
  }, []);

  return (
    <BreakpointContext.Provider value={breakpointId}>
      <GemContext.Provider value={rem}>{props.children}</GemContext.Provider>
    </BreakpointContext.Provider>
  );
};
