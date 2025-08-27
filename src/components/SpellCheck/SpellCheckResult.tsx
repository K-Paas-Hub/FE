import React from 'react';
import { ResumeCheckResult, SpellCheckError } from '../../types/spellCheck';
import {
  ResultContainer,
  StatisticsCard,
  StatisticsTitle,
  StatisticsGrid,
  StatItem,
  StatValue,
  StatLabel,
  SectionResult,
  SectionHeader,
  SectionName,
  ErrorCount,
  ErrorList,
  ErrorItem,
  ErrorWord,
  ErrorDescription,
  Suggestion,
  SuggestionLabel,
  SuggestionText,
  ApplyButton,
  NoErrorsMessage,
  NoErrorsIcon
} from '../../styles/components/SpellCheckResult.styles';



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
