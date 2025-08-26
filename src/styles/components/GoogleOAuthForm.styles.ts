import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../theme/theme';

export const OAuthContainer = styled.div`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

export const OAuthForm = styled.form`
  background: white;
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

export const FormLabel = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.sm};
`;

export const FormInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.base};
  background-color: white;
  color: ${theme.colors.textPrimary};
  min-height: 44px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &:disabled {
    background-color: ${theme.colors.backgroundGray};
    color: ${theme.colors.textSecondary};
    cursor: not-allowed;
  }
  
  ${theme.media.tablet} {
    font-size: 16px;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.base};
  background-color: white;
  color: ${theme.colors.textPrimary};
  min-height: 44px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &:disabled {
    background-color: ${theme.colors.backgroundGray};
    color: ${theme.colors.textSecondary};
    cursor: not-allowed;
  }
  
  ${theme.media.tablet} {
    font-size: 16px;
  }
`;

export const PrimaryButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.radius.lg};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:disabled {
    background: ${theme.colors.textSecondary};
    cursor: not-allowed;
  }
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid ${theme.colors.error};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
`;

export const SuccessMessage = styled.div`
  color: ${theme.colors.primary};
  background-color: rgba(74, 222, 128, 0.1);
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
`;
