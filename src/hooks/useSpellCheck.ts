import { useState, useCallback } from 'react';
import { 
  SpellCheckResult, 
  SpellCheckOptions, 
  SpellCheckStatus,
  SpellCheckConfig,
  ResumeSpellCheckResult
} from '../types/spellCheck';
import { spellCheckService } from '../services/spellCheckService';

export const useSpellCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<SpellCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<SpellCheckStatus>({
    isChecking: false,
    progress: 0
  });
  
  // ✅ 새로운 상태 추가
  const [resumeResult, setResumeResult] = useState<ResumeSpellCheckResult | null>(null);



  // 단일 텍스트 검사
  const checkText = useCallback(async (text: string, options: Partial<SpellCheckOptions> = {}) => {
    try {
      setIsChecking(true);
      setError(null);
      setStatus({ isChecking: true, progress: 0 });

      const response = await spellCheckService.checkText(text, options);
      
      if (response.success && response.data) {
        setResult(response.data);
        setStatus({ isChecking: false, progress: 100 });
      } else {
        setError(response.error || '맞춤법 검사에 실패했습니다.');
        setStatus({ isChecking: false, progress: 0 });
      }
    } catch (err) {
      setError('맞춤법 검사 중 오류가 발생했습니다.');
      setStatus({ isChecking: false, progress: 0 });
    } finally {
      setIsChecking(false);
    }
  }, []);







  // ✅ 새로운 메서드 추가
  /**
   * 외국인 근로자 맞춤법 검사
   */
  const checkForeignWorkerSpelling = useCallback(async (
    text: string, 
    options: Partial<SpellCheckOptions> = {}
  ) => {
    try {
      setIsChecking(true);
      setError(null);
      setStatus({ isChecking: true, progress: 0 });

      const response = await spellCheckService.checkForeignWorkerSpelling(text, options);
      
      if (response.success && response.data) {
        // SpellCheckResult를 ResumeSpellCheckResult로 변환
        const resumeResult: ResumeSpellCheckResult = {
          generalErrors: response.data?.generalErrors || [],
          resumeSpecificErrors: [],
          categoryScores: {
            honorific: 100,
            tabooWords: 100,
            sentenceLength: 100,
            paragraphStructure: 100
          },
          overallResumeScore: 100,
          suggestions: {
            honorific: [],
            tabooWords: [],
            sentenceLength: [],
            paragraphStructure: []
          }
        };
        setResumeResult(resumeResult);
        setStatus({ isChecking: false, progress: 100 });
        return response;
      } else {
        setError(response.error || '외국인 근로자 맞춤법 검사에 실패했습니다.');
        setStatus({ isChecking: false, progress: 0 });
        return response;
      }
    } catch (err) {
      setError('외국인 근로자 맞춤법 검사 중 오류가 발생했습니다.');
      setStatus({ isChecking: false, progress: 0 });
      return { success: false, error: '외국인 근로자 맞춤법 검사 중 오류가 발생했습니다.' };
    } finally {
      setIsChecking(false);
    }
  }, []);

  // 결과 초기화
  const resetResult = useCallback(() => {
    setResult(null);
    setResumeResult(null);
    setError(null);
    setStatus({ isChecking: false, progress: 0 });
  }, []);

  // 오류 필터링
  const filterErrors = useCallback((errors: any[], filters: {
    severity?: 'low' | 'medium' | 'high';
    errorType?: string;
    section?: string;
  }) => {
    return spellCheckService.filterErrors(errors, filters.severity, filters.errorType);
  }, []);

  // 오류 통계 생성
  const generateErrorStatistics = useCallback((errors: any[]) => {
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
  }, []);

  // 기본 설정 가져오기
  const getDefaultConfig = useCallback((): SpellCheckConfig => {
    return spellCheckService.getDefaultConfig();
  }, []);

  return {
    // ✅ 외국인 맞춤법 검사 메서드
    checkText,
    checkForeignWorkerSpelling,
    isChecking,
    result,
    error,
    status,
    resetResult,
    filterErrors,
    generateErrorStatistics,
    resumeResult,
    // 기본 설정 가져오기
    getDefaultConfig
  };
};
