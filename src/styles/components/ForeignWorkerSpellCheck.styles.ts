import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${COLORS.text};
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: ${COLORS.textSecondary};
  text-align: center;
  margin-bottom: 2rem;
`;

export const TextAreaContainer = styled.div`
  margin-bottom: 2rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 2px solid ${COLORS.border};
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &::placeholder {
    color: ${COLORS.textSecondary};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const CheckButton = styled(motion.button)`
  padding: 12px 24px;
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  justify-content: center;
  
  &:hover {
    background: ${COLORS.primaryHover};
  }
  
  &:disabled {
    background: ${COLORS.textSecondary};
    cursor: not-allowed;
  }
`;

export const ClearButton = styled(motion.button)`
  padding: 12px 24px;
  background: ${COLORS.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  min-width: 80px;
  
  &:hover {
    background: ${COLORS.secondaryHover};
  }
  
  &:disabled {
    background: ${COLORS.textSecondary};
    cursor: not-allowed;
  }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${COLORS.background};
  border-radius: 8px;
  border: 1px solid ${COLORS.border};
`;

export const WordCount = styled.span`
  font-size: 0.9rem;
  color: ${COLORS.textSecondary};
`;

export const ErrorCount = styled.span`
  font-size: 0.9rem;
  color: ${COLORS.error};
  font-weight: 500;
`;

// 반응형 디자인
export const ResponsiveContainer = styled(Container)`
  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0 1rem;
  }
`;

export const ResponsiveTitle = styled(Title)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ResponsiveButtonContainer = styled(ButtonContainer)`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ResponsiveCheckButton = styled(CheckButton)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ResponsiveClearButton = styled(ClearButton)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;
