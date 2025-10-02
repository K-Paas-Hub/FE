import {
  calculateDaysUntilDeadline,
  copyToClipboard,
  shareJob,
  formatSalary,
  formatWorkDays,
  formatDate,
} from './jobUtils';

describe('jobUtils', () => {
  describe('calculateDaysUntilDeadline', () => {
    beforeEach(() => {
      // 2025-01-01을 기준으로 테스트
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-01-01'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('상시채용은 999 반환', () => {
      expect(calculateDaysUntilDeadline('상시채용')).toBe(999);
    });

    test('빈 문자열은 999 반환', () => {
      expect(calculateDaysUntilDeadline('')).toBe(999);
      expect(calculateDaysUntilDeadline('   ')).toBe(999);
    });

    test('유효하지 않은 값들은 999 반환', () => {
      const invalidValues = ['N/A', '마감', 'Invalid Date', 'null', 'undefined', '-', '--'];
      invalidValues.forEach(value => {
        expect(calculateDaysUntilDeadline(value)).toBe(999);
      });
    });

    test('미래 날짜는 남은 일수 계산', () => {
      expect(calculateDaysUntilDeadline('2025-01-10')).toBe(9);
      expect(calculateDaysUntilDeadline('2025-01-31')).toBe(30);
    });

    test('과거 날짜는 0 반환', () => {
      expect(calculateDaysUntilDeadline('2024-12-31')).toBe(0);
    });

    test('오늘 날짜는 0 반환', () => {
      expect(calculateDaysUntilDeadline('2025-01-01')).toBe(0);
    });

    test('잘못된 날짜 형식은 999 반환', () => {
      expect(calculateDaysUntilDeadline('2025-13-45')).toBe(999);
      expect(calculateDaysUntilDeadline('not a date')).toBe(999);
    });
  });

  describe('copyToClipboard', () => {
    beforeEach(() => {
      // clipboard API mock
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockResolvedValue(undefined),
        },
      });
      Object.assign(window, {
        isSecureContext: true,
      });
    });

    test('텍스트를 클립보드에 복사 성공', async () => {
      const result = await copyToClipboard('테스트 텍스트');
      expect(result).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('테스트 텍스트');
    });

    test('복사 실패 시 false 반환', async () => {
      (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(new Error('Failed'));
      const result = await copyToClipboard('테스트');
      expect(result).toBe(false);
    });
  });

  describe('shareJob', () => {
    const mockJobData = {
      title: '소프트웨어 엔지니어',
      company: '테스트 회사',
      url: 'https://example.com/jobs/123',
    };

    beforeEach(() => {
      // share API mock
      Object.assign(navigator, {
        share: jest.fn().mockResolvedValue(undefined),
      });
    });

    test('Web Share API로 공유 성공', async () => {
      const result = await shareJob(mockJobData);
      expect(result).toBe(true);
      expect(navigator.share).toHaveBeenCalledWith({
        title: '소프트웨어 엔지니어 - 테스트 회사',
        text: '테스트 회사에서 소프트웨어 엔지니어 포지션을 모집합니다.',
        url: 'https://example.com/jobs/123',
      });
    });

    test('공유 실패 시 false 반환', async () => {
      (navigator.share as jest.Mock).mockRejectedValue(new Error('Failed'));
      const result = await shareJob(mockJobData);
      expect(result).toBe(false);
    });
  });

  describe('formatSalary', () => {
    test('면접 후 결정은 그대로 반환', () => {
      expect(formatSalary(0, '면접 후 결정')).toBe('면접 후 결정');
      expect(formatSalary(3000, '면접 후 결정')).toBe('면접 후 결정');
    });

    test('만원 이상은 만원 단위로 표시', () => {
      expect(formatSalary(30000000)).toBe('3,000만원');
      expect(formatSalary(45000000)).toBe('4,500만원');
      expect(formatSalary(100000000)).toBe('10,000만원');
    });

    test('만원 미만은 원 단위로 표시', () => {
      expect(formatSalary(5000)).toBe('5,000원');
      expect(formatSalary(9999)).toBe('9,999원');
    });

    test('0은 원으로 표시', () => {
      expect(formatSalary(0)).toBe('0원');
    });
  });

  describe('formatWorkDays', () => {
    test('근무 요일을 쉼표로 구분하여 반환', () => {
      expect(formatWorkDays(['월', '화', '수', '목', '금'])).toBe('월, 화, 수, 목, 금');
      expect(formatWorkDays(['월', '수', '금'])).toBe('월, 수, 금');
    });

    test('빈 배열은 미정 반환', () => {
      expect(formatWorkDays([])).toBe('미정');
    });

    test('undefined는 미정 반환', () => {
      expect(formatWorkDays(undefined)).toBe('미정');
    });
  });

  describe('formatDate', () => {
    test('상시채용은 그대로 반환', () => {
      expect(formatDate('상시채용')).toBe('상시채용');
      expect(formatDate('')).toBe('상시채용');
      expect(formatDate('   ')).toBe('상시채용');
    });

    test('유효하지 않은 값들은 상시채용 반환', () => {
      const invalidValues = ['N/A', '마감', 'Invalid Date', 'null', 'undefined', '-', '--'];
      invalidValues.forEach(value => {
        expect(formatDate(value)).toBe('상시채용');
      });
    });

    test('유효한 날짜는 한국어 형식으로 변환', () => {
      const result = formatDate('2025-12-31');
      expect(result).toContain('2025');
      expect(result).toContain('12');
      expect(result).toContain('31');
    });

    test('잘못된 날짜 형식은 상시채용 반환', () => {
      expect(formatDate('not a date')).toBe('상시채용');
      expect(formatDate('2025-13-45')).toBe('상시채용');
    });
  });
});
