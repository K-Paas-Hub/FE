import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme/theme';

export const AddressSearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const AddressSearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.base};
  background: white;
  color: ${theme.colors.textPrimary};
  min-height: 44px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &:disabled {
    background: ${theme.colors.backgroundGray};
    color: ${theme.colors.textSecondary};
    cursor: not-allowed;
  }
  
  ${theme.media.tablet} {
    font-size: 16px; // iOS에서 줌 방지
  }
`;

export const AddressSearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: ${theme.radius.sm};
  cursor: pointer;
  min-height: 32px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${theme.colors.primaryHover};
  }
  
  &:disabled {
    background: ${theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

export const AddressResultsContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadows.lg};
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 0.25rem;
`;

export const AddressResultItem = styled(motion.div)`
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid ${theme.colors.borderLight};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: ${theme.colors.backgroundGray};
  }
  
  &:focus {
    outline: none;
    background: ${theme.colors.primary}20;
  }
`;

export const AddressResultTitle = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.fontSize.base};
  margin-bottom: 0.25rem;
`;

export const AddressResultSubtitle = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.4;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

export const NoResultsText = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

export const ClearButton = styled(motion.button)`
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  min-height: 24px;
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${theme.colors.backgroundGray};
    color: ${theme.colors.textPrimary};
  }
`;
