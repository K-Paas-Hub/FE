import { ApiResponse } from '../types/api';
import { SpellCheckError, SpellCheckResult } from '../types/spellCheck';
import { ResumeFormData } from '../types/resume';

// 껍데기 맞춤법 검사 서비스 (UI만 작동)
export const spellCheckApi = {
  /**
   * 껍데기 맞춤법 검사 (아무것도 안함)
   */
  checkText: async (text: string, section?: keyof ResumeFormData): Promise<ApiResponse<SpellCheckResult>> => {
    // 아무것도 하지 않음
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
  },

  /**
   * 껍데기 배치 검사 (아무것도 안함)
   */
  checkBatch: async (texts: string[]): Promise<ApiResponse<SpellCheckResult[]>> => {
    // 아무것도 하지 않음
    return {
      success: true,
      data: []
    };
  }
};
