import { ApiResponse } from '../types/api';
import { 
  SpellCheckRequest, 
  SpellCheckResult, 
  ResumeCheckResult,
  SpellCheckError,
  SpellCheckOptions,
  SpellCheckConfig,
  SectionCheckResult
} from '../types/spellCheck';
import { ResumeFormData } from '../types/resume';
import { spellCheckApi } from './spellCheckApi';

// 기본 검사 설정
const DEFAULT_SPELL_CHECK_OPTIONS: SpellCheckOptions = {
  checkSpelling: true,
  checkGrammar: true,
  checkPunctuation: true,
  checkSpacing: true,
  language: 'ko',
  severity: 'medium',
  includeSuggestions: true
};

// 실제 맞춤법 검사 서비스
export const spellCheckService = {
  /**
   * 단일 텍스트 맞춤법 검사
   */
  checkText: async (text: string, options: Partial<SpellCheckOptions> = {}): Promise<ApiResponse<SpellCheckResult>> => {
    const mergedOptions = { ...DEFAULT_SPELL_CHECK_OPTIONS, ...options };
    
    const request: SpellCheckRequest = {
      text,
      options: mergedOptions
    };

    return await spellCheckApi.checkText(request);
  },

  /**
   * 전체 이력서 맞춤법 검사
   */
  checkResume: async (resumeData: ResumeFormData, options: Partial<SpellCheckOptions> = {}): Promise<ApiResponse<ResumeCheckResult>> => {
    try {
      const mergedOptions = { ...DEFAULT_SPELL_CHECK_OPTIONS, ...options };
      const sections: SectionCheckResult[] = [];
      let totalWords = 0;
      let totalErrors = 0;

      // 각 섹션별로 검사
      const sectionKeys: (keyof ResumeFormData)[] = ['education', 'experience', 'skills', 'languages', 'introduction'];
      
      for (const sectionKey of sectionKeys) {
        const sectionText = resumeData[sectionKey];
        if (sectionText && sectionText.trim().length > 0) {
          const result = await spellCheckApi.checkText({
            text: sectionText,
            section: sectionKey,
            options: mergedOptions
          });

          if (result.success && result.data) {
            const sectionResult: SectionCheckResult = {
              section: sectionKey,
              errors: result.data.errors,
              wordCount: result.data.statistics.totalWords,
              accuracy: result.data.statistics.accuracy
            };

            sections.push(sectionResult);
            totalWords += result.data.statistics.totalWords;
            totalErrors += result.data.statistics.errorCount;
          }
        }
      }

      const overallAccuracy = totalWords > 0 ? Math.round((100 - (totalErrors / totalWords) * 100) * 100) / 100 : 100;

      const resumeResult: ResumeCheckResult = {
        sections,
        overallStatistics: {
          totalWords,
          totalErrors,
          overallAccuracy,
          processingTime: Date.now() // 실제로는 각 섹션의 처리 시간을 합산해야 함
        }
      };

      return {
        success: true,
        data: resumeResult
      };
    } catch (error) {
      return {
        success: false,
        error: '이력서 검사 중 오류가 발생했습니다.'
      };
    }
  },

  /**
   * 특정 섹션 검사
   */
  checkSection: async (section: keyof ResumeFormData, text: string, options: Partial<SpellCheckOptions> = {}): Promise<ApiResponse<SpellCheckResult>> => {
    const mergedOptions = { ...DEFAULT_SPELL_CHECK_OPTIONS, ...options };
    
    const request: SpellCheckRequest = {
      text,
      section,
      options: mergedOptions
    };

    return await spellCheckApi.checkText(request);
  },

  /**
   * 배치 검사 (여러 텍스트)
   */
  checkBatch: async (texts: string[], options: Partial<SpellCheckOptions> = {}): Promise<ApiResponse<SpellCheckResult[]>> => {
    const mergedOptions = { ...DEFAULT_SPELL_CHECK_OPTIONS, ...options };
    
    const requests: SpellCheckRequest[] = texts.map(text => ({
      text,
      options: mergedOptions
    }));

    return await spellCheckApi.checkBatch(requests);
  },

  /**
   * 파일 업로드 및 검사
   */
  uploadAndCheck: async (file: File, options: Partial<SpellCheckOptions> = {}): Promise<ApiResponse<SpellCheckResult>> => {
    const mergedOptions = { ...DEFAULT_SPELL_CHECK_OPTIONS, ...options };
    return await spellCheckApi.uploadAndCheck(file, mergedOptions);
  },

  /**
   * 검사 설정 가져오기
   */
  getDefaultConfig: (): SpellCheckConfig => {
    return {
      checkSpelling: true,
      checkGrammar: true,
      checkPunctuation: true,
      checkSpacing: true,
      language: 'ko',
      severity: 'medium',
      includeSuggestions: true
    };
  },

  /**
   * 검사 설정 업데이트
   */
  updateConfig: (config: Partial<SpellCheckConfig>): SpellCheckConfig => {
    return { ...DEFAULT_SPELL_CHECK_OPTIONS, ...config };
  },

  /**
   * 오류 필터링
   */
  filterErrors: (errors: SpellCheckError[], severity?: 'low' | 'medium' | 'high', errorType?: string): SpellCheckError[] => {
    let filtered = errors;

    if (severity) {
      filtered = filtered.filter(error => error.severity === severity);
    }

    if (errorType) {
      filtered = filtered.filter(error => error.errorType === errorType);
    }

    return filtered;
  },

  /**
   * 오류 통계 생성
   */
  generateErrorStatistics: (errors: SpellCheckError[]) => {
    const stats = {
      total: errors.length,
      byType: {
        spelling: 0,
        grammar: 0,
        punctuation: 0,
        spacing: 0
      },
      bySeverity: {
        low: 0,
        medium: 0,
        high: 0
      }
    };

    errors.forEach(error => {
      stats.byType[error.errorType]++;
      stats.bySeverity[error.severity]++;
    });

    return stats;
  }
};
