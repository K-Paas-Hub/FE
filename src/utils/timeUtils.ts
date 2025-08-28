import { TFunction } from 'i18next';

/**
 * 추천 시간을 포맷팅하는 함수
 * @param minutes 분
 * @param seconds 초
 * @param t 번역 함수
 * @returns 포맷팅된 시간 문자열
 */
export const formatRecommendedTime = (minutes: number, seconds: number, t: TFunction): string => {
  if (seconds === 0) {
    return `${minutes}${t('common.minutes')}`;
  }
  
  return `${minutes}${t('common.minutes')} ${seconds}${t('common.seconds')}`;
};

/**
 * 언어별 날짜/시간 포맷팅 함수
 * @param date 날짜 객체
 * @param language 언어 코드
 * @returns 포맷팅된 시간 문자열
 */
export const getLocaleTimeString = (date: Date, language: string): string => {
  const localeMap = {
    ko: 'ko-KR',
    en: 'en-US',
    vi: 'vi-VN',
    km: 'km-KH',
    ne: 'ne-NP',
    id: 'id-ID',
    zh: 'zh-CN',
    th: 'th-TH'
  };
  
  const locale = localeMap[language as keyof typeof localeMap] || 'ko-KR';
  
  return date.toLocaleTimeString(locale, { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};
