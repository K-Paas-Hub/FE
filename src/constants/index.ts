// 색상 상수
export const COLORS = {
  primary: '#4ade80',
  primaryHover: '#22c55e',
  background: '#1a1a1a',
  backgroundGradient: '#1b2d1a',
  text: '#ffffff',
  textSecondary: '#cccccc',
  border: 'rgba(255, 255, 255, 0.1)',
} as const;

// 애니메이션 상수
export const ANIMATIONS = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// 브레이크포인트 상수
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
} as const;

// API 엔드포인트 상수
export const API_ENDPOINTS = {
  base: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  auth: '/auth',
  users: '/users',
  jobs: '/jobs',
  companies: '/companies',
  visa: '/visa',
} as const;
