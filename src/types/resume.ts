export interface ResumeFormData {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  visaType: string;
  education: string;
  experience: string;
  skills: string;
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
