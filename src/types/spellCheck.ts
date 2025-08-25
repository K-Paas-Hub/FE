import { ResumeFormData } from './resume';

// 맞춤법 오류 정보
export interface SpellCheckError {
  id: string;
  word: string;
  position: { start: number; end: number };
  errorType: 'spelling' | 'grammar' | 'punctuation';
  suggestion: string;
  description: string;
  section: keyof ResumeFormData;
  severity: 'low' | 'medium' | 'high';
}

// 맞춤법 검사 결과
export interface SpellCheckResult {
  errors: SpellCheckError[];
  statistics: {
    totalWords: number;
    errorCount: number;
    accuracy: number;
    checkedSections: (keyof ResumeFormData)[];
  };
}

// 맞춤법 검사 요청
export interface SpellCheckRequest {
  text: string;
  section: keyof ResumeFormData;
}

// 섹션별 검사 결과
export interface SectionCheckResult {
  section: keyof ResumeFormData;
  errors: SpellCheckError[];
  wordCount: number;
}

// 전체 이력서 검사 결과
export interface ResumeCheckResult {
  sections: SectionCheckResult[];
  overallStatistics: {
    totalWords: number;
    totalErrors: number;
    overallAccuracy: number;
  };
}

// 맞춤법 검사 설정
export interface SpellCheckConfig {
  checkSpelling: boolean;
  checkGrammar: boolean;
  checkPunctuation: boolean;
  language: 'ko' | 'en';
  severity: 'low' | 'medium' | 'high';
}

// 수정 제안 정보
export interface CorrectionSuggestion {
  original: string;
  suggested: string;
  confidence: number;
  reason: string;
}
