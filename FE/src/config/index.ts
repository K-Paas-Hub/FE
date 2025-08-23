// 환경 설정
export const CONFIG = {
  // 개발 환경 설정
  development: {
    apiUrl: 'http://localhost:3001',
    environment: 'development',
    debug: true,
  },
  
  // 프로덕션 환경 설정
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://api.recruitplatform.com',
    environment: 'production',
    debug: false,
  },
  
  // 공통 설정
  common: {
    appName: 'Recruit Platform',
    version: '1.0.0',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    supportedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
    pagination: {
      defaultPageSize: 10,
      maxPageSize: 100,
    },
  },
} as const;

// 현재 환경에 따른 설정 반환
export const getConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return {
    ...CONFIG.common,
    ...(isDevelopment ? CONFIG.development : CONFIG.production),
  };
};
