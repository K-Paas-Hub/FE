import { renderHook, waitFor } from '@testing-library/react';
import { useAutoSave } from './useAutoSave';
import { ResumeFormData } from '../types/resume';
import { RESUME_CONSTANTS } from '../constants';

describe('useAutoSave', () => {
  const mockSaveFunction = jest.fn().mockResolvedValue(undefined);

  const mockData: ResumeFormData = {
    name: '테스트',
    email: 'test@example.com',
    phone: '010-1234-5678',
    address: '서울시',
    birthDate: '1990-01-01',
    gender: 'male',
    nationality: '한국',
    education: [],
    experience: [],
    licenses: [],
    languages: [],
    skills: [],
    activities: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('자동 저장이 활성화되어 있을 때 데이터 변경 시 저장 함수 호출', async () => {
    const { rerender } = renderHook(
      ({ data, enabled }) => useAutoSave(data, mockSaveFunction, enabled),
      {
        initialProps: { data: mockData, enabled: true },
      }
    );

    // 데이터 변경
    const updatedData = { ...mockData, name: '변경된 이름' };
    rerender({ data: updatedData, enabled: true });

    // 타이머 실행
    jest.advanceTimersByTime(RESUME_CONSTANTS.autoSaveInterval);

    await waitFor(() => {
      expect(mockSaveFunction).toHaveBeenCalledTimes(1);
    });
  });

  test('enabled가 false일 때 저장 함수 호출하지 않음', async () => {
    const { rerender } = renderHook(
      ({ data, enabled }) => useAutoSave(data, mockSaveFunction, enabled),
      {
        initialProps: { data: mockData, enabled: false },
      }
    );

    // 데이터 변경
    const updatedData = { ...mockData, name: '변경된 이름' };
    rerender({ data: updatedData, enabled: false });

    // 타이머 실행
    jest.advanceTimersByTime(RESUME_CONSTANTS.autoSaveInterval);

    await waitFor(() => {
      expect(mockSaveFunction).not.toHaveBeenCalled();
    });
  });

  test('동일한 데이터는 저장하지 않음', async () => {
    const { rerender } = renderHook(
      ({ data, enabled }) => useAutoSave(data, mockSaveFunction, enabled),
      {
        initialProps: { data: mockData, enabled: true },
      }
    );

    // 초기 저장 대기
    jest.advanceTimersByTime(RESUME_CONSTANTS.autoSaveInterval);
    await waitFor(() => {
      expect(mockSaveFunction).toHaveBeenCalledTimes(1);
    });

    // 저장 함수 모의 초기화
    mockSaveFunction.mockClear();

    // 동일한 데이터로 재렌더링
    rerender({ data: mockData, enabled: true });

    // 타이머 실행
    jest.advanceTimersByTime(RESUME_CONSTANTS.autoSaveInterval + 100);

    // 데이터가 변경되지 않았으므로 저장 함수가 호출되지 않아야 함
    expect(mockSaveFunction).not.toHaveBeenCalled();
  });

  test('여러 번 데이터 변경 시 마지막 변경만 저장 (디바운싱)', async () => {
    const { rerender } = renderHook(
      ({ data, enabled }) => useAutoSave(data, mockSaveFunction, enabled),
      {
        initialProps: { data: mockData, enabled: true },
      }
    );

    // 빠르게 여러 번 데이터 변경
    rerender({ data: { ...mockData, name: '변경1' }, enabled: true });
    jest.advanceTimersByTime(100);

    rerender({ data: { ...mockData, name: '변경2' }, enabled: true });
    jest.advanceTimersByTime(100);

    rerender({ data: { ...mockData, name: '변경3' }, enabled: true });

    // 전체 타이머 실행
    jest.advanceTimersByTime(RESUME_CONSTANTS.autoSaveInterval);

    await waitFor(() => {
      // 마지막 변경만 저장되어야 함
      expect(mockSaveFunction).toHaveBeenCalledTimes(1);
    });
  });

  test('저장 실패 시 에러를 콘솔에 출력', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const failingSaveFunction = jest.fn().mockRejectedValue(new Error('저장 실패'));

    const { rerender } = renderHook(
      ({ data, enabled }) => useAutoSave(data, failingSaveFunction, enabled),
      {
        initialProps: { data: mockData, enabled: true },
      }
    );

    // 데이터 변경
    const updatedData = { ...mockData, name: '변경된 이름' };
    rerender({ data: updatedData, enabled: true });

    // 타이머 실행
    jest.advanceTimersByTime(RESUME_CONSTANTS.autoSaveInterval);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('자동 저장 실패:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  test('언마운트 시 타이머 정리', () => {
    const { unmount } = renderHook(
      ({ data, enabled }) => useAutoSave(data, mockSaveFunction, enabled),
      {
        initialProps: { data: mockData, enabled: true },
      }
    );

    // 언마운트
    unmount();

    // 타이머 실행해도 호출되지 않아야 함
    jest.advanceTimersByTime(RESUME_CONSTANTS.autoSaveInterval);

    expect(mockSaveFunction).not.toHaveBeenCalled();
  });
});
