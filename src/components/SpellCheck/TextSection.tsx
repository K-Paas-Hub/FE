import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  ApplyButton
} from '../../styles/components/TextSection.styles';
import { SmallLoadingSpinner } from '../../styles/common/LoadingSpinner.styles';



interface TextSectionProps {
  formData: ResumeFormData;
  onSectionCheck?: (section: keyof ResumeFormData, errors: SpellCheckError[]) => void;
}

const TextSection: React.FC<TextSectionProps> = ({ formData, onSectionCheck }) => {
  const { t } = useTranslation();
  const { checkSection, isChecking } = useSpellCheck();
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
    { key: 'name' as keyof ResumeFormData, label: t('spellCheck.sections.name') },
    { key: 'email' as keyof ResumeFormData, label: t('spellCheck.sections.email') },
    { key: 'phone' as keyof ResumeFormData, label: t('spellCheck.sections.phone') },
    { key: 'nationality' as keyof ResumeFormData, label: t('spellCheck.sections.nationality') },
    { key: 'visaType' as keyof ResumeFormData, label: t('spellCheck.sections.visaType') }
  ];

  // 자기소개서 관련 항목 (검사 버튼 있음)
  const resumeSections = [
    { key: 'education' as keyof ResumeFormData, label: t('spellCheck.sections.education') },
    { key: 'experience' as keyof ResumeFormData, label: t('spellCheck.sections.experience') },
    { key: 'skills' as keyof ResumeFormData, label: t('spellCheck.sections.skills') },
    { key: 'languages' as keyof ResumeFormData, label: t('spellCheck.sections.languages') },
    { key: 'introduction' as keyof ResumeFormData, label: t('spellCheck.sections.introduction') }
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
          {t('spellCheck.checkOptions.spelling')}
        </OptionLabel>
        <OptionLabel>
          <input
            type="checkbox"
            checked={checkOptions.checkGrammar}
            onChange={() => handleOptionChange('checkGrammar')}
          />
          {t('spellCheck.checkOptions.grammar')}
        </OptionLabel>
        <OptionLabel>
          <input
            type="checkbox"
            checked={checkOptions.checkPunctuation}
            onChange={() => handleOptionChange('checkPunctuation')}
          />
          {t('spellCheck.checkOptions.punctuation')}
        </OptionLabel>
        <OptionLabel>
          <input
            type="checkbox"
            checked={checkOptions.checkSpacing}
            onChange={() => handleOptionChange('checkSpacing')}
          />
          {t('spellCheck.checkOptions.spacing')}
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
                  <WordCount>{wordCount}{t('spellCheck.messages.wordCount')}</WordCount>
                  <ErrorCount $hasErrors={hasErrors}>
                    {hasErrors ? `${errors.length}${t('spellCheck.messages.errorCount')}` : t('spellCheck.messages.noErrors')}
                  </ErrorCount>
                </div>
              )}
            </SectionInfo>
            <TextContent $hasErrors={hasErrors}>
              {hasContent ? content : (
                <EmptyText>{t('spellCheck.messages.noContent')}</EmptyText>
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
                    <SmallLoadingSpinner />
                    {t('spellCheck.actions.checking')}
                  </>
                ) : (
                  t('spellCheck.actions.check')
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
                        {t('spellCheck.actions.apply')}
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
