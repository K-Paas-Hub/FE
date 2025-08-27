import styled from 'styled-components';
import { theme } from '../theme/theme';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

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

// 드롭다운 스타일
export const FormSelect = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #374151;
  min-height: 44px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    font-size: 16px; /* iOS에서 줌 방지 */
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
export const ResumePreviewContent = styled.div`
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

// 미리보기 모달 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const PreviewSection = styled.div`
  margin-bottom: 2rem;
`;

export const PreviewSectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PreviewContent = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #4ade80;
`;

export const PreviewText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap;
`;

export const EmptyText = styled.p`
  color: #9ca3af;
  font-style: italic;
  margin: 0;
`;

// 선택된 태그 관련 스타일
export const SelectedExperienceTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #f59e0b;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const SelectedAddressTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #10b981;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

// 학력 정보 관련 스타일
export const SchoolTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const SchoolTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#4ade80' : '#d1d5db'};
  background: ${props => props.$active ? '#4ade80' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    background: ${props => props.$active ? '#4ade80' : '#f0fdf4'};
  }
`;

export const SmartSearchContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #374151;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 1rem;
`;

export const SchoolCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
`;

export const SchoolCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const SchoolCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const SchoolIcon = styled.span`
  font-size: 1.5rem;
`;

export const SchoolName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const SchoolCategory = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const SchoolCardBody = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;


