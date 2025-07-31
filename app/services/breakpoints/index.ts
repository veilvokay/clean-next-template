'use client';

import type { BreakpointType } from './appBreakpoints';

export { Breakpoints, BreakpointType } from './appBreakpoints';
export { BreakpointsContextProvider } from './context';
export { useGem, useBreakpoint, useBreakpointType } from './hooks';

export type CSSPropertiesMap = Record<BreakpointType, React.CSSProperties>;
