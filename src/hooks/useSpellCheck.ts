import { useCallback } from 'react';
import { ResumeFormData } from '../types/resume';

export const useSpellCheck = () => {
  // 이력서 데이터가 있는지 확인 (UI 표시용)
  const hasResumeData = useCallback((resumeData: ResumeFormData) => {
    return Object.values(resumeData).some(value => value && value.trim().length > 0);
  }, []);

  // 검사 가능한 섹션 목록 (UI 표시용)
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
    // UI 표시용 함수들만 반환
    hasResumeData,
    getCheckableSections
  };
};
