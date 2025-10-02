import { renderHook, act, waitFor } from '@testing-library/react';
import { useJobActions } from './useJobActions';
import { Job } from '../types/job';
import * as jobUtils from '../utils/jobUtils';

// jobUtils 모킹
jest.mock('../utils/jobUtils');
jest.mock('../utils/logger');

describe('useJobActions', () => {
  const mockJob: Job = {
    id: 1,
    company: '테스트 회사',
    logo: 'T',
    logoClass: 'blue',
    title: '소프트웨어 엔지니어',
    location: '서울',
    experience: '경력 3년',
    industry: 'IT',
    salary: 40000000,
    deadline: '2025-12-31',
    hasVisa: false,
    isLiked: false,
    likeCount: 0,
    createdAt: '2025-01-01',
    imageContent: '💻',
    description: '테스트',
    requirements: [],
    benefits: [],
    contactInfo: { email: 'test@test.com', phone: '010-0000-0000' },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금'],
    workHours: '09:00 ~ 18:00',
    salaryType: '연봉',
    address: '서울시',
    isScrapped: false,
    companyInfo: {
      size: '중소기업',
      industry: 'IT',
      founded: '2000',
      website: 'https://test-company.com',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // alert mock
    global.alert = jest.fn();
    // window.open mock
    global.open = jest.fn();
  });

  describe('handleApplyClick', () => {
    test('지원 성공 시 성공 메시지 표시', async () => {
      (jobUtils.applyToJob as jest.Mock).mockResolvedValue(true);

      const { result } = renderHook(() => useJobActions(mockJob));

      await act(async () => {
        await result.current.handleApplyClick();
      });

      await waitFor(() => {
        expect(jobUtils.applyToJob).toHaveBeenCalledWith(1);
        expect(global.alert).toHaveBeenCalledWith('지원이 완료되었습니다!');
      });
    });

    test('지원 실패 시 실패 메시지 표시', async () => {
      (jobUtils.applyToJob as jest.Mock).mockResolvedValue(false);

      const { result } = renderHook(() => useJobActions(mockJob));

      await act(async () => {
        await result.current.handleApplyClick();
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('지원에 실패했습니다. 다시 시도해주세요.');
      });
    });

    test('job이 null이면 아무 동작 안 함', async () => {
      const { result } = renderHook(() => useJobActions(null));

      await act(async () => {
        await result.current.handleApplyClick();
      });

      expect(jobUtils.applyToJob).not.toHaveBeenCalled();
    });

    test('에러 발생 시 에러 메시지 표시', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (jobUtils.applyToJob as jest.Mock).mockRejectedValue(new Error('네트워크 오류'));

      const { result } = renderHook(() => useJobActions(mockJob));

      await act(async () => {
        await result.current.handleApplyClick();
      });

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('지원하기 실패:', expect.any(Error));
        expect(global.alert).toHaveBeenCalledWith('지원 중 오류가 발생했습니다.');
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('handleScrapToggle', () => {
    test('스크랩 토글 성공', async () => {
      (jobUtils.toggleScrapStatus as jest.Mock).mockResolvedValue(true);

      const { result } = renderHook(() => useJobActions(mockJob));

      await act(async () => {
        await result.current.handleScrapToggle();
      });

      await waitFor(() => {
        expect(jobUtils.toggleScrapStatus).toHaveBeenCalledWith(1, false);
      });
    });

    test('job이 null이면 아무 동작 안 함', async () => {
      const { result } = renderHook(() => useJobActions(null));

      await act(async () => {
        await result.current.handleScrapToggle();
      });

      expect(jobUtils.toggleScrapStatus).not.toHaveBeenCalled();
    });

    test('에러 발생 시 에러 메시지 표시', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (jobUtils.toggleScrapStatus as jest.Mock).mockRejectedValue(new Error('네트워크 오류'));

      const { result } = renderHook(() => useJobActions(mockJob));

      await act(async () => {
        await result.current.handleScrapToggle();
      });

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('스크랩 토글 실패:', expect.any(Error));
        expect(global.alert).toHaveBeenCalledWith('스크랩 처리 중 오류가 발생했습니다.');
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('handleShareClick', () => {
    test('공유 성공', async () => {
      (jobUtils.shareJob as jest.Mock).mockResolvedValue(true);

      const { result } = renderHook(() => useJobActions(mockJob));

      await act(async () => {
        await result.current.handleShareClick();
      });

      await waitFor(() => {
        expect(jobUtils.shareJob).toHaveBeenCalledWith({
          title: '소프트웨어 엔지니어',
          company: '테스트 회사',
          url: expect.any(String),
        });
      });
    });

    test('공유 실패 시 실패 메시지 표시', async () => {
      (jobUtils.shareJob as jest.Mock).mockResolvedValue(false);

      const { result } = renderHook(() => useJobActions(mockJob));

      await act(async () => {
        await result.current.handleShareClick();
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('공유에 실패했습니다. 다시 시도해주세요.');
      });
    });

    test('job이 null이면 아무 동작 안 함', async () => {
      const { result } = renderHook(() => useJobActions(null));

      await act(async () => {
        await result.current.handleShareClick();
      });

      expect(jobUtils.shareJob).not.toHaveBeenCalled();
    });
  });

  describe('handleHomepageApply', () => {
    test('홈페이지가 있으면 새 탭에서 열기', () => {
      const { result } = renderHook(() => useJobActions(mockJob));

      act(() => {
        result.current.handleHomepageApply();
      });

      expect(global.open).toHaveBeenCalledWith(
        'https://test-company.com',
        '_blank',
        'noopener,noreferrer'
      );
    });

    test('홈페이지 정보가 없으면 알림 표시', () => {
      const jobWithoutWebsite = { ...mockJob, companyInfo: undefined };
      const { result } = renderHook(() => useJobActions(jobWithoutWebsite));

      act(() => {
        result.current.handleHomepageApply();
      });

      expect(global.alert).toHaveBeenCalledWith('홈페이지 정보가 없습니다.');
      expect(global.open).not.toHaveBeenCalled();
    });

    test('job이 null이면 알림 표시', () => {
      const { result } = renderHook(() => useJobActions(null));

      act(() => {
        result.current.handleHomepageApply();
      });

      expect(global.alert).toHaveBeenCalledWith('홈페이지 정보가 없습니다.');
    });
  });

  test('모든 핸들러가 useCallback으로 메모이제이션됨', () => {
    const { result, rerender } = renderHook(() => useJobActions(mockJob));

    const firstHandlers = {
      handleApplyClick: result.current.handleApplyClick,
      handleScrapToggle: result.current.handleScrapToggle,
      handleShareClick: result.current.handleShareClick,
      handleHomepageApply: result.current.handleHomepageApply,
    };

    // 재렌더링
    rerender();

    // 동일한 참조 유지 확인
    expect(result.current.handleApplyClick).toBe(firstHandlers.handleApplyClick);
    expect(result.current.handleScrapToggle).toBe(firstHandlers.handleScrapToggle);
    expect(result.current.handleShareClick).toBe(firstHandlers.handleShareClick);
    expect(result.current.handleHomepageApply).toBe(firstHandlers.handleHomepageApply);
  });
});
