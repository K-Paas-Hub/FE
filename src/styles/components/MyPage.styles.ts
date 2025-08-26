import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../theme/theme';

// 기존 MainHeader.styles.ts 패턴과 동일한 구조
export const MyPageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.backgroundGray};
  padding: 2rem 1rem;
  
  ${theme.media.tablet} {
    padding: 1rem 0.5rem;
  }
`;

export const MyPageContent = styled.div`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
`;

export const Sidebar = styled(motion.div)`
  background: white;
  border-radius: ${theme.radius.lg};
  padding: 1.5rem;
  box-shadow: ${theme.shadows.sm};
  height: fit-content;
  position: sticky;
  top: 2rem;
  
  ${theme.media.tablet} {
    position: static;
    order: -1;
  }
`;

export const MainContent = styled(motion.div)`
  background: white;
  border-radius: ${theme.radius.lg};
  padding: 2rem;
  box-shadow: ${theme.shadows.sm};
  
  ${theme.media.tablet} {
    padding: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin-bottom: 1.5rem;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin-bottom: 1rem;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.base};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  font-size: ${theme.typography.fontSize.sm};
`;

export const FormInput = styled.input`
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

export const FormSelect = styled.select`
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

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.base};
  background: white;
  color: ${theme.colors.textPrimary};
  min-height: 100px;
  resize: vertical;
  
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

export const PrimaryButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: ${theme.colors.textSecondary};
    cursor: not-allowed;
    transform: none;
  }
  
  ${theme.media.tablet} {
    padding: 0.6rem 1.2rem;
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const SecondaryButton = styled(motion.button)`
  background: white;
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${theme.colors.primary};
    color: white;
    transform: translateY(-1px);
  }
  
  ${theme.media.tablet} {
    padding: 0.6rem 1.2rem;
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const DangerButton = styled(motion.button)`
  background: ${theme.colors.error};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
  
  ${theme.media.tablet} {
    padding: 0.6rem 1.2rem;
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  ${theme.media.tablet} {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: 0.5rem;
`;

export const SuccessMessage = styled.div`
  color: ${theme.colors.success};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: 0.5rem;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${theme.colors.textSecondary};
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${theme.colors.primary};
  
  ${theme.media.tablet} {
    width: 60px;
    height: 60px;
  }
`;

export const AvatarUploadButton = styled.label`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${theme.colors.primaryHover};
  }
  
  input[type="file"] {
    display: none;
  }
`;

export const Section = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${theme.colors.borderLight};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const Card = styled(motion.div)`
  background: white;
  border-radius: ${theme.radius.lg};
  padding: 1.5rem;
  box-shadow: ${theme.shadows.sm};
  margin-bottom: 1rem;
  
  ${theme.media.tablet} {
    padding: 1rem;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${theme.colors.borderLight};
  
  &:last-child {
    border-bottom: none;
  }
  
  ${theme.media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const InfoLabel = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

export const InfoValue = styled.span`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.fontSize.base};
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.textSecondary};
    transition: 0.4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: ${theme.colors.primary};
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`;
