import { ApiResponse, ContractType, WorkType, SalaryType } from './common';

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
  
  // 새로운 2컬럼 레이아웃용 필드들
  contractType?: ContractType;
  workType?: WorkType;
  workDays?: string[];
  workHours?: string;
  salaryType?: SalaryType;
  address?: string;
  isScrapped?: boolean;
}

// API 응답 타입
export type JobsResponse = ApiResponse<Job[]>;

// 컴포넌트 Props 타입
export interface JobDetailPageProps {
  // URL 파라미터로 받을 예정이므로 props는 없음
}

// 필터링 관련 타입
export interface JobFilters {
  region?: string;
  experience?: string;
  industry?: string;
  hasVisa?: boolean;
}

// 탭 타입
export type JobDetailTab = 'detail' | 'company';


