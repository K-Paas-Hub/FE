import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ResumeCheckResult, SpellCheckError } from '../../types/spellCheck';
import {
  ResultContainer,
  StatisticsCard,
  StatisticsTitle,
  StatisticsGrid,
  StatItem,
  StatValue,
  StatLabel,
  NoErrorsMessage,
  NoErrorsIcon,
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
  ApplyButton
} from '../../styles/components/SpellCheckResult.styles';

interface SpellCheckResultProps {
  result: ResumeCheckResult;
  onApplyCorrection: (section: string, corrections: SpellCheckError[]) => void;
}

const SpellCheckResult: React.FC<SpellCheckResultProps> = ({ 
  result, 
  onApplyCorrection 
}) => {
  const { t } = useTranslation();
  const { sections, overallStatistics } = result;

  // 섹션 이름을 표시용으로 변환하는 함수
  const getSectionDisplayName = (section: string): string => {
    return t(`spellCheck.result.sections.${section}`) || section;
  };

  // 오류가 있는 섹션만 필터링
  const sectionsWithErrors = sections.filter(section => section.errors.length > 0);

  return (
    <ResultContainer>
      <StatisticsCard>
        <StatisticsTitle>{t('spellCheck.result.overallStatistics')}</StatisticsTitle>
        <StatisticsGrid>
          <StatItem>
            <StatValue>{overallStatistics.totalWords}</StatValue>
            <StatLabel>{t('spellCheck.result.totalWords')}</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{overallStatistics.totalErrors}</StatValue>
            <StatLabel>{t('spellCheck.result.foundErrors')}</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{overallStatistics.overallAccuracy.toFixed(1)}%</StatValue>
            <StatLabel>{t('spellCheck.result.accuracy')}</StatLabel>
          </StatItem>
        </StatisticsGrid>
      </StatisticsCard>

      {sectionsWithErrors.length === 0 ? (
        <NoErrorsMessage>
          <NoErrorsIcon>✅</NoErrorsIcon>
          <div>{t('spellCheck.result.noErrorsFound')}</div>
        </NoErrorsMessage>
      ) : (
        sectionsWithErrors.map((sectionResult) => (
          <SectionResult key={sectionResult.section}>
            <SectionHeader>
              <SectionName>
                {getSectionDisplayName(sectionResult.section)}
              </SectionName>
              <ErrorCount $hasErrors={sectionResult.errors.length > 0}>
                {sectionResult.errors.length}{t('spellCheck.result.errorCount')}
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
                    <SuggestionLabel>{t('spellCheck.result.suggestionLabel')}</SuggestionLabel>
                    <SuggestionText>{error.suggestion}</SuggestionText>
                  </Suggestion>
                  <ApplyButton
                    onClick={() => onApplyCorrection(sectionResult.section, [error])}
                  >
                    {t('spellCheck.result.applyCorrection')}
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
