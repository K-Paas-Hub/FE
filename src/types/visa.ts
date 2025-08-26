// 비자 정보 관련 타입 정의
export interface VisaInfo {
  hasVisa: boolean;
  visaType: string;
  issueDate: string;
  expiryDate: string;
}

export interface VisaType {
  id: string;
  name: string;
  fullName: string;
  description: string;
  duration: string;
  extension: boolean;
  documents: readonly string[];
}

// 비자 유형 옵션 (폼용)
export interface VisaTypeOption {
  value: string;
  label: string;
}

export const VISA_TYPE_OPTIONS: VisaTypeOption[] = [
  { value: '', label: '비자 유형을 선택하세요' },
  { value: 'E-1', label: 'E-1 (조약에 의한 무역업무)' },
  { value: 'E-2', label: 'E-2 (투자)' },
  { value: 'E-3', label: 'E-3 (연구)' },
  { value: 'E-4', label: 'E-4 (기술지도)' },
  { value: 'E-5', label: 'E-5 (전문직업)' },
  { value: 'E-6', label: 'E-6 (예술흥행)' },
  { value: 'E-7', label: 'E-7 (특정활동)' },
  { value: 'E-8', label: 'E-8 (연수취업)' },
  { value: 'E-9', label: 'E-9 (비전문취업)' },
  { value: 'E-10', label: 'E-10 (선원취업)' },
  { value: 'F-1', label: 'F-1 (방문동거)' },
  { value: 'F-2', label: 'F-2 (거주)' },
  { value: 'F-3', label: 'F-3 (동반가족)' },
  { value: 'F-4', label: 'F-4 (재외동포)' },
  { value: 'F-5', label: 'F-5 (영주)' },
  { value: 'F-6', label: 'F-6 (결혼이민)' },
  { value: 'D-1', label: 'D-1 (문화예술)' },
  { value: 'D-2', label: 'D-2 (유학)' },
  { value: 'D-3', label: 'D-3 (산업연수)' },
  { value: 'D-4', label: 'D-4 (일반연수)' },
  { value: 'D-5', label: 'D-5 (취재)' },
  { value: 'D-6', label: 'D-6 (종교)' },
  { value: 'D-7', label: 'D-7 (주재)' },
  { value: 'D-8', label: 'D-8 (기업투자)' },
  { value: 'D-9', label: 'D-9 (무역경영)' },
  { value: 'D-10', label: 'D-10 (구직)' },
  { value: 'H-1', label: 'H-1 (관광취업)' },
  { value: 'H-2', label: 'H-2 (방문취업)' },
  { value: 'C-1', label: 'C-1 (단기방문)' },
  { value: 'C-2', label: 'C-2 (단기상용)' },
  { value: 'C-3', label: 'C-3 (단기종합)' },
  { value: 'C-4', label: 'C-4 (단기취업)' },
  { value: '기타', label: '기타' }
];

export interface VisaStep {
  id: number;
  name: string;
  description: string;
  completed?: boolean;
}

export interface VisaDocument {
  id: string;
  name: string;
  required: boolean;
  status: 'pending' | 'completed' | 'missing';
  description?: string;
  template?: string;
}

export interface VisaApplication {
  id: string;
  visaType: string;
  status: 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected';
  documents: VisaDocument[];
  steps: VisaStep[];
  submittedAt?: Date;
  estimatedCompletion?: Date;
}
