import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
import { ResumeCheckResult, SpellCheckError } from '../../types/spellCheck';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatisticsCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
`;

const StatisticsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;

const SectionResult = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
`;

const ErrorCount = styled.span<{ $hasErrors: boolean }>`
  background: ${props => props.$hasErrors ? '#ef4444' : '#10b981'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ErrorList = styled.div`
  padding: 1.5rem;
`;

const ErrorItem = styled(motion.div)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ErrorWord = styled.div`
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 0.5rem;
`;

const ErrorDescription = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Suggestion = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  padding: 0.8rem;
  margin-top: 0.5rem;
`;

const SuggestionLabel = styled.div`
  font-weight: 600;
  color: #059669;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
`;

const SuggestionText = styled.div`
  color: #047857;
`;

const ApplyButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: #10b981;
  }
`;

const NoErrorsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #059669;
  font-weight: 600;
`;

const NoErrorsIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

interface SpellCheckResultProps {
  result: ResumeCheckResult;
  onApplyCorrection: (section: string, corrections: SpellCheckError[]) => void;
}

const SpellCheckResult: React.FC<SpellCheckResultProps> = ({ 
  result, 
  onApplyCorrection 
}) => {
  const { sections, overallStatistics } = result;

  // 섹션 이름을 표시용으로 변환하는 함수
  const getSectionDisplayName = (section: string): string => {
    const sectionNames: Record<string, string> = {
      name: '이름',
      email: '이메일',
      phone: '전화번호',
      nationality: '국적',
      visaType: '비자 유형',
      education: '학력',
      experience: '경력',
      skills: '기술 및 자격증',
      languages: '언어 능력',
      introduction: '자기소개'
    };
    
    return sectionNames[section] || section;
  };

  // 오류가 있는 섹션만 필터링
  const sectionsWithErrors = sections.filter(section => section.errors.length > 0);

  return (
    <ResultContainer>
      <StatisticsCard>
        <StatisticsTitle>전체 검사 통계</StatisticsTitle>
        <StatisticsGrid>
          <StatItem>
            <StatValue>{overallStatistics.totalWords}</StatValue>
            <StatLabel>총 단어 수</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{overallStatistics.totalErrors}</StatValue>
            <StatLabel>발견된 오류</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{overallStatistics.overallAccuracy.toFixed(1)}%</StatValue>
            <StatLabel>정확도</StatLabel>
          </StatItem>
        </StatisticsGrid>
      </StatisticsCard>

      {sectionsWithErrors.length === 0 ? (
        <NoErrorsMessage>
          <NoErrorsIcon>✅</NoErrorsIcon>
          <div>맞춤법 오류가 발견되지 않았습니다!</div>
        </NoErrorsMessage>
      ) : (
        sectionsWithErrors.map((sectionResult) => (
          <SectionResult key={sectionResult.section}>
            <SectionHeader>
              <SectionName>
                {getSectionDisplayName(sectionResult.section)}
              </SectionName>
              <ErrorCount $hasErrors={sectionResult.errors.length > 0}>
                {sectionResult.errors.length}개 오류
              </ErrorCount>
            </SectionHeader>
            
            <ErrorList>
              {sectionResult.errors.map((error, index) => (
                <ErrorItem
                  key={error.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ErrorWord>"{error.word}"</ErrorWord>
                  <ErrorDescription>{error.description}</ErrorDescription>
                  <Suggestion>
                    <SuggestionLabel>수정 제안:</SuggestionLabel>
                    <SuggestionText>{error.suggestion}</SuggestionText>
                  </Suggestion>
                  <ApplyButton
                    onClick={() => onApplyCorrection(sectionResult.section, [error])}
                  >
                    이 수정사항 적용
                  </ApplyButton>
                </ErrorItem>
              ))}
            </ErrorList>
          </SectionResult>
        ))
      )}
    </ResultContainer>
  );
};

export default SpellCheckResult;
