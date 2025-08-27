// Note: formatDate, formatNumber, truncateText, isValidEmail, and checkPasswordStrength
// were removed as they are not used anywhere in the codebase.
// formatDate functionality is available in utils/jobUtils.ts and utils/i18nUtils.ts

// 로컬 스토리지 유틸리티
export const storage = {
  get: (key: string): unknown => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error reading from localStorage:', error);
      }
      return null;
    }
  },
  
  set: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error writing to localStorage:', error);
      }
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error removing from localStorage:', error);
      }
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error clearing localStorage:', error);
      }
    }
  },
};

// 파일 관련 유틸리티 export
export * from './fileUtils';
