import { ApiResponse } from './api';

// 기존 Job 인터페이스 확장
export interface Job {
  id: number;
  company: string;
  logo: string;
  logoClass: string;
  title: string;
  location: string;
  experience: string;
  industry: string;
  salary: number;
  deadline: string;
  hasVisa: boolean;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  imageContent: string;
  
  // 상세 페이지용 추가 필드
  description?: string;
  requirements?: string[];
  benefits?: string[];
  contactInfo?: {
    email: string;
    phone: string;
  };
  companyInfo?: {
    size: string;
    industry: string;
    founded: string;
    website: string;
  };
}

// API 응답 타입
export type JobResponse = ApiResponse<Job>;
export type JobsResponse = ApiResponse<Job[]>;

// 컴포넌트 Props 타입
export interface JobDetailPageProps {
  // URL 파라미터로 받을 예정이므로 props는 없음
}

// 필터링 관련 타입
export interface JobFilters {
  region?: string;
  employmentType?: string;
  jobCategory?: string;
  salary?: string;
  hasVisa?: boolean;
}

// 정렬 타입
export type JobSortType = 'latest' | 'popular' | 'salary' | 'deadline';
