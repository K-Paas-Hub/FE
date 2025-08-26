import { ApiResponse } from '../types/api';
import { 
  SpellCheckRequest, 
  SpellCheckResult, 
  SpellCheckError,
  SpellCheckOptions,
  SpellCheckConfig,
  ResumeSpellCheckResult
} from '../types/spellCheck';
import { spellCheckApi } from './spellCheckApi';
import { RESUME_SPELL_CHECK_RULES } from '../constants/resumeSpellCheck';

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
        spacing: 0,
        resume_specific: 0
      },
      bySeverity: {
        low: 0,
        medium: 0,
        high: 0
      }
    };

    errors.forEach(error => {
      const errorType = error.errorType as keyof typeof stats.byType;
      const severity = error.severity as keyof typeof stats.bySeverity;
      
      if (errorType in stats.byType) {
        stats.byType[errorType]++;
      }
      if (severity in stats.bySeverity) {
        stats.bySeverity[severity]++;
      }
    });

    return stats;
  },

  // ✅ 새로운 메서드 추가 - 외국인 근로자 맞춤법 검사
  /**
   * 외국인 근로자 맞춤법 검사
   */
  checkForeignWorkerSpelling: async (text: string, options: Partial<SpellCheckOptions> = {}): Promise<ApiResponse<ResumeSpellCheckResult>> => {
    try {
      const mergedOptions: SpellCheckOptions = {
        checkSpelling: true,
        checkGrammar: true,
        checkPunctuation: true,
        checkSpacing: true,
        language: 'ko',
        severity: 'medium',
        includeSuggestions: true,
        ...options
      };

      // 일반 맞춤법 검사
      const generalResult = await spellCheckApi.checkText({
        text,
        options: mergedOptions
      });

      // 외국인 근로자 맞춤법 검사
      const foreignWorkerErrors = await spellCheckService.performForeignWorkerSpellingCheck(text);

      // 카테고리별 점수 계산
      const categoryScores = spellCheckService.calculateForeignWorkerCategoryScores(foreignWorkerErrors);
      const overallResumeScore = spellCheckService.calculateOverallResumeScore(categoryScores);

      // 개선 제안 생성
      const suggestions = spellCheckService.generateForeignWorkerSuggestions(foreignWorkerErrors);

      const result: ResumeSpellCheckResult = {
        generalErrors: generalResult.success ? generalResult.data?.errors || [] : [],
        resumeSpecificErrors: foreignWorkerErrors,
        categoryScores,
        overallResumeScore,
        suggestions
      };

      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: '외국인 근로자 맞춤법 검사 중 오류가 발생했습니다.'
      };
    }
  },

  // ✅ 내부 메서드 추가
  /**
   * 외국인 근로자 맞춤법 검사 수행
   */
  performForeignWorkerSpellingCheck: async (text: string): Promise<SpellCheckError[]> => {
    const errors: SpellCheckError[] = [];
    
    // 발음 오류 검사
    errors.push(...spellCheckService.checkPronunciationErrors(text));
    
    // 받침 오류 검사
    errors.push(...spellCheckService.checkFinalConsonantErrors(text));
    
    // 조사 오류 검사
    errors.push(...spellCheckService.checkParticleErrors(text));
    
    // 띄어쓰기 오류 검사
    errors.push(...spellCheckService.checkSpacingErrors(text));
    
    // 자주 틀리는 단어 검사
    errors.push(...spellCheckService.checkCommonWordErrors(text));
    
    // 문장 끝 표현 오류 검사
    errors.push(...spellCheckService.checkEndingErrors(text));
    
    return errors;
  },

  /**
   * 발음 오류 검사
   */
  checkPronunciationErrors: (text: string): SpellCheckError[] => {
    const errors: SpellCheckError[] = [];
    const pronunciationErrors = RESUME_SPELL_CHECK_RULES.pronunciationErrors;
    
    Object.entries(pronunciationErrors).forEach(([wrong, correct]) => {
      const regex = new RegExp(wrong, 'g');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `pronunciation_${Date.now()}_${Math.random()}`,
          word: match[0],
          position: { start: match.index, end: match.index + match[0].length },
          errorType: 'resume_specific',
          suggestion: correct,
          description: `"${wrong}"는 "${correct}"의 잘못된 발음입니다.`,
          severity: 'high',
          confidence: 0.9,
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20),
          resumeCategory: 'honorific',
          improvement: `"${wrong}" → "${correct}"로 수정하세요.`
        });
      }
    });
    
    return errors;
  },

  /**
   * 받침 오류 검사
   */
  checkFinalConsonantErrors: (text: string): SpellCheckError[] => {
    const errors: SpellCheckError[] = [];
    const finalConsonantErrors = RESUME_SPELL_CHECK_RULES.finalConsonantErrors;
    
    Object.entries(finalConsonantErrors).forEach(([wrong, correct]) => {
      const regex = new RegExp(wrong, 'g');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `final_consonant_${Date.now()}_${Math.random()}`,
          word: match[0],
          position: { start: match.index, end: match.index + match[0].length },
          errorType: 'resume_specific',
          suggestion: correct,
          description: `"${wrong}"는 받침이 잘못되었습니다.`,
          severity: 'medium',
          confidence: 0.8,
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20),
          resumeCategory: 'tabooWords',
          improvement: `"${wrong}" → "${correct}"로 수정하세요.`
        });
      }
    });
    
    return errors;
  },

  /**
   * 조사 오류 검사
   */
  checkParticleErrors: (text: string): SpellCheckError[] => {
    const errors: SpellCheckError[] = [];
    const particleErrors = RESUME_SPELL_CHECK_RULES.particleErrors;
    
    Object.entries(particleErrors).forEach(([wrong, correct]) => {
      const regex = new RegExp(wrong, 'g');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `particle_${Date.now()}_${Math.random()}`,
          word: match[0],
          position: { start: match.index, end: match.index + match[0].length },
          errorType: 'resume_specific',
          suggestion: correct,
          description: `"${wrong}"는 조사가 잘못되었습니다.`,
          severity: 'medium',
          confidence: 0.8,
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20),
          resumeCategory: 'sentenceLength',
          improvement: `"${wrong}" → "${correct}"로 수정하세요.`
        });
      }
    });
    
    return errors;
  },

  /**
   * 띄어쓰기 오류 검사
   */
  checkSpacingErrors: (text: string): SpellCheckError[] => {
    const errors: SpellCheckError[] = [];
    const spacingErrors = RESUME_SPELL_CHECK_RULES.spacingErrors;
    
    Object.entries(spacingErrors).forEach(([wrong, correct]) => {
      const regex = new RegExp(wrong, 'g');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `spacing_${Date.now()}_${Math.random()}`,
          word: match[0],
          position: { start: match.index, end: match.index + match[0].length },
          errorType: 'resume_specific',
          suggestion: correct,
          description: `"${wrong}"는 띄어쓰기가 잘못되었습니다.`,
          severity: 'medium',
          confidence: 0.8,
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20),
          resumeCategory: 'paragraphStructure',
          improvement: `"${wrong}" → "${correct}"로 수정하세요.`
        });
      }
    });
    
    return errors;
  },

  /**
   * 자주 틀리는 단어 검사
   */
  checkCommonWordErrors: (text: string): SpellCheckError[] => {
    const errors: SpellCheckError[] = [];
    const commonWordErrors = RESUME_SPELL_CHECK_RULES.commonWordErrors;
    
    Object.entries(commonWordErrors).forEach(([wrong, correct]) => {
      const regex = new RegExp(wrong, 'g');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `common_word_${Date.now()}_${Math.random()}`,
          word: match[0],
          position: { start: match.index, end: match.index + match[0].length },
          errorType: 'resume_specific',
          suggestion: correct,
          description: `"${wrong}"는 자주 틀리는 단어입니다.`,
          severity: 'medium',
          confidence: 0.8,
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20),
          resumeCategory: 'paragraphStructure',
          improvement: `"${wrong}" → "${correct}"로 수정하세요.`
        });
      }
    });
    
    return errors;
  },

  /**
   * 문장 끝 표현 오류 검사
   */
  checkEndingErrors: (text: string): SpellCheckError[] => {
    const errors: SpellCheckError[] = [];
    const endingErrors = RESUME_SPELL_CHECK_RULES.endingErrors;
    
    Object.entries(endingErrors).forEach(([wrong, correct]) => {
      const regex = new RegExp(wrong, 'g');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `ending_${Date.now()}_${Math.random()}`,
          word: match[0],
          position: { start: match.index, end: match.index + match[0].length },
          errorType: 'resume_specific',
          suggestion: correct,
          description: `"${wrong}"는 문장 끝 표현이 잘못되었습니다.`,
          severity: 'low',
          confidence: 0.7,
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20),
          resumeCategory: 'honorific',
          improvement: `"${wrong}" → "${correct}"로 수정하세요.`
        });
      }
    });
    
    return errors;
  },

  /**
   * 카테고리별 점수 계산
   */
  calculateForeignWorkerCategoryScores: (errors: SpellCheckError[]) => {
    const categoryCounts = {
      honorific: 0,
      tabooWords: 0,
      sentenceLength: 0,
      paragraphStructure: 0,
      experienceDescription: 0
    };
    
    errors.forEach(error => {
      if (error.resumeCategory && error.resumeCategory in categoryCounts) {
        const category = error.resumeCategory as keyof typeof categoryCounts;
        categoryCounts[category]++;
      }
    });
    
    // 점수 계산 (오류가 적을수록 높은 점수)
    return {
      honorific: Math.max(0, 100 - categoryCounts.honorific * 10),
      tabooWords: Math.max(0, 100 - categoryCounts.tabooWords * 8),
      sentenceLength: Math.max(0, 100 - categoryCounts.sentenceLength * 5),
      paragraphStructure: Math.max(0, 100 - categoryCounts.paragraphStructure * 15),
      experienceDescription: Math.max(0, 100 - categoryCounts.experienceDescription * 8)
    };
  },

  /**
   * 전체 점수 계산
   */
  calculateOverallForeignWorkerScore: (categoryScores: {
    pronunciation: number;
    finalConsonant: number;
    particle: number;
    spacing: number;
    commonWord: number;
    ending: number;
  }) => {
    const scores = Object.values(categoryScores);
    return Math.round(scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length);
  },

  /**
   * 개선 제안 생성
   */
  generateForeignWorkerSuggestions: (errors: SpellCheckError[]) => {
    const suggestions = {
      honorific: [] as string[],
      tabooWords: [] as string[],
      sentenceLength: [] as string[],
      paragraphStructure: [] as string[],
      experienceDescription: [] as string[]
    };
    
    errors.forEach(error => {
      if (error.improvement && error.resumeCategory && error.resumeCategory in suggestions) {
        const category = error.resumeCategory as keyof typeof suggestions;
        suggestions[category].push(error.improvement);
      }
    });
    
    // 중복 제거
    Object.keys(suggestions).forEach(key => {
      const categoryKey = key as keyof typeof suggestions;
      suggestions[categoryKey] = Array.from(new Set(suggestions[categoryKey]));
    });
    
    return suggestions;
  },

  /**
   * 전체 점수 계산
   */
  calculateOverallResumeScore: (categoryScores: {
    honorific: number;
    tabooWords: number;
    sentenceLength: number;
    paragraphStructure: number;
    experienceDescription: number;
  }) => {
    const scores = Object.values(categoryScores);
    return Math.round(scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length);
  }
};
