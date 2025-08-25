import { useState, useCallback } from 'react';
import { spellCheckService } from '../services/spellCheckService';
import { useResumeForm } from './useResumeForm';
import { 
  SpellCheckResult, 
  ResumeCheckResult, 
  SpellCheckRequest,
  SpellCheckError
} from '../types/spellCheck';
import { ResumeFormData } from '../types/resume';

interface SpellCheckState {
  loading: boolean;
  error: string | null;
  result: ResumeCheckResult | null;
  lastChecked: Date | null;
  sectionResults: Record<string, SpellCheckResult | undefined>;
  sectionLoading: Record<string, boolean>; // 섹션별 로딩 상태 추가
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
  
  const { formData } = useResumeForm();

  // 단일 텍스트 검사
  const checkText = useCallback(async (request: SpellCheckRequest): Promise<SpellCheckResult | null> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await spellCheckService.checkText(request);
      
      if (response.success && response.data) {
        // 섹션별 결과 저장
        setState(prev => ({
          ...prev,
          sectionResults: {
            ...prev.sectionResults,
            [request.section]: response.data
          }
        }));
        return response.data;
      } else {
        setState(prev => ({ 
          ...prev, 
          error: response.error || '검사 중 오류가 발생했습니다.' 
        }));
        return null;
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: '네트워크 오류가 발생했습니다.' 
      }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 전체 이력서 검사
  const checkResume = useCallback(async (): Promise<ResumeCheckResult | null> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await spellCheckService.checkResume(formData);
      
      if (response.success && response.data) {
        setState(prev => ({ 
          ...prev, 
          result: response.data as ResumeCheckResult,
          lastChecked: new Date()
        }));
        return response.data as ResumeCheckResult;
      } else {
        setState(prev => ({ 
          ...prev, 
          error: response.error || '이력서 검사 중 오류가 발생했습니다.' 
        }));
        return null;
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: '네트워크 오류가 발생했습니다.' 
      }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [formData]);

  // 특정 섹션 검사 (개선된 버전)
  const checkSection = useCallback(async (section: keyof ResumeFormData): Promise<SpellCheckResult | null> => {
    const text = formData[section] || '';
    if (!text.trim()) {
      return null;
    }
    
    // 섹션별 로딩 상태 시작
    setState(prev => ({
      ...prev,
      sectionLoading: { ...prev.sectionLoading, [section]: true },
      error: null
    }));
    
    try {
      const result = await checkText({ text, section });
      
      // 검사 완료 후 섹션별 로딩 상태 종료
      setState(prev => ({
        ...prev,
        sectionLoading: { ...prev.sectionLoading, [section]: false }
      }));
      
      return result;
    } catch (error) {
      // 에러 발생 시에도 로딩 상태 종료
      setState(prev => ({
        ...prev,
        sectionLoading: { ...prev.sectionLoading, [section]: false },
        error: '섹션 검사 중 오류가 발생했습니다.'
      }));
      return null;
    }
  }, [formData, checkText]);

  // 결과 초기화
  const clearResult = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      result: null, 
      error: null, 
      lastChecked: null,
      sectionResults: {},
      sectionLoading: {}
    }));
  }, []);

  // 에러 초기화
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // 수정 사항을 이력서에 적용
  const applyCorrection = useCallback((section: keyof ResumeFormData, corrections: SpellCheckError[]) => {
    // 이 부분은 useResumeForm과 연동하여 실제 이력서 데이터를 업데이트
    console.log('Apply corrections to section:', section, corrections);
    
    // TODO: useResumeForm의 setFormData를 사용하여 실제 데이터 업데이트
    // const { setFormData } = useResumeForm();
    // setFormData(prev => ({
    //   ...prev,
    //   [section]: correctedText
    // }));
  }, []);

  // 이력서 데이터가 있는지 확인
  const hasResumeData = useCallback(() => {
    return Object.values(formData).some(value => value && value.trim());
  }, [formData]);

  // 검사 가능한 섹션 목록
  const getCheckableSections = useCallback(() => {
    const sections: Array<{ key: keyof ResumeFormData; label: string; hasData: boolean }> = [
      { key: 'name', label: '이름', hasData: !!(formData.name && formData.name.trim()) },
      { key: 'email', label: '이메일', hasData: !!(formData.email && formData.email.trim()) },
      { key: 'phone', label: '전화번호', hasData: !!(formData.phone && formData.phone.trim()) },
      { key: 'nationality', label: '국적', hasData: !!(formData.nationality && formData.nationality.trim()) },
      { key: 'visaType', label: '비자 유형', hasData: !!(formData.visaType && formData.visaType.trim()) },
      { key: 'education', label: '학력', hasData: !!(formData.education && formData.education.trim()) },
      { key: 'experience', label: '경력', hasData: !!(formData.experience && formData.experience.trim()) },
      { key: 'skills', label: '기술 및 자격증', hasData: !!(formData.skills && formData.skills.trim()) },
      { key: 'languages', label: '언어 능력', hasData: !!(formData.languages && formData.languages.trim()) },
      { key: 'introduction', label: '자기소개', hasData: !!(formData.introduction && formData.introduction.trim()) }
    ];
    
    return sections;
  }, [formData]);

  return {
    // 상태
    loading: state.loading,
    error: state.error,
    result: state.result,
    lastChecked: state.lastChecked,
    sectionResults: state.sectionResults,
    sectionLoading: state.sectionLoading, // 섹션별 로딩 상태 추가
    
    // 함수
    checkText,
    checkResume,
    checkSection,
    clearResult,
    clearError,
    applyCorrection,
    
    // 유틸리티
    hasResumeData,
    getCheckableSections
  };
};
