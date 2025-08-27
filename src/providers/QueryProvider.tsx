import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query 클라이언트 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 설정
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 10 * 60 * 1000, // 10분 (v5에서 cacheTime -> gcTime)
      retry: (failureCount: number, error: unknown) => {
        // 최대 3번 재시도
        if (failureCount >= 3) return false;
        
        // 네트워크 에러는 재시도
        if (error instanceof TypeError && error.message.includes('fetch')) {
          return true;
        }
        
        // 4xx 에러는 재시도 안함
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        
        return true;
      },
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // 창 포커스 시 자동 재검색 비활성화
      refetchOnReconnect: true, // 네트워크 재연결 시 재검색
    },
    mutations: {
      retry: false, // 뮤테이션은 재시도 안함
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// 클라이언트 인스턴스 내보내기 (필요한 경우)
export { queryClient };