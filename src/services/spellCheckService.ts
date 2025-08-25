import { ApiResponse } from '../types/api';
import { 
  SpellCheckRequest, 
  SpellCheckResult, 
  ResumeCheckResult,
  SpellCheckError,
  SpellCheckConfig
} from '../types/spellCheck';
import { ResumeFormData } from '../types/resume';
import { spellCheckApi } from './spellCheckApi';

// 껍데기 맞춤법 검사 함수 (UI만 작동)
const performDummySpellCheck = async (
  text: string,
  section: keyof ResumeFormData
): Promise<SpellCheckError[]> => {
  // 실제 검사 로직 제거 - UI만 작동
  return [];
};

// 껍데기 맞춤법 검사 서비스
export const spellCheckService = {
  // 단일 텍스트 검사 (껍데기)
  checkText: async (request: SpellCheckRequest): Promise<ApiResponse<SpellCheckResult>> => {
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

  // 전체 이력서 검사 (껍데기)
  checkResume: async (resumeData: ResumeFormData): Promise<ApiResponse<ResumeCheckResult>> => {
    // 아무것도 하지 않음
    const result: ResumeCheckResult = {
      sections: [],
      overallStatistics: {
        totalWords: 0,
        totalErrors: 0,
        overallAccuracy: 100
      }
    };
    
    return {
      success: true,
      data: result
    };
  },

  // 특정 섹션 검사 (껍데기)
  checkSection: async (section: keyof ResumeFormData, text: string): Promise<ApiResponse<SpellCheckResult>> => {
    return spellCheckService.checkText({ text, section });
  }
};
