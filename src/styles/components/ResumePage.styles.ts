import styled from 'styled-components';
import { theme } from '../theme/theme';

// Main Container
export const ResumeContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.backgroundGray};
`;

export const ResumeContent = styled.main`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

// Header Section
export const ResumeHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

export const ResumeTitle = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.lg};
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

export const ResumeSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textMuted};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

// Section Components
export const ResumeSection = styled.section`
  background: white;
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.xl};
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

export const SectionIcon = styled.span`
  background: ${theme.colors.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: ${theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.lg};
`;

// Form Components
export const ResumeForm = styled.form`
  display: grid;
  gap: ${theme.spacing.xl};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const FormLabel = styled.label`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.base};
`;

export const FormInput = styled.input<{ $hasError?: boolean }>`
  padding: ${theme.spacing.lg};
  border: 2px solid ${props => props.$hasError ? theme.colors.error : theme.colors.borderLight};
  border-radius: ${theme.radius.lg};
  font-size: ${theme.typography.fontSize.base};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
  }
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const FormTextarea = styled.textarea<{ $hasError?: boolean }>`
  padding: ${theme.spacing.lg};
  border: 2px solid ${props => props.$hasError ? theme.colors.error : theme.colors.borderLight};
  border-radius: ${theme.radius.lg};
  font-size: ${theme.typography.fontSize.base};
  min-height: 120px;
  resize: vertical;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
  }
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const FormSelect = styled.select<{ $hasError?: boolean }>`
  padding: ${theme.spacing.lg};
  border: 2px solid ${props => props.$hasError ? theme.colors.error : theme.colors.borderLight};
  border-radius: ${theme.radius.lg};
  font-size: ${theme.typography.fontSize.base};
  background: white;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
  }
`;

// Button Components
export const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  margin-top: ${theme.spacing['2xl']};
  
  ${theme.media.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

export const PrimaryButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.base};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:disabled {
    background: ${theme.colors.textMuted};
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryButton = styled.button`
  background: white;
  color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.base};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${theme.colors.primary};
    color: white;
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
`;

// Preview Components
export const PreviewContent = styled.div`
  background: white;
  border: 2px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
  
  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.textPrimary};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    color: ${theme.colors.textSecondary};
    line-height: ${theme.typography.lineHeight.relaxed};
    margin-bottom: ${theme.spacing.md};
  }
  
  ul, ol {
    margin-left: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.md};
  }
  
  li {
    color: ${theme.colors.textSecondary};
    margin-bottom: ${theme.spacing.sm};
  }
`;

// Loading and Status Components
export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.full};
  border-top-color: ${theme.colors.primary};
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const FieldError = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  &::before {
    content: "⚠️";
    font-size: ${theme.typography.fontSize.xs};
  }
`;

export const SuccessMessage = styled.div`
  background: ${theme.colors.success};
  color: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  &::before {
    content: "✓";
    font-weight: ${theme.typography.fontWeight.bold};
  }
`;

// File Upload Components
export const FileUpload = styled.div<{ $dragActive: boolean }>`
  border: 3px dashed ${props => props.$dragActive ? theme.colors.primary : theme.colors.borderLight};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing['2xl']};
  text-align: center;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  background: ${props => props.$dragActive ? theme.colors.backgroundGray : 'white'};
  
  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.backgroundGray};
  }
`;

export const UploadProgress = styled.div`
  margin-top: ${theme.spacing.lg};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${theme.colors.borderLight};
  border-radius: ${theme.radius.full};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: ${theme.colors.primary};
  width: ${props => props.$progress}%;
  transition: width ${theme.animations.duration.normal} ${theme.animations.easing.ease};
`;

export const FileList = styled.div`
  margin-top: ${theme.spacing.lg};
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.backgroundGray};
  border-radius: ${theme.radius.md};
  margin-bottom: ${theme.spacing.sm};
`;

export const DeleteButton = styled.button`
  background: ${theme.colors.error};
  color: white;
  border: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radius.sm};
  font-size: ${theme.typography.fontSize.xs};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${theme.colors.errorHover};
  }
`;

export const UploadText = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.sm};
`;

export const UploadSubtext = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textMuted};
`;

// Modal Components
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.borderLight};
`;

export const ModalTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.textMuted};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.radius.sm};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${theme.colors.backgroundGray};
    color: ${theme.colors.textPrimary};
  }
`;
