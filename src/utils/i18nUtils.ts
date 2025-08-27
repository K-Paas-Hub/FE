import { TFunction } from 'i18next';

// 언어 코드와 로케일 매핑
export const LOCALE_MAPPING: Record<string, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  vi: 'vi-VN',
  km: 'km-KH',
  ne: 'ne-NP',
  id: 'id-ID',
  zh: 'zh-CN',
  th: 'th-TH',
};

// RTL 언어 목록
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

// 언어 방향 감지
export const getLanguageDirection = (locale: string): 'ltr' | 'rtl' => {
  return RTL_LANGUAGES.includes(locale) ? 'rtl' : 'ltr';
};

// 로케일 코드 변환
export const getLocaleCode = (languageCode: string): string => {
  return LOCALE_MAPPING[languageCode] || 'ko-KR';
};

// 로케일별 날짜 포맷팅
export const formatDate = (
  date: Date | string | number,
  locale: string = 'ko',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const d = new Date(date);
  const localeCode = getLocaleCode(locale);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  try {
    return d.toLocaleDateString(localeCode, { ...defaultOptions, ...options });
  } catch (error) {
    // fallback to Korean if locale is not supported
    console.warn(`Locale ${localeCode} not supported, falling back to ko-KR`);
    return d.toLocaleDateString('ko-KR', { ...defaultOptions, ...options });
  }
};

// 로케일별 시간 포맷팅
export const formatTime = (
  date: Date | string | number,
  locale: string = 'ko',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const d = new Date(date);
  const localeCode = getLocaleCode(locale);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  try {
    return d.toLocaleTimeString(localeCode, { ...defaultOptions, ...options });
  } catch (error) {
    console.warn(`Locale ${localeCode} not supported, falling back to ko-KR`);
    return d.toLocaleTimeString('ko-KR', { ...defaultOptions, ...options });
  }
};

// 로케일별 날짜시간 포맷팅
export const formatDateTime = (
  date: Date | string | number,
  locale: string = 'ko',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const d = new Date(date);
  const localeCode = getLocaleCode(locale);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  try {
    return d.toLocaleString(localeCode, { ...defaultOptions, ...options });
  } catch (error) {
    console.warn(`Locale ${localeCode} not supported, falling back to ko-KR`);
    return d.toLocaleString('ko-KR', { ...defaultOptions, ...options });
  }
};

// 로케일별 숫자 포맷팅
export const formatNumber = (
  num: number,
  locale: string = 'ko',
  options: Intl.NumberFormatOptions = {}
): string => {
  const localeCode = getLocaleCode(locale);
  
  try {
    return new Intl.NumberFormat(localeCode, options).format(num);
  } catch (error) {
    console.warn(`Locale ${localeCode} not supported, falling back to ko-KR`);
    return new Intl.NumberFormat('ko-KR', options).format(num);
  }
};

// 로케일별 통화 포맷팅
export const formatCurrency = (
  amount: number,
  locale: string = 'ko',
  currency: string = 'KRW'
): string => {
  const localeCode = getLocaleCode(locale);
  
  try {
    return new Intl.NumberFormat(localeCode, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch (error) {
    console.warn(`Currency formatting failed for ${localeCode}, falling back to number format`);
    return formatNumber(amount, locale) + ` ${currency}`;
  }
};

// 로케일별 퍼센트 포맷팅
export const formatPercent = (
  value: number,
  locale: string = 'ko',
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2
): string => {
  const localeCode = getLocaleCode(locale);
  
  try {
    return new Intl.NumberFormat(localeCode, {
      style: 'percent',
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value);
  } catch (error) {
    console.warn(`Percent formatting failed for ${localeCode}`);
    return `${(value * 100).toFixed(maximumFractionDigits)}%`;
  }
};

// 상대 시간 포맷팅 (예: "3일 전", "2시간 후")
export const formatRelativeTime = (
  date: Date | string | number,
  locale: string = 'ko'
): string => {
  const targetDate = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
  const localeCode = getLocaleCode(locale);

  // Intl.RelativeTimeFormat이 지원되지 않는 경우 fallback
  if (typeof Intl.RelativeTimeFormat === 'undefined') {
    return formatDate(date, locale);
  }

  try {
    const rtf = new Intl.RelativeTimeFormat(localeCode, { numeric: 'auto' });

    const absSeconds = Math.abs(diffInSeconds);
    
    if (absSeconds < 60) {
      return rtf.format(diffInSeconds, 'second');
    } else if (absSeconds < 3600) {
      return rtf.format(Math.round(diffInSeconds / 60), 'minute');
    } else if (absSeconds < 86400) {
      return rtf.format(Math.round(diffInSeconds / 3600), 'hour');
    } else if (absSeconds < 2592000) {
      return rtf.format(Math.round(diffInSeconds / 86400), 'day');
    } else if (absSeconds < 31536000) {
      return rtf.format(Math.round(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(Math.round(diffInSeconds / 31536000), 'year');
    }
  } catch (error) {
    console.warn(`RelativeTime formatting failed for ${localeCode}, falling back to date format`);
    return formatDate(date, locale);
  }
};

// 파일 크기 포맷팅
export const formatFileSize = (
  bytes: number,
  locale: string = 'ko',
  decimals: number = 2
): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formatNumber(size, locale)} ${sizes[i]}`;
};

// 텍스트 방향성에 따른 CSS 클래스명 생성
export const getDirectionClass = (locale: string, baseClass: string = ''): string => {
  const direction = getLanguageDirection(locale);
  const dirClass = direction === 'rtl' ? 'rtl' : 'ltr';
  return baseClass ? `${baseClass} ${dirClass}` : dirClass;
};

// 로케일에 따른 정렬 함수
export const createLocaleSorter = (locale: string) => {
  const localeCode = getLocaleCode(locale);
  
  try {
    const collator = new Intl.Collator(localeCode, {
      sensitivity: 'base',
      numeric: true,
    });
    
    return (a: string, b: string) => collator.compare(a, b);
  } catch (error) {
    console.warn(`Collator not supported for ${localeCode}, using default sort`);
    return (a: string, b: string) => a.localeCompare(b);
  }
};

// 번역 함수와 함께 사용하는 날짜 포맷터
export const formatDateWithTranslation = (
  date: Date | string | number,
  t: TFunction,
  locale: string = 'ko'
): string => {
  const d = new Date(date);
  
  // 상대 시간으로 표시할지 결정 (7일 이내)
  const now = new Date();
  const diffInDays = Math.abs((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays <= 7) {
    return formatRelativeTime(date, locale);
  }
  
  return formatDate(date, locale);
};

// 다국어 지원 옵션 생성 헬퍼
export const createTranslatedOptions = <T extends { value: string; labelKey: string }>(
  options: T[],
  t: TFunction
): Array<{ value: string; label: string }> => {
  return options.map(option => ({
    value: option.value,
    label: t(option.labelKey, option.value), // fallback to value if translation missing
  }));
};

// 로케일별 입력 패턴 (전화번호, 우편번호 등)
export const getInputPatterns = (locale: string) => {
  const patterns: Record<string, Record<string, string>> = {
    ko: {
      phone: '^01[0-9]-?[0-9]{4}-?[0-9]{4}$',
      zipCode: '^[0-9]{5}$',
    },
    en: {
      phone: '^\\+?[1-9]\\d{1,14}$',
      zipCode: '^[0-9]{5}(-[0-9]{4})?$',
    },
    vi: {
      phone: '^(\\+84|84|0)([0-9]{9,10})$',
      zipCode: '^[0-9]{6}$',
    },
    // 다른 언어들도 추가 가능
  };

  return patterns[locale] || patterns.en;
};

// 기본 내보내기: 현재 언어 설정을 자동으로 사용하는 함수들
export const createI18nFormatters = (getCurrentLocale: () => string) => ({
  formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) =>
    formatDate(date, getCurrentLocale(), options),
  
  formatTime: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) =>
    formatTime(date, getCurrentLocale(), options),
    
  formatDateTime: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) =>
    formatDateTime(date, getCurrentLocale(), options),
    
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) =>
    formatNumber(num, getCurrentLocale(), options),
    
  formatCurrency: (amount: number, currency?: string) =>
    formatCurrency(amount, getCurrentLocale(), currency),
    
  formatPercent: (value: number, minDigits?: number, maxDigits?: number) =>
    formatPercent(value, getCurrentLocale(), minDigits, maxDigits),
    
  formatRelativeTime: (date: Date | string | number) =>
    formatRelativeTime(date, getCurrentLocale()),
    
  formatFileSize: (bytes: number, decimals?: number) =>
    formatFileSize(bytes, getCurrentLocale(), decimals),
});