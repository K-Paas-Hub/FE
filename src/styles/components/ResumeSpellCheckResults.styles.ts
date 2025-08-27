import styled from 'styled-components';
import { COLORS } from '../../constants';

export const ResumeResultsContainer = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 1.5rem;
`;

export const ResumeResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

export const ResumeResultsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLORS.text};
  margin: 0;
`;

export const ResumeResultsScore = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${COLORS.primary};
`;

export const ResumeCategoryResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ResumeCategoryResult = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
`;

export const ResumeCategoryName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${COLORS.text};
  margin: 0 0 0.5rem 0;
`;

export const ResumeCategoryScore = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const ResumeCategoryErrors = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ResumeErrorItem = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 1rem;
`;

export const ResumeErrorWord = styled.span`
  font-weight: 600;
  color: #ef4444;
  margin-right: 0.5rem;
`;

export const ResumeErrorDescription = styled.p`
  font-size: 0.9rem;
  color: ${COLORS.text};
  margin: 0.5rem 0;
`;

export const ResumeErrorSuggestion = styled.p`
  font-size: 0.9rem;
  color: ${COLORS.primary};
  font-weight: 500;
  margin: 0;
`;

export const ResumeSuggestionsContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
`;

export const ResumeSuggestionsTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: 1rem;
`;

export const DynamicScore = styled.span<{ $score: number }>`
  color: ${props => {
    if (props.$score >= 80) return '#10b981'; // green
    if (props.$score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  }};
`;

export const ResumeSuggestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    background: #f8f9fa;
    border-left: 3px solid ${COLORS.primary};
    padding: 0.8rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0 4px 4px 0;
    font-size: 0.9rem;
    color: ${COLORS.text};
  }
`;
