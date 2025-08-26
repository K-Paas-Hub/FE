// 반응형 브레이크포인트 시스템
export const breakpoints = {
  // Breakpoint values
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
  ultraWide: '1400px',
} as const;

// Media query helpers
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  wide: `@media (max-width: ${breakpoints.wide})`,
  ultraWide: `@media (max-width: ${breakpoints.ultraWide})`,
  
  // Min-width queries
  minMobile: `@media (min-width: ${breakpoints.mobile})`,
  minTablet: `@media (min-width: ${breakpoints.tablet})`,
  minDesktop: `@media (min-width: ${breakpoints.desktop})`,
  minWide: `@media (min-width: ${breakpoints.wide})`,
  minUltraWide: `@media (min-width: ${breakpoints.ultraWide})`,
  
  // Between queries
  betweenMobileTablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
  betweenTabletDesktop: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  betweenDesktopWide: `@media (min-width: ${breakpoints.desktop}) and (max-width: ${breakpoints.wide})`,
} as const;

// Container max-widths for different screens
export const containers = {
  mobile: '100%',
  tablet: '720px',
  desktop: '960px',
  wide: '1200px',
  ultraWide: '1400px',
} as const;

export type Breakpoints = typeof breakpoints;
export type Media = typeof media;
export type Containers = typeof containers;