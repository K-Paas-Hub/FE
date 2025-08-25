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
  isAdvancedMode: boolean; // 네이버 맞춤법 검사 모드
}

export const useSpellCheck = () => {
  const [state, setState] = useState<SpellCheckState>({
    loading: false,
    error: null,
    result: null,
    lastChecked: null,
    sectionResults: {},
    sectionLoading: {},
    isAdvancedMode: false
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

  // 네이버 맞춤법 검사 (고급 검사)
  const checkTextWithNaver = useCallback(async (text: string, section: keyof ResumeFormData) => {
    try {
      setState(prev => ({
        ...prev,
        error: null,
        sectionLoading: { ...prev.sectionLoading, [section]: true }
      }));

      const response = await spellCheckService.checkWithNaver(text, section);
      
      if (response.success && response.data) {
        // 네이버 검사 결과에 섹션 정보 추가
        const resultWithSection: SpellCheckResult = {
          ...response.data,
          errors: response.data.errors.map(error => ({
            ...error,
            section
          }))
        };

        setState(prev => ({
          ...prev,
          sectionResults: {
            ...prev.sectionResults,
            [section]: resultWithSection
          },
          sectionLoading: { ...prev.sectionLoading, [section]: false }
        }));
        return resultWithSection;
      } else {
        throw new Error(response.error || '네이버 맞춤법 검사에 실패했습니다.');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '네이버 맞춤법 검사 중 오류가 발생했습니다.',
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

  // 특정 섹션 검사 (모드에 따라 선택)
  const checkSection = useCallback(async (section: keyof ResumeFormData, text: string) => {
    if (state.isAdvancedMode) {
      return checkTextWithNaver(text, section);
    } else {
      return checkText(text, section);
    }
  }, [state.isAdvancedMode, checkText, checkTextWithNaver]);

  // 고급 모드 토글
  const toggleAdvancedMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAdvancedMode: !prev.isAdvancedMode
    }));
  }, []);

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

  // 검사 가능한 섹션 목록
  const getCheckableSections = useCallback((resumeData: ResumeFormData) => {
    const sections: Array<{ key: keyof ResumeFormData; name: string; hasData: boolean }> = [
      { key: 'name', name: '이름', hasData: !!resumeData.name?.trim() },
      { key: 'email', name: '이메일', hasData: !!resumeData.email?.trim() },
      { key: 'phone', name: '전화번호', hasData: !!resumeData.phone?.trim() },
      { key: 'nationality', name: '국적', hasData: !!resumeData.nationality?.trim() },
      { key: 'visaType', name: '비자 타입', hasData: !!resumeData.visaType?.trim() },
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
    isAdvancedMode: state.isAdvancedMode,
    
    // 함수
    checkText,
    checkTextWithNaver,
    checkResume,
    checkSection,
    toggleAdvancedMode,
    clearResult,
    clearError,
    applyCorrection,
    hasResumeData,
    getCheckableSections
  };
};
