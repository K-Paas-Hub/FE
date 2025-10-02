// 공통 타입에서 import 후 재export
import { ApiResponse, ApiError, PaginatedResponse } from './common';

export type { ApiResponse, ApiError, PaginatedResponse };

export interface UserData {
  id?: string;
  email: string;
  name: string;
  phone?: string;
  nationality?: string;
  visaType?: string;
  address?: string;
  addressDetail?: string;
}

export interface JobData {
  id?: string;
  title: string;
  company: string;
  description: string;
  requirements: string;
  salary?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
}

export interface CompanyData {
  id?: string;
  name: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
}

export interface VisaApplicationData {
  id?: string;
  userId: string;
  visaType: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface ResumeData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  visaType: string;
  address: string;
  addressDetail?: string;
  education: string;
  experience: string;
  skills: string;
  certifications: string;
  languages: string;
  introduction: string;
  status?: 'draft' | 'submitted';
  createdAt?: string;
  updatedAt?: string;
}

// 백엔드 API 응답 타입 정의
export interface BackendJobResponse {
  jobTitle: string;
  jobRegion: string;
  jobExperience: string;
  jobEducation: string;
  salary: string;
  jobUploadDate: string;
  jobDeadline: string | null;
  jobStatus: string;
  postLink: string;
  companyName: string;
  companyWebsite?: string | null;
  categories: string[];
  employmentTypes: string[];
}

export interface BackendCompanyResponse {
  companyName: string;
  companyType: string | null;
  industry: string | null;
  website: string | null;
  address: string | null;
  introduce: string | null;
}
