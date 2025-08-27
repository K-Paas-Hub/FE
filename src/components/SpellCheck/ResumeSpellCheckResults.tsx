import React from 'react';
import { useTranslation } from 'react-i18next';
import { ResumeSpellCheckResult } from '../../types/spellCheck';
import {
  ResumeResultsContainer,
  ResumeResultsHeader,
  ResumeResultsTitle,
  ResumeResultsScore,
  ResumeCategoryResults,
  ResumeCategoryResult,
  ResumeCategoryName,
  ResumeCategoryScore,
  ResumeCategoryErrors,
  ResumeErrorItem,
  ResumeErrorWord,
  ResumeErrorDescription,
  ResumeErrorSuggestion,
  ResumeSuggestionsContainer,
  ResumeSuggestionsTitle,
  ResumeSuggestionList,
  DynamicScore
} from '../../styles/components/ResumeSpellCheckResults.styles';

interface ResumeSpellCheckResultsProps {
  result: ResumeSpellCheckResult;
}

const ResumeSpellCheckResults: React.FC<ResumeSpellCheckResultsProps> = ({ result }) => {
  const { t } = useTranslation();

  const getCategoryName = (category: string) => {
    return t(`spellCheck.resumeSpecific.categories.${category}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <ResumeResultsContainer>
      <ResumeResultsHeader>
        <ResumeResultsTitle>
          📊 {t('spellCheck.resumeSpecific.resultsTitle')}
        </ResumeResultsTitle>
        <ResumeResultsScore>
          <DynamicScore $score={result.overallResumeScore}>
            {result.overallResumeScore}{t('spellCheck.resumeSpecific.score')}
          </DynamicScore>
        </ResumeResultsScore>
      </ResumeResultsHeader>

      <ResumeCategoryResults>
        {Object.entries(result.categoryScores).map(([category, score]) => {
          const errors = (result.resumeSpecificErrors || []).filter(
            error => error.resumeCategory === category
          );
          
          return (
            <ResumeCategoryResult key={category}>
              <ResumeCategoryName>
                {getCategoryName(category)}
              </ResumeCategoryName>
              <ResumeCategoryScore>
                <DynamicScore $score={score}>
                  {score}{t('spellCheck.resumeSpecific.score')}
                </DynamicScore>
              </ResumeCategoryScore>
              
              {errors.length > 0 && (
                <ResumeCategoryErrors>
                  {errors.map((error, index) => (
                    <ResumeErrorItem key={error.id || index}>
                      <ResumeErrorWord>{error.word}</ResumeErrorWord>
                      <ResumeErrorDescription>{error.description}</ResumeErrorDescription>
                      <ResumeErrorSuggestion>→ {error.suggestion}</ResumeErrorSuggestion>
                    </ResumeErrorItem>
                  ))}
                </ResumeCategoryErrors>
              )}
            </ResumeCategoryResult>
          );
        })}
      </ResumeCategoryResults>

      <ResumeSuggestionsContainer>
        <ResumeSuggestionsTitle>
          💡 {t('spellCheck.resumeSpecific.improvementSuggestions')}
        </ResumeSuggestionsTitle>
        
        {Object.entries(result.suggestions).map(([category, suggestions]) => {
          if (suggestions.length === 0) return null;
          
          return (
            <div key={category}>
              <h4>{getCategoryName(category)}</h4>
              <ResumeSuggestionList>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ResumeSuggestionList>
            </div>
          );
        })}
      </ResumeSuggestionsContainer>
    </ResumeResultsContainer>
  );
};

export default ResumeSpellCheckResults;
