import { ResumeFormData } from './resume';

// 맞춤법 오류 정보
export interface SpellCheckError {
  id: string;
  word: string;
  position: { start: number; end: number };
  // ✅ 기존 errorType 확장
  errorType: 'spelling' | 'grammar' | 'punctuation' | 'spacing' | 'resume_specific';
  suggestion: string;
  description: string;
  section?: keyof ResumeFormData;
  severity: 'low' | 'medium' | 'high';
  confidence: number; // 신뢰도 (0-1)
  context?: string; // 오류 주변 문맥
  // ✅ 새로운 필드 추가 (기존과 호환)
  resumeCategory?: 'honorific' | 'tabooWords' | 'sentenceLength' | 'paragraphStructure';
  improvement?: string; // 구체적인 개선 제안
}

// 맞춤법 검사 결과
export interface SpellCheckResult {
  errors: SpellCheckError[];
  statistics: {
    totalWords: number;
    errorCount: number;
    accuracy: number;
    checkedSections: (keyof ResumeFormData)[];
    processingTime: number; // 처리 시간 (ms)
  };
  suggestions: {
    overall: string[]; // 전체 개선 제안
    readability: number; // 가독성 점수 (0-100)
  };
}

// 맞춤법 검사 요청
export interface SpellCheckRequest {
  text: string;
  section?: keyof ResumeFormData;
  options: SpellCheckOptions;
}

// 맞춤법 검사 옵션
export interface SpellCheckOptions {
  checkSpelling: boolean;
  checkGrammar: boolean;
  checkPunctuation: boolean;
  checkSpacing: boolean;
  // ✅ 새로운 옵션 추가
  checkResumeSpecific?: boolean;
  resumeOptions?: {
    checkHonorific: boolean;
    checkTabooWords: boolean;
    checkSentenceLength: boolean;
    checkParagraphStructure: boolean;
  };
  language: 'ko' | 'en' | 'vi' | 'km' | 'ne' | 'id' | 'zh' | 'th' | 'auto';
  severity: 'low' | 'medium' | 'high';
  includeSuggestions: boolean;
}

// 섹션별 검사 결과
export interface SectionCheckResult {
  section: keyof ResumeFormData;
  errors: SpellCheckError[];
  wordCount: number;
  accuracy: number;
}

// 전체 이력서 검사 결과
export interface ResumeCheckResult {
  sections: SectionCheckResult[];
  overallStatistics: {
    totalWords: number;
    totalErrors: number;
    overallAccuracy: number;
    processingTime: number;
  };
}

// ✅ 새로운 타입 추가 (기존과 독립적)
export interface ResumeSpellCheckResult {
  generalErrors: SpellCheckError[];
  resumeSpecificErrors: SpellCheckError[];
  categoryScores: {
    honorific: number;
    tabooWords: number;
    sentenceLength: number;
    paragraphStructure: number;
  };
  overallResumeScore: number;
  suggestions: {
    honorific: string[];
    tabooWords: string[];
    sentenceLength: string[];
    paragraphStructure: string[];
  };
}

// 맞춤법 검사 설정
export interface SpellCheckConfig {
  checkSpelling: boolean;
  checkGrammar: boolean;
  checkPunctuation: boolean;
  checkSpacing: boolean;
  language: 'ko' | 'en' | 'vi' | 'km' | 'ne' | 'id' | 'zh' | 'th' | 'auto';
  severity: 'low' | 'medium' | 'high';
  includeSuggestions: boolean;
}

// 수정 제안 정보
export interface CorrectionSuggestion {
  original: string;
  suggested: string;
  confidence: number;
  reason: string;
  examples?: string[]; // 사용 예시
}

// 실시간 검사 상태
export interface SpellCheckStatus {
  isChecking: boolean;
  progress: number; // 0-100
  currentSection?: string;
  estimatedTime?: number; // 예상 남은 시간 (초)
}

// 파일 업로드 결과
export interface FileUploadResult {
  filename: string;
  content: string;
  fileType: 'txt' | 'docx' | 'pdf';
  size: number;
  encoding: string;
}

// 검사 히스토리
export interface SpellCheckHistory {
  id: string;
  timestamp: Date;
  text: string;
  result: SpellCheckResult;
  options: SpellCheckOptions;
}
