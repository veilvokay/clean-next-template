"use client";

import {
  BreakpointData as BreakpointBaseData,
  BreakpointsManager,
  ICurrentBreakpointInfo,
} from "@zajno/common-web/breakpoints";
import { Event } from "@zajno/common/observing/event";

// TODO define & register additional breakpoints for your app

export enum BreakpointType {
  Desktop = "Desktop",
  Tablet = "Tablet",
  Mobile = "Mobile",
}

export enum BreakpointRules {
  Desktop = "(min-width: 1025px)",
  Tablet = "(min-width: 481px) and (max-width: 1024px)",
  MobileAndTablet = "(max-width: 1024px)",
  Mobile = "(max-width: 480px)",
}

type BreakpointData = BreakpointBaseData<BreakpointType>;

export const AppMediaQueries = {
  [BreakpointType.Desktop]: BreakpointRules.Desktop,
  [BreakpointType.Tablet]: BreakpointRules.Tablet,
  [BreakpointType.Mobile]: BreakpointRules.Mobile,
};

const AppBreakpoints: Record<BreakpointType, BreakpointData> = {
  Desktop: {
    id: 3,
    name: BreakpointType.Desktop,
    width: 1440,
    height: 0,
    mediaQuery: AppMediaQueries.Desktop,
  },
  Tablet: {
    id: 2,
    name: BreakpointType.Tablet,
    width: 768,
    height: 0,
    mediaQuery: AppMediaQueries.Tablet,
  },
  Mobile: {
    id: 1,
    name: BreakpointType.Mobile,
    width: 375,
    height: 0,
    mediaQuery: AppMediaQueries.Mobile,
  },
};

const Manager = new BreakpointsManager<BreakpointType>();

Manager.registerBreakpoint(AppBreakpoints.Desktop);
Manager.registerBreakpoint(AppBreakpoints.Tablet);
Manager.registerBreakpoint(AppBreakpoints.Mobile);

const resizeEvent = new Event<{ width: number; height: number }>();

const resize = () => {
  if (typeof window === "undefined" || !document.body) {
    return;
  }

  const width = document.body.clientWidth;
  const height = window.innerHeight;

  Manager.resize(width, height);
  resizeEvent.trigger({ width, height });
};

// Only initialize on client side
let isInitialized = false;

const initializeBreakpoints = () => {
  if (typeof window === "undefined" || isInitialized) {
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      resize();
      isInitialized = true;
    });
  } else {
    resize();
    isInitialized = true;
  }

  window.addEventListener("resize", resize);
};

// Initialize when module is loaded on client side
if (typeof window !== "undefined") {
  initializeBreakpoints();
}

// that's just a wrapper for core Breakpoints, nothing else should be added here
export const Breakpoints = {
  get All(): Readonly<typeof AppBreakpoints> {
    return AppBreakpoints;
  },

  get resizeEvent() {
    return resizeEvent.expose();
  },

  get Current(): ICurrentBreakpointInfo {
    // Ensure initialization on client side
    if (typeof window !== "undefined" && !isInitialized) {
      initializeBreakpoints();
    }
    return Manager;
  },

  resize(width: number, height: number) {
    if (typeof window === "undefined") return;
    return Manager.resize(width, height);
  },

  isActive(...breakpointsIds: number[]) {
    try {
      if (typeof window === "undefined") return false;
      return breakpointsIds.includes(Manager.breakpoint.id);
    } catch {
      return false;
    }
  },

  get isDesktop() {
    try {
      if (typeof window === "undefined") return false;
      return Manager.breakpoint.name === BreakpointType.Desktop;
    } catch {
      return false;
    }
  },
  get isTablet() {
    try {
      if (typeof window === "undefined") return false;
      return Manager.breakpoint.name === BreakpointType.Tablet;
    } catch {
      return false;
    }
  },
  get isMobile() {
    try {
      if (typeof window === "undefined") return false;
      return Manager.breakpoint.name === BreakpointType.Mobile;
    } catch {
      return false;
    }
  },
};
