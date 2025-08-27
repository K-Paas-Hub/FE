import { ApiResponse } from '../types/api';
import { 
  SpellCheckError, 
  SpellCheckResult, 
  SpellCheckRequest,
  SpellCheckOptions,
  SpellCheckStatus,
  SpellCheckRule
} from '../types/spellCheck';

// 맞춤법 검사 규칙 (향후 확장 예정)
const SPELLING_RULES = {
  // 띄어쓰기 규칙
  spacing: [
    { pattern: /([가-힣])([a-zA-Z])/g, fix: '$1 $2', description: '한글과 영문 사이 띄어쓰기' },
    { pattern: /([a-zA-Z])([가-힣])/g, fix: '$1 $2', description: '영문과 한글 사이 띄어쓰기' },
    { pattern: /([가-힣])([0-9])/g, fix: '$1 $2', description: '한글과 숫자 사이 띄어쓰기' },
    { pattern: /([0-9])([가-힣])/g, fix: '$1 $2', description: '숫자와 한글 사이 띄어쓰기' },
  ],
  
  // 맞춤법 규칙
  spelling: [
    { pattern: /되요/g, fix: '돼요', description: '되요 → 돼요' },
    { pattern: /안되요/g, fix: '안돼요', description: '안되요 → 안돼요' },
  ],
  
  // 문법 규칙
  grammar: [
    { pattern: /할수\s+있습니다/g, fix: '할 수 있습니다', description: '할수 → 할 수' },
    { pattern: /할수\s+있어요/g, fix: '할 수 있어요', description: '할수 → 할 수' },
  ]
};

// 단어 수 계산
const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// 가독성 점수 계산
const calculateReadability = (text: string): number => {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const avgWordsPerSentence = words.length / sentences.length;
  
  // 간단한 가독성 점수 (0-100)
  let score = 100;
  if (avgWordsPerSentence > 20) score -= 20;
  if (avgWordsPerSentence > 15) score -= 15;
  if (avgWordsPerSentence > 10) score -= 10;
  
  return Math.max(0, Math.min(100, score));
};

// 맞춤법 검사 수행
const performSpellCheck = (text: string, options: SpellCheckOptions): SpellCheckError[] => {
  const errors: SpellCheckError[] = [];
  let errorId = 1;

  // 띄어쓰기 검사
  if (options.checkSpacing) {
    SPELLING_RULES.spacing.forEach((rule: SpellCheckRule) => {
      let match;
      const regex = new RegExp(rule.pattern.source, 'g');
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `error_${errorId++}`,
          word: match[0],
          position: { start: match.index, end: match.index + match[0].length },
          errorType: 'spacing',
          suggestion: rule.fix,
          description: rule.description,
          severity: 'medium',
          confidence: 0.8,
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20)
        });
      }
    });
  }

  // 맞춤법 검사
  if (options.checkSpelling) {
    SPELLING_RULES.spelling.forEach((rule: SpellCheckRule) => {
      let match;
      const regex = new RegExp(rule.pattern.source, 'g');
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `error_${errorId++}`,
          word: match[0],
          position: { start: match.index, end: match.index + match[0].length },
          errorType: 'spelling',
          suggestion: rule.fix,
          description: rule.description,
          severity: 'high',
          confidence: 0.9,
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20)
        });
      }
    });
  }

  // 문법 검사
  if (options.checkGrammar) {
    SPELLING_RULES.grammar.forEach((rule: SpellCheckRule) => {
      let match;
      const regex = new RegExp(rule.pattern.source, 'g');
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `error_${errorId++}`,
          word: match[0],
          position: { start: match.index, end: match.index + match[0].length },
          errorType: 'grammar',
          suggestion: rule.fix,
          description: rule.description,
          severity: 'medium',
          confidence: 0.7,
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20)
        });
      }
    });
  }

  return errors;
};

// 실제 맞춤법 검사 API
export const spellCheckApi = {
  /**
   * 단일 텍스트 맞춤법 검사
   */
  checkText: async (request: SpellCheckRequest): Promise<ApiResponse<SpellCheckResult>> => {
    try {
      const startTime = Date.now();
      const { text, options } = request;
      
      // 텍스트 유효성 검사
      if (!text || text.trim().length === 0) {
        return {
          success: false,
          error: '검사할 텍스트를 입력해주세요.'
        };
      }

      // 맞춤법 검사 수행
      const errors = performSpellCheck(text, options);
      const processingTime = Date.now() - startTime;
      const totalWords = countWords(text);
      const errorCount = errors.length;
      const accuracy = totalWords > 0 ? Math.max(0, 100 - (errorCount / totalWords) * 100) : 100;
      const readability = calculateReadability(text);

      // 개선 제안 생성
      const suggestions = [];
      if (errorCount > 0) {
        suggestions.push(`총 ${errorCount}개의 오류를 발견했습니다.`);
      }

      const result: SpellCheckResult = {
        errors,
        statistics: {
          totalWords,
          errorCount,
          accuracy: Math.round(accuracy * 100) / 100,
          checkedSections: [],
          processingTime
        },
        suggestions: {
          overall: suggestions,
          readability
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

  /**
   * 배치 검사 (여러 텍스트)
   */
  checkBatch: async (requests: SpellCheckRequest[]): Promise<ApiResponse<SpellCheckResult[]>> => {
    try {
      const results: SpellCheckResult[] = [];
      
      for (const request of requests) {
        const result = await spellCheckApi.checkText(request);
        if (result.success && result.data) {
          results.push(result.data);
        }
      }

      return {
        success: true,
        data: results
      };
    } catch (error) {
      return {
        success: false,
        error: '배치 검사 중 오류가 발생했습니다.'
      };
    }
  },

  /**
   * 파일 업로드 및 검사
   */
  uploadAndCheck: async (file: File, options: SpellCheckOptions): Promise<ApiResponse<SpellCheckResult>> => {
    try {
      const content = await file.text();

      return await spellCheckApi.checkText({
        text: content,
        options
      });
    } catch (error) {
      return {
        success: false,
        error: '파일 업로드 중 오류가 발생했습니다.'
      };
    }
  },

  /**
   * 실시간 검사 상태 확인
   */
  getStatus: async (): Promise<SpellCheckStatus> => {
    return {
      isChecking: false,
      progress: 0
    };
  }
};
