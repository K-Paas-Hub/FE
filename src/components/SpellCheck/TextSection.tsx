import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
import { ResumeFormData } from '../../types/resume';

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
`;

const TextLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.8rem;
  font-size: 1rem;
`;

const TextContent = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
  min-height: 60px;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap;
  word-break: break-word;
`;

const EmptyText = styled.div`
  color: #9ca3af;
  font-style: italic;
`;

const CheckButton = styled(motion.button)<{ $isLoading?: boolean }>`
  background: ${props => props.$isLoading ? '#9ca3af' : COLORS.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  margin-top: 0.8rem;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.$isLoading ? '#9ca3af' : '#10b981'};
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
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

const SectionResult = styled.div<{ $hasResult: boolean }>`
  margin-top: 0.8rem;
  padding: 0.8rem;
  border-radius: 6px;
  background: ${props => props.$hasResult ? '#f0fdf4' : 'transparent'};
  border: 1px solid ${props => props.$hasResult ? '#bbf7d0' : 'transparent'};
  display: ${props => props.$hasResult ? 'block' : 'none'};
`;

const ResultText = styled.div`
  font-size: 0.9rem;
  color: #059669;
  font-weight: 500;
`;

interface TextSectionProps {
  formData: ResumeFormData;
  onCheckSection: (section: keyof ResumeFormData) => void;
  sectionLoading: Record<string, boolean>;
  sectionResults: Record<string, any>;
}

const TextSection: React.FC<TextSectionProps> = ({ 
  formData, 
  onCheckSection,
  sectionLoading,
  sectionResults
}) => {
  const sections = [
    { key: 'name' as keyof ResumeFormData, label: '이름' },
    { key: 'email' as keyof ResumeFormData, label: '이메일' },
    { key: 'phone' as keyof ResumeFormData, label: '전화번호' },
    { key: 'nationality' as keyof ResumeFormData, label: '국적' },
    { key: 'visaType' as keyof ResumeFormData, label: '비자 유형' },
    { key: 'education' as keyof ResumeFormData, label: '학력' },
    { key: 'experience' as keyof ResumeFormData, label: '경력' },
    { key: 'skills' as keyof ResumeFormData, label: '기술 및 자격증' },
    { key: 'languages' as keyof ResumeFormData, label: '언어 능력' },
    { key: 'introduction' as keyof ResumeFormData, label: '자기소개' }
  ];

  const getWordCount = (text: string): number => {
    if (!text.trim()) return 0;
    return text.split(/\s+/).filter(word => word.length > 0).length;
  };

  const getSectionResult = (sectionKey: string) => {
    const result = sectionResults[sectionKey];
    if (!result) return null;
    
    const errorCount = result.errors?.length || 0;
    const accuracy = result.statistics?.accuracy || 100;
    
    if (errorCount === 0) {
      return { text: '✅ 오류 없음', color: '#059669' };
    } else {
      return { 
        text: `⚠️ ${errorCount}개 오류 발견 (정확도: ${accuracy.toFixed(1)}%)`, 
        color: '#dc2626' 
      };
    }
  };

  return (
    <SectionContainer>
      {sections.map((section) => {
        const content = formData[section.key];
        const hasContent = content && content.trim();
        const wordCount = getWordCount(content || '');
        const isLoading = sectionLoading[section.key] || false;
        const sectionResult = getSectionResult(section.key);
        
        return (
          <TextItem key={section.key}>
            <SectionInfo>
              <TextLabel>{section.label}</TextLabel>
              {hasContent && (
                <WordCount>{wordCount}단어</WordCount>
              )}
            </SectionInfo>
            <TextContent>
              {hasContent ? content : (
                <EmptyText>입력된 내용이 없습니다.</EmptyText>
              )}
            </TextContent>
            {hasContent && (
              <>
                <CheckButton
                  onClick={() => onCheckSection(section.key)}
                  disabled={isLoading}
                  $isLoading={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading && <LoadingSpinner />}
                  {isLoading ? '검사 중...' : '이 섹션 검사'}
                </CheckButton>
                
                {sectionResult && (
                  <SectionResult $hasResult={true}>
                    <ResultText style={{ color: sectionResult.color }}>
                      {sectionResult.text}
                    </ResultText>
                  </SectionResult>
                )}
              </>
            )}
          </TextItem>
        );
      })}
    </SectionContainer>
  );
};

export default TextSection;
