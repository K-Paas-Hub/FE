// API 응답 기본 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// API 에러 타입
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
