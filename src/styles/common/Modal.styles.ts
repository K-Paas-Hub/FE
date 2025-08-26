import styled, { css } from 'styled-components';
import { theme } from '../theme/theme';

// Modal Overlay
export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.modal.overlay};
  z-index: ${theme.zIndex.modalBackdrop};
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  animation: ${props => props.$isOpen ? 'fadeIn' : 'fadeOut'} ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
    align-items: flex-end;
  }
`;

// Modal Container
export const ModalContainer = styled.div<{ $isOpen: boolean; $size?: 'sm' | 'md' | 'lg' | 'xl' }>`
  background: ${theme.colors.modal.background};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadows.xl};
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  z-index: ${theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  
  ${props => {
    switch (props.$size) {
      case 'sm':
        return css`max-width: 400px; width: 100%;`;
      case 'lg':
        return css`max-width: 800px; width: 100%;`;
      case 'xl':
        return css`max-width: 1200px; width: 100%;`;
      default:
        return css`max-width: 600px; width: 100%;`;
    }
  }}
  
  animation: ${props => props.$isOpen ? 'slideUp' : 'slideDown'} ${theme.animations.duration.normal} ${theme.animations.easing.easeOutQuart};
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
  
  ${theme.media.mobile} {
    max-height: 85vh;
    border-radius: ${theme.radius.lg} ${theme.radius.lg} 0 0;
    animation: ${props => props.$isOpen ? 'slideUpMobile' : 'slideDownMobile'} ${theme.animations.duration.normal} ${theme.animations.easing.easeOutQuart};
    
    @keyframes slideUpMobile {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    
    @keyframes slideDownMobile {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(100%);
      }
    }
  }
`;

// Modal Header
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.borderLight};
  flex-shrink: 0;
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.lg};
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin: 0;
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

export const ModalCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.xl};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${theme.colors.backgroundGray};
    color: ${theme.colors.textPrimary};
  }
  
  ${theme.media.mobile} {
    width: 36px;
    height: 36px;
    font-size: ${theme.typography.fontSize.lg};
  }
`;

// Modal Body
export const ModalBody = styled.div<{ $padding?: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.$padding !== false ? `${theme.spacing.xl}` : '0'};
  
  ${theme.media.mobile} {
    padding: ${props => props.$padding !== false ? `${theme.spacing.lg}` : '0'};
  }
`;

// Modal Footer
export const ModalFooter = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.borderLight};
  flex-shrink: 0;
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.lg};
    flex-direction: column-reverse;
    gap: ${theme.spacing.sm};
  }
`;

// Drawer (Side Modal)
export const DrawerOverlay = styled(ModalOverlay)<{ $position?: 'left' | 'right' }>`
  justify-content: ${props => props.$position === 'left' ? 'flex-start' : 'flex-end'};
  padding: 0;
`;

export const DrawerContainer = styled.div<{ 
  $isOpen: boolean; 
  $position?: 'left' | 'right';
  $width?: string;
}>`
  background: ${theme.colors.modal.background};
  height: 100vh;
  width: ${props => props.$width || '400px'};
  max-width: 90vw;
  box-shadow: ${theme.shadows.xl};
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: ${theme.zIndex.modal};
  
  animation: ${props => {
    const direction = props.$position === 'left' ? 'Left' : 'Right';
    return props.$isOpen ? `slideIn${direction}` : `slideOut${direction}`;
  }} ${theme.animations.duration.normal} ${theme.animations.easing.easeOutQuart};
  
  @keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOutLeft {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  
  ${theme.media.mobile} {
    width: 100vw;
    max-width: 100vw;
  }
`;

// Confirmation Modal Components
export const ConfirmModalContent = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg} 0;
`;

export const ConfirmModalIcon = styled.div<{ $type?: 'warning' | 'danger' | 'success' | 'info' }>`
  font-size: ${theme.typography.fontSize['5xl']};
  margin-bottom: ${theme.spacing.lg};
  
  ${props => {
    switch (props.$type) {
      case 'warning':
        return css`color: ${theme.colors.warning};`;
      case 'danger':
        return css`color: ${theme.colors.error};`;
      case 'success':
        return css`color: ${theme.colors.success};`;
      case 'info':
        return css`color: ${theme.colors.info};`;
      default:
        return css`color: ${theme.colors.textSecondary};`;
    }
  }}
`;

export const ConfirmModalMessage = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const ConfirmModalDescription = styled.div`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

// Loading Modal
export const LoadingModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['2xl']};
  gap: ${theme.spacing.lg};
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.borderLight};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: ${theme.radius.full};
  animation: spin 1s linear infinite;
  
  ${theme.animations.spin}
`;

export const LoadingText = styled.div`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSecondary};
  text-align: center;
`;