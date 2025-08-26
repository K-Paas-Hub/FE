import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
import { ResumeFormData } from '../../types/resume';
import { SpellCheckOptions, SpellCheckError } from '../../types/spellCheck';
import { useSpellCheck } from '../../hooks/useSpellCheck';
import {
  SectionContainer,
  TextItem,
  TextLabel,
  TextContent,
  EmptyText,
  CheckButton,
  SectionInfo,
  WordCount,
  ErrorCount,
  CheckOptions,
  OptionLabel,
  ErrorList,
  ErrorItem,
  ErrorInfo,
  ErrorWord,
  ErrorDescription,
  ErrorSuggestion,
  ApplyButton,
  LoadingSpinner
} from '../../styles/components/TextSection.styles';



interface TextSectionProps {
  formData: ResumeFormData;
  onSectionCheck?: (section: keyof ResumeFormData, errors: SpellCheckError[]) => void;
}

const TextSection: React.FC<TextSectionProps> = ({ formData, onSectionCheck }) => {
  const { checkSection, isChecking, error } = useSpellCheck();
  const [sectionErrors, setSectionErrors] = useState<Record<string, SpellCheckError[]>>({});
  const [checkOptions, setCheckOptions] = useState<SpellCheckOptions>({
    checkSpelling: true,
    checkGrammar: true,
    checkPunctuation: true,
    checkSpacing: true,
    language: 'ko',
    severity: 'medium',
    includeSuggestions: true
  });

  // 개인정보 항목 (검사 버튼 없음)
  const personalInfoSections = [
    { key: 'name' as keyof ResumeFormData, label: '이름' },
    { key: 'email' as keyof ResumeFormData, label: '이메일' },
    { key: 'phone' as keyof ResumeFormData, label: '전화번호' },
    { key: 'nationality' as keyof ResumeFormData, label: '국적' },
    { key: 'visaType' as keyof ResumeFormData, label: '비자 유형' }
  ];

  // 자기소개서 관련 항목 (검사 버튼 있음)
  const resumeSections = [
    { key: 'education' as keyof ResumeFormData, label: '학력' },
    { key: 'experience' as keyof ResumeFormData, label: '경력' },
    { key: 'skills' as keyof ResumeFormData, label: '기술 및 자격증' },
    { key: 'languages' as keyof ResumeFormData, label: '언어 능력' },
    { key: 'introduction' as keyof ResumeFormData, label: '자기소개' }
  ];

  const sections = [...personalInfoSections, ...resumeSections];

  const getWordCount = (text: string): number => {
    if (!text.trim()) return 0;
    return text.split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleSectionCheck = async (section: keyof ResumeFormData, text: string) => {
    try {
      const response = await checkSection(section, text, checkOptions);
      
      if (response.success && response.data) {
        setSectionErrors(prev => ({
          ...prev,
          [section]: response.data!.errors
        }));
        onSectionCheck?.(section, response.data!.errors);
      } else {
      }
    } catch (err) {
      console.error('섹션 검사 중 오류:', err);
    }
  };

  const handleOptionChange = (option: keyof SpellCheckOptions) => {
    setCheckOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const applySuggestion = (_section: keyof ResumeFormData, _error: SpellCheckError) => {
    // 실제 텍스트 수정 로직은 부모 컴포넌트에서 처리
    // 수정 제안 적용
  };

  return (
    <SectionContainer>
      {/* 검사 옵션 */}
      <CheckOptions>
        <OptionLabel>
          <input
            type="checkbox"
            checked={checkOptions.checkSpelling}
            onChange={() => handleOptionChange('checkSpelling')}
          />
          맞춤법
        </OptionLabel>
        <OptionLabel>
          <input
            type="checkbox"
            checked={checkOptions.checkGrammar}
            onChange={() => handleOptionChange('checkGrammar')}
          />
          문법
        </OptionLabel>
        <OptionLabel>
          <input
            type="checkbox"
            checked={checkOptions.checkPunctuation}
            onChange={() => handleOptionChange('checkPunctuation')}
          />
          문장부호
        </OptionLabel>
        <OptionLabel>
          <input
            type="checkbox"
            checked={checkOptions.checkSpacing}
            onChange={() => handleOptionChange('checkSpacing')}
          />
          띄어쓰기
        </OptionLabel>
      </CheckOptions>

      {sections.map((section) => {
        const content = formData[section.key];
        const hasContent = content && content.trim();
        const wordCount = getWordCount(content || '');
        const errors = sectionErrors[section.key] || [];
        const hasErrors = errors.length > 0;
        
        // 개인정보 항목인지 확인
        const isPersonalInfo = personalInfoSections.some(info => info.key === section.key);
        
        return (
          <TextItem key={section.key}>
            <SectionInfo>
              <TextLabel>{section.label}</TextLabel>
              {/* 자기소개서 관련 항목에만 단어 수와 오류 수 표시 */}
              {hasContent && !isPersonalInfo && (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <WordCount>{wordCount}단어</WordCount>
                  <ErrorCount $hasErrors={hasErrors}>
                    {hasErrors ? `${errors.length}개 오류` : '오류 없음'}
                  </ErrorCount>
                </div>
              )}
            </SectionInfo>
            <TextContent $hasErrors={hasErrors}>
              {hasContent ? content : (
                <EmptyText>입력된 내용이 없습니다.</EmptyText>
              )}
            </TextContent>
            
            {/* 자기소개서 관련 항목에만 검사 버튼 표시 */}
            {hasContent && !isPersonalInfo && (
              <CheckButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                $isChecking={isChecking}
                disabled={isChecking}
                onClick={() => handleSectionCheck(section.key, content)}
              >
                {isChecking ? (
                  <>
                    <LoadingSpinner />
                    검사 중...
                  </>
                ) : (
                  '이 섹션 검사'
                )}
              </CheckButton>
            )}

            {/* 오류 목록 표시 */}
            {hasErrors && (
              <ErrorList>
                {errors.map((error, index) => (
                  <ErrorItem key={error.id || index}>
                    <ErrorInfo>
                      <ErrorWord>{error.word}</ErrorWord>
                      <ErrorDescription>{error.description}</ErrorDescription>
                    </ErrorInfo>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <ErrorSuggestion>→ {error.suggestion}</ErrorSuggestion>
                      <ApplyButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => applySuggestion(section.key, error)}
                      >
                        적용
                      </ApplyButton>
                    </div>
                  </ErrorItem>
                ))}
              </ErrorList>
            )}
          </TextItem>
        );
      })}
    </SectionContainer>
  );
};

export default TextSection;
