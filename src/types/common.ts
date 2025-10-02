/**
 * 공통 타입 정의
 */

// HTTP & API 기본 타입
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  status?: number;
  statusText?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// 언어 & 사용자 타입
export type Language = 'ko' | 'vi' | 'km' | 'ne' | 'id' | 'zh' | 'th' | 'en';
export type UserType = 'worker' | 'student' | 'employer';
export type ContractType = '정규직' | '계약직' | '인턴';
export type WorkType = '전사근무' | '재택근무' | '혼합근무';
export type SalaryType = '면접 후 결정' | '연봉' | '시급';

// 상태 타입
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type SubmissionStatus = 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected';
export type Severity = 'low' | 'medium' | 'high';

// 날짜 타입
export type ISODateString = string;

// 파일 타입
export type FileType = 'txt' | 'docx' | 'pdf' | 'jpg' | 'png' | 'gif';
export type UploadStatus = 'uploading' | 'completed' | 'error';

export interface FileData {
  id: string;
  name: string;
  size: number;
  url: string;
  type: string;
}

export interface UploadProgress {
  fileId: string;
  progress: number;
  status: UploadStatus;
}

// 유틸리티 타입
export type Nullable<T> = T | null;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
