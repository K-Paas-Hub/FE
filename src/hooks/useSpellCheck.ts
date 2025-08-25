import { useState, useCallback } from 'react';
import { spellCheckService } from '../services/spellCheckService';
import { 
  SpellCheckResult, 
  ResumeCheckResult, 
  SpellCheckError,
  SpellCheckRequest 
} from '../types/spellCheck';
import { ResumeFormData } from '../types/resume';

interface SpellCheckState {
  loading: boolean;
  error: string | null;
  result: ResumeCheckResult | null;
  lastChecked: Date | null;
  sectionResults: Record<string, SpellCheckResult | undefined>;
  sectionLoading: Record<string, boolean>;
}

export const useSpellCheck = () => {
  const [state, setState] = useState<SpellCheckState>({
    loading: false,
    error: null,
    result: null,
    lastChecked: null,
    sectionResults: {},
    sectionLoading: {}
  });

  // 기본 맞춤법 검사 (기존 로직 + 네이버)
  const checkText = useCallback(async (text: string, section: keyof ResumeFormData) => {
    try {
      setState(prev => ({
        ...prev,
        error: null,
        sectionLoading: { ...prev.sectionLoading, [section]: true }
      }));

      const response = await spellCheckService.checkText({ text, section });
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          sectionResults: {
            ...prev.sectionResults,
            [section]: response.data
          },
          sectionLoading: { ...prev.sectionLoading, [section]: false }
        }));
        return response.data;
      } else {
        throw new Error(response.error || '맞춤법 검사에 실패했습니다.');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '맞춤법 검사 중 오류가 발생했습니다.',
        sectionLoading: { ...prev.sectionLoading, [section]: false }
      }));
      return null;
    }
  }, []);



  // 전체 이력서 검사
  const checkResume = useCallback(async (resumeData: ResumeFormData) => {
    try {
      setState(prev => ({
        ...prev,
        loading: true,
        error: null
      }));

      const response = await spellCheckService.checkResume(resumeData);
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          result: response.data as ResumeCheckResult,
          lastChecked: new Date(),
          loading: false
        }));
        return response.data;
      } else {
        throw new Error(response.error || '이력서 검사에 실패했습니다.');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '이력서 검사 중 오류가 발생했습니다.',
        loading: false
      }));
      return null;
    }
  }, []);

  // 특정 섹션 검사 (네이버 맞춤법 검사만 사용)
  const checkSection = useCallback(async (section: keyof ResumeFormData, text: string) => {
    return checkText(text, section);
  }, [checkText]);

  // 결과 초기화
  const clearResult = useCallback(() => {
    setState(prev => ({
      ...prev,
      result: null,
      lastChecked: null,
      sectionResults: {}
    }));
  }, []);

  // 에러 초기화
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  // 수정 사항 적용 (향후 구현)
  const applyCorrection = useCallback((errorId: string, correction: string) => {
    // TODO: 이력서 데이터 업데이트 로직 구현
    console.log('수정 사항 적용:', errorId, correction);
  }, []);

  // 이력서 데이터가 있는지 확인
  const hasResumeData = useCallback((resumeData: ResumeFormData) => {
    return Object.values(resumeData).some(value => value && value.trim().length > 0);
  }, []);

  // 검사 가능한 섹션 목록 (개인정보 제외)
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

  return {
    // 상태
    loading: state.loading,
    error: state.error,
    result: state.result,
    lastChecked: state.lastChecked,
    sectionResults: state.sectionResults,
    sectionLoading: state.sectionLoading,
    
    // 함수
    checkText,
    checkResume,
    checkSection,
    clearResult,
    clearError,
    applyCorrection,
    hasResumeData,
    getCheckableSections
  };
};
