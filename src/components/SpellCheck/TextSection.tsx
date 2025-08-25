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

const CheckButton = styled(motion.button)`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.8rem;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: #10b981;
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

interface TextSectionProps {
  formData: ResumeFormData;
}

const TextSection: React.FC<TextSectionProps> = ({ formData }) => {
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

  return (
    <SectionContainer>
      {sections.map((section) => {
        const content = formData[section.key];
        const hasContent = content && content.trim();
        const wordCount = getWordCount(content || '');
        
        // 개인정보 항목인지 확인
        const isPersonalInfo = personalInfoSections.some(info => info.key === section.key);
        
        return (
          <TextItem key={section.key}>
            <SectionInfo>
              <TextLabel>{section.label}</TextLabel>
              {/* 자기소개서 관련 항목에만 단어 수 표시 */}
              {hasContent && !isPersonalInfo && (
                <WordCount>{wordCount}단어</WordCount>
              )}
            </SectionInfo>
            <TextContent>
              {hasContent ? content : (
                <EmptyText>입력된 내용이 없습니다.</EmptyText>
              )}
            </TextContent>
            {/* 자기소개서 관련 항목에만 검사 버튼 표시 */}
            {hasContent && !isPersonalInfo && (
              <CheckButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                이 섹션 검사
              </CheckButton>
            )}
          </TextItem>
        );
      })}
    </SectionContainer>
  );
};

export default TextSection;
