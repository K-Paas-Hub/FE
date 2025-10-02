import { renderHook, waitFor } from '@testing-library/react';
import { useJobs } from './useJobs';
import { jobService } from '../services/api';
import { Job } from '../types/job';

jest.mock('../services/api');

describe('useJobs', () => {
  const mockJobs: Job[] = [
    {
      id: 1,
      company: '테스트 회사 1',
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
        website: 'https://test.com',
      },
    },
    {
      id: 2,
      company: '테스트 회사 2',
      logo: 'T',
      logoClass: 'green',
      title: '프론트엔드 개발자',
      location: '부산',
      experience: '신입',
      industry: 'IT',
      salary: 35000000,
      deadline: '2025-11-30',
      hasVisa: true,
      isLiked: false,
      likeCount: 0,
      createdAt: '2025-01-02',
      imageContent: '💻',
      description: '테스트2',
      requirements: [],
      benefits: [],
      contactInfo: { email: 'test2@test.com', phone: '010-1111-1111' },
      contractType: '계약직',
      workType: '재택근무',
      workDays: ['월', '화', '수', '목', '금'],
      workHours: '10:00 ~ 19:00',
      salaryType: '연봉',
      address: '부산시',
      isScrapped: false,
      companyInfo: {
        size: '스타트업',
        industry: 'IT',
        founded: '2020',
        website: 'https://test2.com',
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('초기 로딩 상태', () => {
    (jobService.getJobs as jest.Mock).mockResolvedValue({
      success: true,
      data: mockJobs,
    });

    const { result } = renderHook(() => useJobs());

    expect(result.current.loading).toBe(true);
    expect(result.current.jobs).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  test('채용공고 목록 조회 성공', async () => {
    (jobService.getJobs as jest.Mock).mockResolvedValue({
      success: true,
      data: mockJobs,
    });

    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.jobs).toEqual(mockJobs);
    expect(result.current.error).toBe(null);
    expect(jobService.getJobs).toHaveBeenCalledTimes(1);
  });

  test('채용공고 조회 실패 (API 에러)', async () => {
    (jobService.getJobs as jest.Mock).mockResolvedValue({
      success: false,
      error: 'API 오류가 발생했습니다.',
    });

    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.jobs).toEqual([]);
    expect(result.current.error).toBe('API 오류가 발생했습니다.');
  });

  test('채용공고 조회 실패 (네트워크 오류)', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (jobService.getJobs as jest.Mock).mockRejectedValue(new Error('네트워크 오류'));

    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.jobs).toEqual([]);
    expect(result.current.error).toBe('네트워크 오류가 발생했습니다.');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Jobs fetch error:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  test('refetch 함수로 데이터 재조회', async () => {
    (jobService.getJobs as jest.Mock).mockResolvedValue({
      success: true,
      data: mockJobs,
    });

    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 첫 번째 호출 확인
    expect(jobService.getJobs).toHaveBeenCalledTimes(1);

    // refetch 호출
    await result.current.refetch();

    await waitFor(() => {
      expect(jobService.getJobs).toHaveBeenCalledTimes(2);
    });
  });

  test('파라미터와 함께 refetch 호출', async () => {
    (jobService.getJobs as jest.Mock).mockResolvedValue({
      success: true,
      data: mockJobs,
    });

    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 파라미터와 함께 refetch
    const params = { location: '서울', industry: 'IT' };
    await result.current.refetch(params);

    await waitFor(() => {
      expect(jobService.getJobs).toHaveBeenCalledWith(params);
    });
  });

  test('빈 데이터 응답 처리', async () => {
    (jobService.getJobs as jest.Mock).mockResolvedValue({
      success: true,
      data: [],
    });

    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.jobs).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  test('data가 null인 경우 빈 배열 반환', async () => {
    (jobService.getJobs as jest.Mock).mockResolvedValue({
      success: true,
      data: null,
    });

    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.jobs).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
