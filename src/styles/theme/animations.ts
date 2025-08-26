// 애니메이션 시스템
export const animations = {
  // Duration
  duration: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.6s',
    slower: '0.8s',
  },
  
  // Easing
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    easeInQuart: 'cubic-bezier(0.5, 0, 0.75, 0)',
    easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
    easeInOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  },
  
  // Common animations
  fadeIn: `
    opacity: 0;
    animation: fadeIn 0.3s ease-in-out forwards;
    
    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }
  `,
  
  slideUp: `
    transform: translateY(20px);
    opacity: 0;
    animation: slideUp 0.3s ease-out forwards;
    
    @keyframes slideUp {
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  
  slideDown: `
    transform: translateY(-10px);
    opacity: 0;
    animation: slideDown 0.3s ease-out forwards;
    
    @keyframes slideDown {
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  
  spin: `
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
  
  // Hover effects
  hover: {
    lift: 'transform: translateY(-2px);',
    scale: 'transform: scale(1.05);',
    glow: 'box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);',
  },
} as const;

export type Animations = typeof animations;