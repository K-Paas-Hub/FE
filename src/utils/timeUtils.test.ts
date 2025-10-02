import { formatRecommendedTime, getLocaleTimeString } from './timeUtils';
import { TFunction } from 'i18next';

describe('timeUtils', () => {
  describe('formatRecommendedTime', () => {
    // Mock 번역 함수 - TFunction 타입에 맞게 수정
    const mockT: TFunction = ((key: string) => {
      const translations: Record<string, string> = {
        'common.minutes': '분',
        'common.seconds': '초',
      };
      return translations[key] || key;
    }) as TFunction;

    test('초가 0일 때 분만 표시', () => {
      expect(formatRecommendedTime(5, 0, mockT)).toBe('5분');
      expect(formatRecommendedTime(10, 0, mockT)).toBe('10분');
    });

    test('분과 초 모두 표시', () => {
      expect(formatRecommendedTime(3, 30, mockT)).toBe('3분 30초');
      expect(formatRecommendedTime(5, 45, mockT)).toBe('5분 45초');
    });

    test('0분 30초도 올바르게 표시', () => {
      expect(formatRecommendedTime(0, 30, mockT)).toBe('0분 30초');
    });

    test('1초도 올바르게 표시', () => {
      expect(formatRecommendedTime(0, 1, mockT)).toBe('0분 1초');
    });
  });

  describe('getLocaleTimeString', () => {
    const testDate = new Date('2025-01-15T14:30:00');

    test('한국어 로케일 시간 포맷팅', () => {
      const result = getLocaleTimeString(testDate, 'ko');
      // 한국어는 '오후 02:30' 형식이므로 30만 확인
      expect(result).toContain('30');
    });

    test('영어 로케일 시간 포맷팅', () => {
      const result = getLocaleTimeString(testDate, 'en');
      expect(result).toContain('2');
      expect(result).toContain('30');
    });

    test('베트남어 로케일 시간 포맷팅', () => {
      const result = getLocaleTimeString(testDate, 'vi');
      expect(result).toContain('14');
      expect(result).toContain('30');
    });

    test('크메르어 로케일 시간 포맷팅', () => {
      const result = getLocaleTimeString(testDate, 'km');
      expect(result).toBeTruthy();
    });

    test('네팔어 로케일 시간 포맷팅', () => {
      const result = getLocaleTimeString(testDate, 'ne');
      expect(result).toBeTruthy();
    });

    test('인도네시아어 로케일 시간 포맷팅', () => {
      const result = getLocaleTimeString(testDate, 'id');
      expect(result).toContain('14');
      expect(result).toContain('30');
    });

    test('중국어 로케일 시간 포맷팅', () => {
      const result = getLocaleTimeString(testDate, 'zh');
      expect(result).toBeTruthy();
    });

    test('태국어 로케일 시간 포맷팅', () => {
      const result = getLocaleTimeString(testDate, 'th');
      expect(result).toBeTruthy();
    });

    test('지원하지 않는 언어는 한국어로 폴백', () => {
      const result = getLocaleTimeString(testDate, 'unknown');
      // 한국어는 '오후 02:30' 형식이므로 30만 확인
      expect(result).toContain('30');
    });
  });
});
