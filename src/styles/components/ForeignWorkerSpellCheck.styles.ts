import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 600px;
  background: white;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const TopBar = styled.div`
  display: flex;
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  margin-bottom: 0;
`;

export const TopBarTitle = styled.div`
  flex: 1;
  padding: 1rem;
  color: #1f2937;
  font-weight: 600;
  text-align: center;
  font-size: 1.1rem;
`;

export const ContentArea = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  gap: 1rem;
`;

export const LoadingText = styled.p`
  color: ${COLORS.textSecondary};
  font-size: 1rem;
`;

export const InputSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: white;
  border: 1px solid ${COLORS.border};
  border-radius: 0 0 0 12px;
  position: relative;
`;

export const TextArea = styled.textarea`
  flex: 1;
  min-height: 450px;
  padding: 1.5rem;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  background: white;
  color: #333333;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &:disabled {
    background: ${COLORS.background};
    color: ${COLORS.textSecondary};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #999999;
  }
  
  @media (max-width: 768px) {
    min-height: 350px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 프로젝트 일관성을 위한 버튼 스타일
const buttonBase = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 44px;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
`;

export const PrimaryButton = styled.button`
  ${buttonBase}
  background: ${COLORS.primary};
  color: white;
  box-shadow: 0 2px 4px rgba(74, 222, 128, 0.2);
  
  &:hover:not(:disabled) {
    background: ${COLORS.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(74, 222, 128, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled.button`
  ${buttonBase}
  background: white;
  color: ${COLORS.background};
  border: 1px solid ${COLORS.border};
  
  &:hover:not(:disabled) {
    background: ${COLORS.background};
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
`;

export const Icon = styled.span`
  font-size: 1rem;
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

export const ResultSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  border: 1px solid ${COLORS.border};
  border-radius: 0 0 12px 0;
  position: relative;
`;

export const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: ${COLORS.primary};
  color: white;
  box-shadow: 0 2px 4px rgba(74, 222, 128, 0.1);
`;

export const ApplyAllButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${COLORS.primary};
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${COLORS.primaryHover};
    transform: translateY(-1px);
  }
`;

export const ResultContent = styled.div`
  flex: 1;
  padding: 1rem;
  background: white;
  position: relative;
  color: ${COLORS.background};
  min-height: 200px;
`;

export const ErrorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ErrorItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid ${COLORS.border};
  border-radius: 6px;
  background: rgba(74, 222, 128, 0.05);
  border-left: 3px solid ${COLORS.primary};
`;

export const ErrorText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  
  .error-text {
    color: ${COLORS.error};
    font-weight: 500;
    background: rgba(239, 68, 68, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }
  
  .arrow {
    color: ${COLORS.textSecondary};
    font-weight: bold;
  }
  
  .suggestion {
    color: ${COLORS.primary};
    font-weight: 500;
    background: rgba(74, 222, 128, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

export const DropdownIcon = styled.span`
  color: ${COLORS.textSecondary};
  font-size: 0.8rem;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${COLORS.textSecondary};
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.5;
`;

export const CompleteButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(74, 222, 128, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    background: ${COLORS.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 222, 128, 0.4);
  }
`;

export const CheckIcon = styled.span`
  font-size: 1rem;
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${COLORS.background};
  font-size: 0.8rem;
  color: ${COLORS.textSecondary};
  margin-bottom: 2rem;
`;

export const LegendDot = styled.div`
  width: 8px;
  height: 8px;
  background: ${COLORS.primary};
  border-radius: 50%;
`;
