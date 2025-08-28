import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '../contexts/LanguageContext';

// 테스트용 QueryClient 생성
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0, // cacheTime 대신 gcTime 사용
      },
      mutations: {
        retry: false,
      },
    },
  });

// 커스텀 렌더 함수 (라우터 포함)
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    const queryClient = createTestQueryClient();
    
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Mock 데이터 생성 헬퍼
export const createMockUser = (overrides = {}) => ({
  id: 'user-123',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  created_at: '2023-01-01T00:00:00.000Z',
  role: 'authenticated',
  ...overrides,
});

export const createMockVisaType = (overrides = {}) => ({
  id: 'E9',
  name: 'E9',
  fullName: '비전문취업비자',
  description: '비전문직 외국인 근로자',
  duration: '3년',
  extension: true,
  documents: ['여권', '사진', '고용계약서'],
  ...overrides,
});

// API 응답 Mock 헬퍼
export const createMockApiResponse = <T,>(data: T, success = true) => ({
  success,
  data: success ? data : undefined,
  error: success ? undefined : 'API Error',
});

// 비동기 작업 대기 헬퍼
export const waitForLoadingToFinish = () =>
  new Promise(resolve => setTimeout(resolve, 0));

// 에러 경계 테스트 헬퍼
export const createErrorBoundary = () => {
  const ErrorFallback = ({ error }: { error: Error }) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );

  return ErrorFallback;
};

// 재내보내기
export * from '@testing-library/react';
export { customRender as render };
