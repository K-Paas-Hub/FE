// 색상 테마 시스템
export const colors = {
  // Primary Colors
  primary: '#4ade80',
  primaryHover: '#22c55e',
  primaryLight: '#dcfce7',
  primaryDark: '#059669',
  
  // Secondary Colors
  secondary: '#7c3aed',
  secondaryHover: '#6d28d9',
  
  // Background Colors
  background: '#1a1a1a',
  backgroundGradient: '#1b2d1a',
  backgroundLight: '#ffffff',
  backgroundGray: '#f8f9fa',
  
  // Text Colors
  text: '#ffffff',
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textLight: '#cccccc',
  textMuted: '#9ca3af',
  
  // Border Colors
  border: 'rgba(255, 255, 255, 0.1)',
  borderLight: '#e5e5e5',
  borderFocus: '#4ade80',
  
  // Status Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Utility Colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  
  // Component Specific Colors
  modal: {
    overlay: 'rgba(0, 0, 0, 0.5)',
    background: '#ffffff',
  },
  
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(255, 255, 255, 0.1)',
  },
  
  button: {
    disabled: '#9ca3af',
    disabledText: '#6b7280',
  },
} as const;

export type Colors = typeof colors;