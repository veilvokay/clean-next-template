'use client';

import { useContext, useRef } from 'react';
import { Breakpoints, BreakpointType } from './appBreakpoints';
import { BreakpointContext, GemContext } from './context';

export const useGem = () => {
    const value = useContext(GemContext);
    return value;
};

export const useGemRef = () => {
    const value = useGem();
    const ref = useRef(value);
    ref.current = value;
    return ref;
};

export const useBreakpoint = () => {
    // hook up the context to catch its changes
    useContext(BreakpointContext);
    return Breakpoints.Current.breakpoint;
};

export const useBreakpointType = () => {
    const breakpoint = useBreakpoint();
    return {
        isMobile: breakpoint?.id === Breakpoints.All.Mobile.id,
        isTablet: breakpoint?.id === Breakpoints.All.Tablet.id,
        isDesktop: breakpoint?.id === Breakpoints.All.Desktop.id,
        type: breakpoint?.name as BreakpointType,
    };
};

export const useWindowSize = () => {
    useGem();
    return {
        width: Breakpoints.Current.width,
        height: Breakpoints.Current.height,
    };
};

export const useAspectRatio = () => {
    const { width, height } = useWindowSize();
    return width / height;
};

export const useIsPortrait = () => {
    const { width, height } = useWindowSize();
    return width < height;
};
