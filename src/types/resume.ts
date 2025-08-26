export interface ResumeFormData {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  visaType: string;
  address: string; // 주소 필드 추가
  education: string;
  experience: string;
  skills: string;
  certifications: string; // 자격증 필드 추가
  languages: string;
  introduction: string;
}

export interface ResumeData extends ResumeFormData {
  id: string;
  status?: 'draft' | 'submitted';
  createdAt?: string;
  updatedAt?: string;
}

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
  status: 'uploading' | 'completed' | 'error';
}
