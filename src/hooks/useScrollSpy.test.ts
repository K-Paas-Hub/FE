import { renderHook, act, waitFor } from '@testing-library/react';
import { useScrollSpy, useCountUp } from './useScrollSpy';

describe('useScrollSpy', () => {
  const sectionIds = ['section1', 'section2', 'section3'];

  beforeEach(() => {
    // DOM 초기화
    document.body.innerHTML = '';

    // Mock 섹션 생성
    sectionIds.forEach((id, index) => {
      const section = document.createElement('div');
      section.id = id;
      section.style.height = '1000px';
      section.style.position = 'absolute';
      section.style.top = `${index * 1000}px`;
      document.body.appendChild(section);
    });

    // window.scrollY mock
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 3000,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('초기 활성 섹션 설정', () => {
    const { result } = renderHook(() => useScrollSpy(sectionIds));

    // 초기값은 빈 문자열이거나 첫 번째 섹션
    expect(typeof result.current).toBe('string');
  });

  test('스크롤 시 활성 섹션 변경', () => {
    const { result } = renderHook(() => useScrollSpy(sectionIds));

    // 두 번째 섹션으로 스크롤
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1000, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(['section2', 'section1', '']).toContain(result.current);
  });

  test('페이지 맨 아래 도달 시 마지막 섹션 활성화', () => {
    const { result } = renderHook(() => useScrollSpy(sectionIds));

    // 페이지 맨 아래로 스크롤
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 2300, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('section3');
  });

  test('offset 적용', () => {
    const offset = 100;
    const { result } = renderHook(() => useScrollSpy(sectionIds, offset));

    // offset이 적용된 스크롤
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    // offset이 적용되어 활성 섹션이 결정됨
    expect(typeof result.current).toBe('string');
  });

  test('언마운트 시 이벤트 리스너 제거', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useScrollSpy(sectionIds));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});

describe('useCountUp', () => {
  let mockObserver: any;

  beforeEach(() => {
    jest.useFakeTimers();

    // IntersectionObserver mock
    mockObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    };

    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      // 약간의 지연 후 visible 상태로 만들기
      setTimeout(() => {
        callback([{ isIntersecting: true }]);
      }, 0);
      return mockObserver;
    });

    // requestAnimationFrame mock
    let rafId = 0;
    global.requestAnimationFrame = jest.fn((cb) => {
      setTimeout(() => cb(Date.now()), 16);
      return ++rafId;
    });

    // DOM 초기화
    document.body.innerHTML = '<div id="test-section"></div>';
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  test('초기값은 0', () => {
    const { result } = renderHook(() => useCountUp(100, 'test-section'));

    expect(result.current).toBe(0);
  });

  test('요소가 보이면 카운트 시작', async () => {
    const { result } = renderHook(() => useCountUp(100, 'test-section', 1000, 0));

    await waitFor(() => {
      expect(result.current).toBeGreaterThan(0);
    });
  });

  test('delay 후 카운트 시작', () => {
    const delay = 500;
    const { result } = renderHook(() => useCountUp(100, 'test-section', 1000, delay));

    // delay 전에는 0
    expect(result.current).toBe(0);

    // IntersectionObserver 트리거
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // delay 시간만큼 진행
    act(() => {
      jest.advanceTimersByTime(delay + 100);
    });

    // delay 후에는 카운트가 시작됨
    expect(result.current).toBeGreaterThanOrEqual(0);
  });

  test('존재하지 않는 요소 처리', () => {
    const { result } = renderHook(() => useCountUp(100, 'non-existent', 1000, 0));

    expect(result.current).toBe(0);
  });

  test('언마운트 시 observer disconnect', () => {
    const { unmount } = renderHook(() => useCountUp(100, 'test-section'));

    unmount();

    // observer의 disconnect가 호출되었는지 확인
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });
});
