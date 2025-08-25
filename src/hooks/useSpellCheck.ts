import { useState, useCallback, useMemo } from 'react';
import { ResumeFormData } from '../types/resume';
import { 
  SpellCheckResult, 
  SpellCheckOptions, 
  SpellCheckStatus,
  SpellCheckConfig
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

  // 이력서 데이터가 있는지 확인
  const hasResumeData = useCallback((resumeData: ResumeFormData) => {
    return Object.values(resumeData).some(value => value && value.trim().length > 0);
  }, []);

  // 검사 가능한 섹션 목록
  const getCheckableSections = useCallback((resumeData: ResumeFormData) => {
    const sections: Array<{ key: keyof ResumeFormData; name: string; hasData: boolean }> = [
      { key: 'education', name: '학력', hasData: !!resumeData.education?.trim() },
      { key: 'experience', name: '경력', hasData: !!resumeData.experience?.trim() },
      { key: 'skills', name: '기술', hasData: !!resumeData.skills?.trim() },
      { key: 'languages', name: '언어', hasData: !!resumeData.languages?.trim() },
      { key: 'introduction', name: '자기소개', hasData: !!resumeData.introduction?.trim() }
    ];
    
    return sections.filter(section => section.hasData);
  }, []);

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

  // 이력서 전체 검사
  const checkResume = useCallback(async (resumeData: ResumeFormData, options: Partial<SpellCheckOptions> = {}) => {
    try {
      setIsChecking(true);
      setError(null);
      setStatus({ isChecking: true, progress: 0 });

      const response = await spellCheckService.checkResume(resumeData, options);
      
      if (response.success && response.data) {
        // ResumeCheckResult를 SpellCheckResult로 변환
        const totalErrors = response.data.overallStatistics.totalErrors;
        const totalWords = response.data.overallStatistics.totalWords;
        
        const spellCheckResult: SpellCheckResult = {
          errors: response.data.sections.flatMap(section => section.errors),
          statistics: {
            totalWords,
            errorCount: totalErrors,
            accuracy: response.data.overallStatistics.overallAccuracy,
            checkedSections: response.data.sections.map(s => s.section),
            processingTime: response.data.overallStatistics.processingTime
          },
          suggestions: {
            overall: totalErrors > 0 ? [`총 ${totalErrors}개의 오류를 발견했습니다.`] : [],
            readability: 80 // 기본값
          }
        };
        
        setResult(spellCheckResult);
        setStatus({ isChecking: false, progress: 100 });
      } else {
        setError(response.error || '이력서 검사에 실패했습니다.');
        setStatus({ isChecking: false, progress: 0 });
      }
    } catch (err) {
      setError('이력서 검사 중 오류가 발생했습니다.');
      setStatus({ isChecking: false, progress: 0 });
    } finally {
      setIsChecking(false);
    }
  }, []);

  // 특정 섹션 검사
  const checkSection = useCallback(async (section: keyof ResumeFormData, text: string, options: Partial<SpellCheckOptions> = {}) => {
    try {
      setIsChecking(true);
      setError(null);
      setStatus({ isChecking: true, progress: 0 });

      const response = await spellCheckService.checkSection(section, text, options);
      
      if (response.success && response.data) {
        setResult(response.data);
        setStatus({ isChecking: false, progress: 100 });
        return response;
      } else {
        setError(response.error || '섹션 검사에 실패했습니다.');
        setStatus({ isChecking: false, progress: 0 });
        return response;
      }
    } catch (err) {
      setError('섹션 검사 중 오류가 발생했습니다.');
      setStatus({ isChecking: false, progress: 0 });
      return { success: false, error: '섹션 검사 중 오류가 발생했습니다.' };
    } finally {
      setIsChecking(false);
    }
  }, []);

  // 파일 업로드 및 검사
  const uploadAndCheck = useCallback(async (file: File, options: Partial<SpellCheckOptions> = {}) => {
    try {
      setIsChecking(true);
      setError(null);
      setStatus({ isChecking: true, progress: 0 });

      const response = await spellCheckService.uploadAndCheck(file, options);
      
      if (response.success && response.data) {
        setResult(response.data);
        setStatus({ isChecking: false, progress: 100 });
      } else {
        setError(response.error || '파일 검사에 실패했습니다.');
        setStatus({ isChecking: false, progress: 0 });
      }
    } catch (err) {
      setError('파일 업로드 중 오류가 발생했습니다.');
      setStatus({ isChecking: false, progress: 0 });
    } finally {
      setIsChecking(false);
    }
  }, []);

  // 결과 초기화
  const resetResult = useCallback(() => {
    setResult(null);
    setError(null);
    setStatus({ isChecking: false, progress: 0 });
  }, []);

  // 오류 필터링
  const filterErrors = useCallback((severity?: 'low' | 'medium' | 'high', errorType?: string) => {
    if (!result) return [];
    return spellCheckService.filterErrors(result.errors, severity, errorType);
  }, [result]);

  // 오류 통계
  const errorStats = useMemo(() => {
    if (!result) return null;
    return spellCheckService.generateErrorStatistics(result.errors);
  }, [result]);

  // 기본 설정 가져오기
  const getDefaultConfig = useCallback((): SpellCheckConfig => {
    return spellCheckService.getDefaultConfig();
  }, []);

  return {
    // 상태
    isChecking,
    result,
    error,
    status,
    
    // 검사 함수들
    checkText,
    checkResume,
    checkSection,
    uploadAndCheck,
    
    // 유틸리티 함수들
    hasResumeData,
    getCheckableSections,
    resetResult,
    filterErrors,
    errorStats,
    getDefaultConfig
  };
};
