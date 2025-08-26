import { colors } from './colors';
import { animations } from './animations';
import { breakpoints, media, containers } from './breakpoints';

// 통합 테마 객체
export const theme = {
  colors,
  animations,
  breakpoints,
  media,
  containers,
  
  // Typography
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace',
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '4rem',      // 64px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    glow: '0 0 20px rgba(74, 222, 128, 0.3)',
  },
  
  // Border radius
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '50%',
  },
  
  // Z-index
  zIndex: {
    dropdown: 9999,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    tooltip: 1070,
  },
} as const;

export type Theme = typeof theme;

// Legacy exports for backward compatibility
export const COLORS = colors;
export const ANIMATIONS = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
  },
  easing: animations.easing,
};
export const BREAKPOINTS = breakpoints;