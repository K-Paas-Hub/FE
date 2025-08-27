/**
 * 공통 타입 정의
 * 프로젝트 전체에서 사용되는 기본 타입들을 정의합니다.
 */

// ============================================================================
// 기본 응답 타입
// ============================================================================

/**
 * 기본 API 응답 타입
 * 모든 API 응답의 기본 구조를 정의합니다.
 */
export interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

/**
 * 성공 응답 타입
 */
export interface SuccessResponse<T> extends BaseResponse<T> {
  success: true;
  data: T;
}

/**
 * 에러 응답 타입
 */
export interface ErrorResponse extends BaseResponse<never> {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, unknown>;
}

// ============================================================================
// 페이지네이션 타입
// ============================================================================

/**
 * 페이지네이션 파라미터 타입
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 페이지네이션 메타데이터 타입
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 페이지네이션 응답 타입
 * @deprecated 기존 api.ts의 PaginatedResponse를 사용하세요
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// ============================================================================
// 파일 업로드 타입
// ============================================================================

/**
 * 파일 정보 타입
 */
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy?: string;
}

/**
 * 파일 업로드 응답 타입
 */
export interface FileUploadResponse extends BaseResponse<FileInfo> {
  data: FileInfo;
}

/**
 * 다중 파일 업로드 응답 타입
 */
export interface MultipleFileUploadResponse extends BaseResponse<FileInfo[]> {
  data: FileInfo[];
}

/**
 * 파일 삭제 응답 타입
 */
export interface FileDeleteResponse extends BaseResponse<boolean> {
  data: boolean;
}

// ============================================================================
// 유틸리티 타입
// ============================================================================

/**
 * 선택적 필드 타입
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 필수 필드 타입
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * 읽기 전용 타입
 */
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * 깊은 읽기 전용 타입
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// ============================================================================
// 상태 타입
// ============================================================================

/**
 * 로딩 상태 타입
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * API 상태 타입
 */
export interface ApiState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
  lastUpdated: Date | null;
}

// ============================================================================
// 이벤트 핸들러 타입
// ============================================================================

/**
 * 기본 이벤트 핸들러 타입
 */
export type EventHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void;

/**
 * 폼 이벤트 핸들러 타입
 */
export type FormEventHandler<T = HTMLFormElement> = (event: React.FormEvent<T>) => void;

/**
 * 키보드 이벤트 핸들러 타입
 */
export type KeyboardEventHandler<T = HTMLElement> = (event: React.KeyboardEvent<T>) => void;

/**
 * 변경 이벤트 핸들러 타입
 */
export type ChangeEventHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;

// ============================================================================
// 검증 타입
// ============================================================================

/**
 * 검증 결과 타입
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * 검증 함수 타입
 */
export type ValidationFunction<T> = (value: T) => ValidationResult;

/**
 * 비동기 검증 함수 타입
 */
export type AsyncValidationFunction<T> = (value: T) => Promise<ValidationResult>;
