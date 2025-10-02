import { FileData as CommonFileData, UploadProgress as CommonUploadProgress, SubmissionStatus } from './common';

export interface ResumeFormData {
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
}

export interface ResumeData extends ResumeFormData {
  id: string;
  status?: SubmissionStatus;
  createdAt?: string;
  updatedAt?: string;
}

// common.ts의 타입 재사용
export type FileData = CommonFileData;
export type UploadProgress = CommonUploadProgress;
