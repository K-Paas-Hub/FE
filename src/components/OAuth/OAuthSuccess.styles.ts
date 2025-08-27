import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme/theme';

export const SuccessContainer = styled.div`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  text-align: center;
`;

export const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
`;

export const SuccessTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.lg};
`;

export const SuccessDescription = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.xl};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

export const SecondaryButton = styled(motion.button)`
  background: ${theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.colors.secondaryHover};
  }
`;
