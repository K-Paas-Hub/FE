import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
import { ResumeFormData } from '../../types/resume';
import { SpellCheckOptions, SpellCheckError } from '../../types/spellCheck';
import { useSpellCheck } from '../../hooks/useSpellCheck';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TextItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  background: #f9fafb;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${COLORS.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TextLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.8rem;
  font-size: 1rem;
`;

const TextContent = styled.div<{ $hasErrors?: boolean }>`
  background: white;
  border: 1px solid ${props => props.$hasErrors ? '#ef4444' : '#e5e7eb'};
  border-radius: 6px;
  padding: 1rem;
  min-height: 60px;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap;
  word-break: break-word;
  position: relative;
  
  ${props => props.$hasErrors && `
    border-color: #ef4444;
    background: #fef2f2;
  `}
`;

const EmptyText = styled.div`
  color: #9ca3af;
  font-style: italic;
`;

const CheckButton = styled(motion.button)<{ $isChecking?: boolean }>`
  background: ${props => props.$isChecking ? '#6b7280' : COLORS.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: ${props => props.$isChecking ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  margin-top: 0.8rem;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.$isChecking ? '#6b7280' : '#10b981'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SectionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const WordCount = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
`;

const ErrorCount = styled.span<{ $hasErrors: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.$hasErrors ? '#ef4444' : '#6b7280'};
  font-weight: ${props => props.$hasErrors ? '600' : '400'};
`;

const CheckOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: #374151;
  cursor: pointer;
  
  input[type="checkbox"] {
    margin: 0;
  }
`;

const ErrorList = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
`;

const ErrorItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #ef4444;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ErrorInfo = styled.div`
  flex: 1;
`;

const ErrorWord = styled.span`
  font-weight: 600;
  color: #ef4444;
`;

const ErrorDescription = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.2rem;
`;

const ErrorSuggestion = styled.div`
  font-size: 0.8rem;
  color: #059669;
  font-weight: 500;
`;

const ApplyButton = styled(motion.button)`
  background: #059669;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  cursor: pointer;
  margin-left: 0.5rem;
  
  &:hover {
    background: #047857;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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
      console.log('검사 시작:', section, text);
      const response = await checkSection(section, text, checkOptions);
      console.log('검사 결과:', response);
      
      if (response.success && response.data) {
        console.log('감지된 오류:', response.data.errors);
        setSectionErrors(prev => ({
          ...prev,
          [section]: response.data!.errors
        }));
        onSectionCheck?.(section, response.data!.errors);
      } else {
        console.log('검사 실패:', response.error);
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

  const applySuggestion = (section: keyof ResumeFormData, error: SpellCheckError) => {
    // 실제 텍스트 수정 로직은 부모 컴포넌트에서 처리
    console.log('수정 제안 적용:', section, error);
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
