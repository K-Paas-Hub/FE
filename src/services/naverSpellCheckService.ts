import { ApiResponse } from '../types/api';
import { SpellCheckError, SpellCheckResult } from '../types/spellCheck';
import { ResumeFormData } from '../types/resume';

// 네이버 맞춤법 검사기 응답 타입
interface NaverSpellCheckResponse {
  message: {
    result: {
      errata_count: number;
      orgStr: string;
      html: string;
      notag_html: string;
      errata: Array<{
        help: string;
        orgStr: string;
        candWord: string;
        errorIdx: number;
        correctMethod: number;
        start: number;
        end: number;
      }>;
    };
  };
}

// 네이버 맞춤법 검사기 서비스
export const naverSpellCheckService = {
  /**
   * 네이버 맞춤법 검사기로 텍스트 검사
   */
  checkText: async (text: string, section?: keyof ResumeFormData): Promise<ApiResponse<SpellCheckResult>> => {
    try {
      if (!text.trim()) {
        return {
          success: true,
          data: {
            errors: [],
            statistics: {
              totalWords: 0,
              errorCount: 0,
              accuracy: 100,
              checkedSections: []
            }
          }
        };
      }

      // 네이버 맞춤법 검사기 API 호출
      const response = await fetch('https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://search.naver.com/',
          'Origin': 'https://search.naver.com'
        },
        body: `query=${encodeURIComponent(text)}`
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: any = await response.json();
      
      // 디버깅을 위한 로그
      console.log('네이버 API 응답:', data);
      
      // 안전한 응답 처리
      if (!data || !data.message || !data.message.result) {
        console.warn('네이버 API 응답 구조가 예상과 다릅니다:', data);
        return {
          success: true,
          data: {
            errors: [],
            statistics: {
              totalWords: text.split(/\s+/).filter(word => word.length > 0).length,
              errorCount: 0,
              accuracy: 100,
              checkedSections: section ? [section] : []
            }
          }
        };
      }
      
      // errata가 없는 경우 빈 배열로 처리
      const errata = data.message.result.errata || [];
      
      // 네이버 응답을 우리 타입으로 변환
      const errors: SpellCheckError[] = errata.map((error: any, index: number) => ({
        id: `naver-${index}`,
        word: error.orgStr || '',
        position: {
          start: error.start || 0,
          end: error.end || 0
        },
        errorType: 'spelling',
        suggestion: error.candWord || '',
        description: error.help || '',
        section: section || 'introduction',
        severity: 'medium'
      }));

      const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;

      return {
        success: true,
        data: {
          errors,
          statistics: {
            totalWords: wordCount,
            errorCount: errors.length,
            accuracy: wordCount > 0 ? ((wordCount - errors.length) / wordCount) * 100 : 100,
            checkedSections: section ? [section] : []
          }
        }
      };

    } catch (error) {
      console.error('네이버 맞춤법 검사 오류:', error);
      return {
        success: false,
        error: '네이버 맞춤법 검사 중 오류가 발생했습니다.'
      };
    }
  },

  /**
   * 여러 텍스트를 배치로 검사
   */
  checkBatch: async (texts: string[]): Promise<ApiResponse<SpellCheckResult[]>> => {
    try {
      const results = await Promise.all(
        texts.map(text => naverSpellCheckService.checkText(text))
      );

      const successfulResults = results
        .filter(result => result.success)
        .map(result => result.data!);

      return {
        success: true,
        data: successfulResults
      };

    } catch (error) {
      console.error('배치 맞춤법 검사 오류:', error);
      return {
        success: false,
        error: '배치 맞춤법 검사 중 오류가 발생했습니다.'
      };
    }
  }
};
