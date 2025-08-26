import styled, { css } from 'styled-components';
import { theme } from '../theme/theme';

// Button Base Styles
const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  font-family: ${theme.typography.fontFamily.primary};
  border: none;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  text-decoration: none;
  white-space: nowrap;
  min-height: 44px;
  min-width: 44px;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

// Button Variants
export const PrimaryButton = styled.button`
  ${buttonBase}
  
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled.button`
  ${buttonBase}
  
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primaryDark};
  }
`;

export const OutlineButton = styled.button`
  ${buttonBase}
  
  background: transparent;
  color: ${theme.colors.textPrimary};
  border: 1px solid ${theme.colors.borderLight};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.backgroundGray};
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const GhostButton = styled.button`
  ${buttonBase}
  
  background: transparent;
  color: ${theme.colors.textSecondary};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.backgroundGray};
    color: ${theme.colors.textPrimary};
  }
`;

export const DangerButton = styled.button`
  ${buttonBase}
  
  background: ${theme.colors.error};
  color: ${theme.colors.white};
  
  &:hover:not(:disabled) {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

// Button Sizes
export const SmallButton = styled(PrimaryButton)`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.sm};
  min-height: 36px;
`;

export const LargeButton = styled(PrimaryButton)`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.lg};
  min-height: 52px;
`;

// Icon Buttons
export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  color: ${theme.colors.textSecondary};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.backgroundGray};
    color: ${theme.colors.textPrimary};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const IconButtonPrimary = styled(IconButton)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primaryHover};
    transform: translateY(-1px);
  }
`;

// Floating Action Button
export const FAB = styled.button`
  position: fixed;
  bottom: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  width: 60px;
  height: 60px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.radius.full};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.lg};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  z-index: ${theme.zIndex.fixed};
  
  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
  
  ${theme.media.mobile} {
    bottom: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
    width: 50px;
    height: 50px;
  }
`;

// Button Groups
export const ButtonGroup = styled.div`
  display: inline-flex;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  border: 1px solid ${theme.colors.borderLight};
  
  > button {
    border-radius: 0;
    border: none;
    border-right: 1px solid ${theme.colors.borderLight};
    
    &:last-child {
      border-right: none;
    }
    
    &:hover {
      transform: none;
      box-shadow: none;
      z-index: 1;
    }
  }
`;

// Link Button (looks like button but behaves like link)
export const LinkButton = styled.a`
  ${buttonBase}
  
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  
  &:hover:not(.disabled) {
    background: ${theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
  
  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// Loading Button
export const LoadingButton = styled(PrimaryButton)<{ $loading?: boolean }>`
  position: relative;
  
  ${props => props.$loading && css`
    color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      color: ${theme.colors.white};
    }
    
    ${theme.animations.spin}
  `}
`;