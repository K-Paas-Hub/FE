import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StatisticsCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

export const StatisticsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.8rem;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  
  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.primary};
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const SectionResult = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  
  @media (max-width: 480px) {
    border-radius: 8px;
  }
`;

export const SectionHeader = styled.div`
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const SectionName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ErrorCount = styled.span<{ $hasErrors: boolean }>`
  background: ${props => props.$hasErrors ? '#ef4444' : '#10b981'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
  }
`;

export const ErrorList = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const ErrorItem = styled(motion.div)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    border-radius: 6px;
  }
`;

export const ErrorWord = styled.div`
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 0.5rem;
`;

export const ErrorDescription = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const Suggestion = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  padding: 0.8rem;
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    padding: 0.6rem;
  }
`;

export const SuggestionLabel = styled.div`
  font-weight: 600;
  color: #059669;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const SuggestionText = styled.div`
  color: #047857;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ApplyButton = styled.button`
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
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
`;

export const NoErrorsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #059669;
  font-weight: 600;
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const NoErrorsIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
