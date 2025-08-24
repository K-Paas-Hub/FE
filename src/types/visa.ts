export interface VisaType {
  id: string;
  name: string;
  fullName: string;
  description: string;
  duration: string;
  extension: boolean;
  documents: readonly string[];
}

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
