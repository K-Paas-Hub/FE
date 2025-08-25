import { apiClient } from './api';
import { ApiResponse } from '../types/api';
import { 
  SpellCheckRequest, 
  SpellCheckResult, 
  ResumeCheckResult,
  SpellCheckError,
  SpellCheckConfig
} from '../types/spellCheck';
import { ResumeFormData } from '../types/resume';
import { naverSpellCheckService } from './naverSpellCheckService';

// 기본 맞춤법 검사 규칙 (한국어)
const koreanSpellCheckRules = [
  {
    pattern: /[가-힣]+[ㅏ-ㅣ]+/g,
    description: '한글 맞춤법 확인 필요',
    suggestion: '맞춤법을 확인해주세요',
    type: 'spelling' as const,
    severity: 'medium' as const
  },
  {
    pattern: /[ㄱ-ㅎ]+/g,
    description: '자음만 있는 단어 확인 필요',
    suggestion: '완성된 한글 단어로 수정해주세요',
    type: 'spelling' as const,
    severity: 'high' as const
  },
  {
    pattern: /[ㅏ-ㅣ]+/g,
    description: '모음만 있는 단어 확인 필요',
    suggestion: '완성된 한글 단어로 수정해주세요',
    type: 'spelling' as const,
    severity: 'high' as const
  },
  {
    pattern: /\s{2,}/g,
    description: '연속된 공백 확인 필요',
    suggestion: '공백을 하나로 정리해주세요',
    type: 'punctuation' as const,
    severity: 'low' as const
  },
  {
    pattern: /[!]{2,}/g,
    description: '연속된 느낌표 확인 필요',
    suggestion: '느낌표를 하나로 정리해주세요',
    type: 'punctuation' as const,
    severity: 'low' as const
  },
  {
    pattern: /[?]{2,}/g,
    description: '연속된 물음표 확인 필요',
    suggestion: '물음표를 하나로 정리해주세요',
    type: 'punctuation' as const,
    severity: 'low' as const
  }
];

// 기본 맞춤법 검사 함수 (기존 로직)
const performBasicSpellCheck = async (
  text: string, 
  section: keyof ResumeFormData,
  config: SpellCheckConfig = {
    checkSpelling: true,
    checkGrammar: true,
    checkPunctuation: true,
    language: 'ko',
    severity: 'medium'
  }
): Promise<SpellCheckError[]> => {
  const errors: SpellCheckError[] = [];
  
  if (!text.trim()) {
    return errors;
  }

  // 기본 한국어 맞춤법 검사 규칙 적용
  koreanSpellCheckRules.forEach((rule, index) => {
    let match;
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    
    while ((match = regex.exec(text)) !== null) {
      if (match.index !== undefined) {
        const error: SpellCheckError = {
          id: `${section}-basic-${index}-${match.index}`,
          word: match[0],
          position: {
            start: match.index,
            end: match.index + match[0].length
          },
          errorType: rule.type,
          suggestion: rule.suggestion,
          description: rule.description,
          section,
          severity: rule.severity
        };
        
        errors.push(error);
      }
    }
  });

  // 추가적인 맞춤법 검사 규칙들
  const additionalRules = [
    // 이메일 형식 검사
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      description: '올바른 이메일 형식인지 확인',
      suggestion: '올바른 이메일 형식으로 입력해주세요',
      type: 'spelling' as const,
      severity: 'high' as const,
      section: 'email' as keyof ResumeFormData
    },
    // 전화번호 형식 검사
    {
      pattern: /^[0-9-+\s()]+$/,
      description: '올바른 전화번호 형식인지 확인',
      suggestion: '올바른 전화번호 형식으로 입력해주세요',
      type: 'spelling' as const,
      severity: 'medium' as const,
      section: 'phone' as keyof ResumeFormData
    }
  ];

  // 섹션별 특별 검사 규칙 적용
  additionalRules.forEach((rule, index) => {
    if (rule.section === section && !rule.pattern.test(text)) {
      const error: SpellCheckError = {
        id: `${section}-special-${index}`,
        word: text,
        position: { start: 0, end: text.length },
        errorType: rule.type,
        suggestion: rule.suggestion,
        description: rule.description,
        section,
        severity: rule.severity
      };
      
      errors.push(error);
    }
  });

  return errors;
};

// 통합 맞춤법 검사 함수 (기본 + 네이버)
const performIntegratedSpellCheck = async (
  text: string,
  section: keyof ResumeFormData,
  config: SpellCheckConfig = {
    checkSpelling: true,
    checkGrammar: true,
    checkPunctuation: true,
    language: 'ko',
    severity: 'medium'
  }
): Promise<SpellCheckError[]> => {
  const errors: SpellCheckError[] = [];
  
  if (!text.trim()) {
    return errors;
  }

  try {
    // 1. 기본 형식 검사 (빠른 검사)
    const basicErrors = await performBasicSpellCheck(text, section, config);
    errors.push(...basicErrors);

    // 2. 네이버 맞춤법 검사 (실제 맞춤법 검사)
    const naverResult = await naverSpellCheckService.checkText(text, section);
    
    if (naverResult.success && naverResult.data) {
      // 네이버 검사 결과를 섹션 정보와 함께 변환
      const naverErrors: SpellCheckError[] = naverResult.data.errors.map(error => ({
        ...error,
        section,
        id: `${section}-naver-${error.id}`
      }));
      
      errors.push(...naverErrors);
    }

  } catch (error) {
    console.error('통합 맞춤법 검사 오류:', error);
    // 네이버 검사 실패 시 기본 검사 결과만 반환
  }

  return errors;
};

// 단일 텍스트 검사
export const spellCheckService = {
  checkText: async (request: SpellCheckRequest): Promise<ApiResponse<SpellCheckResult>> => {
    try {
      const errors = await performIntegratedSpellCheck(request.text, request.section);
      const wordCount = request.text.split(/\s+/).filter(word => word.length > 0).length;
      
      const result: SpellCheckResult = {
        errors,
        statistics: {
          totalWords: wordCount,
          errorCount: errors.length,
          accuracy: wordCount > 0 ? ((wordCount - errors.length) / wordCount) * 100 : 100,
          checkedSections: [request.section]
        }
      };
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: '맞춤법 검사 중 오류가 발생했습니다.'
      };
    }
  },

  // 전체 이력서 검사
  checkResume: async (resumeData: ResumeFormData): Promise<ApiResponse<ResumeCheckResult>> => {
    try {
      const sections: Array<{
        section: keyof ResumeFormData;
        errors: SpellCheckError[];
        wordCount: number;
      }> = [];
      let totalWords = 0;
      let totalErrors = 0;
      
      // 각 섹션별로 검사
      const sectionsToCheck: (keyof ResumeFormData)[] = [
        'name', 'email', 'phone', 'nationality', 'visaType',
        'education', 'experience', 'skills', 'languages', 'introduction'
      ];
      
      for (const section of sectionsToCheck) {
        const text = resumeData[section] || '';
        if (text.trim()) {
          const errors = await performIntegratedSpellCheck(text, section);
          const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
          
          sections.push({
            section,
            errors,
            wordCount
          });
          
          totalWords += wordCount;
          totalErrors += errors.length;
        }
      }
      
      const result: ResumeCheckResult = {
        sections,
        overallStatistics: {
          totalWords,
          totalErrors,
          overallAccuracy: totalWords > 0 ? ((totalWords - totalErrors) / totalWords) * 100 : 100
        }
      };
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: '이력서 검사 중 오류가 발생했습니다.'
      };
    }
  },

  // 특정 섹션 검사
  checkSection: async (section: keyof ResumeFormData, text: string): Promise<ApiResponse<SpellCheckResult>> => {
    return spellCheckService.checkText({ text, section });
  },

  // 네이버 맞춤법 검사기만 사용 (고급 검사)
  checkWithNaver: async (text: string, section: keyof ResumeFormData): Promise<ApiResponse<SpellCheckResult>> => {
    return naverSpellCheckService.checkText(text, section);
  }
};
