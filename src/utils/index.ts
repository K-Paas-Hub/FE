// 날짜 포맷팅 유틸리티
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// 숫자 포맷팅 유틸리티
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ko-KR').format(num);
};

// 문자열 길이 제한 유틸리티
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// 이메일 유효성 검사 유틸리티
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 강도 검사 유틸리티
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string;
} => {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score += 1;
  else feedback.push('비밀번호는 최소 8자 이상이어야 합니다.');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('소문자를 포함해야 합니다.');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('대문자를 포함해야 합니다.');

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('숫자를 포함해야 합니다.');

  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push('특수문자를 포함해야 합니다.');

  return {
    score,
    feedback: feedback.join(' '),
  };
};

// 로컬 스토리지 유틸리티
export const storage = {
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// 파일 관련 유틸리티 export
export * from './fileUtils';
