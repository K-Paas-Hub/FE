import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TextItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  background: #f9fafb;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${COLORS.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const TextLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const TextContent = styled.div<{ $hasErrors?: boolean }>`
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
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    min-height: 50px;
  }
`;

export const EmptyText = styled.div`
  color: #9ca3af;
  font-style: italic;
`;

export const CheckButton = styled(motion.button)<{ $isChecking?: boolean }>`
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
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
`;

export const SectionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const WordCount = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const ErrorCount = styled.span<{ $hasErrors: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.$hasErrors ? '#ef4444' : '#6b7280'};
  font-weight: ${props => props.$hasErrors ? '600' : '400'};
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const CheckOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    gap: 0.4rem;
  }
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: #374151;
  cursor: pointer;
  
  input[type="checkbox"] {
    margin: 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const ErrorList = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  
  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

export const ErrorItem = styled.div`
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
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const ErrorInfo = styled.div`
  flex: 1;
`;

export const ErrorWord = styled.span`
  font-weight: 600;
  color: #ef4444;
`;

export const ErrorDescription = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.2rem;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const ErrorSuggestion = styled.div`
  font-size: 0.8rem;
  color: #059669;
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const ApplyButton = styled(motion.button)`
  background: #059669;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  cursor: pointer;
  margin-left: 0.5rem;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: #047857;
  }
  
  @media (max-width: 480px) {
    margin-left: 0;
    padding: 0.25rem 0.5rem;
    font-size: 0.65rem;
  }
`;


