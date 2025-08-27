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

// 언어 관련 스타일
export const LanguageTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const LanguageTypeButton = styled.button<{ $active: boolean }>`
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

export const LanguageCardGrid = styled.div`
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

export const LanguageCard = styled.div`
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

export const LanguageCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const LanguageIcon = styled.span`
  font-size: 1.5rem;
`;

export const LanguageName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const LanguageCardBody = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const LanguageCategory = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const LanguageDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const LanguageCardFooter = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
`;

export const LanguageTimeline = styled.div`
  margin-top: 1.5rem;
`;

// 언어 타임라인 관련 스타일
export const TimelineLanguageCard = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
`;

export const TimelineLanguageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const TimelineLanguageIcon = styled.span`
  font-size: 1.25rem;
`;

export const TimelineLanguageInfo = styled.div`
  /* flex: 1 제거해서 필요한 만큼만 공간 차지 */
`;

export const TimelineLanguageName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const TimelineLanguageCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const TimelineLanguageBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// 자격증 관련 스타일
export const CertificationTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const CertificationTypeButton = styled.button<{ $active: boolean }>`
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

export const CertificationCardGrid = styled.div`
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

export const CertificationCard = styled.div`
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

export const CertificationCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const CertificationIcon = styled.span`
  font-size: 1.5rem;
`;

export const CertificationCardName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const CertificationCardCategory = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const CertificationCardBody = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const CertificationDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

export const CertificationCardFooter = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
`;

export const CertificationTimeline = styled.div`
  margin-top: 1.5rem;
`;

export const TimelineCertificationCard = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
`;

export const TimelineCertificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const TimelineCertificationIcon = styled.span`
  font-size: 1.25rem;
`;

export const TimelineCertificationInfo = styled.div`
  /* flex: 1 제거해서 필요한 만큼만 공간 차지 */
`;

export const TimelineCertificationName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const TimelineCertificationCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const TimelineCertificationBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CertificationGradeSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
  color: #374151;
  margin-left: 0.125rem;
  margin-right: 0.5rem;
  align-self: flex-start;
  margin-top: -0.125rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

export const ExperienceYearsSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
  color: #374151;
  margin-left: 0.125rem;
  margin-right: 0.5rem;
  align-self: flex-start;
  margin-top: -0.125rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

// 기술 관련 스타일
export const SkillTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const SkillTypeButton = styled.button<{ $active: boolean }>`
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

export const SkillCardGrid = styled.div`
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

export const SkillCard = styled.div`
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

export const SkillCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const SkillIcon = styled.span`
  font-size: 1.5rem;
`;

export const SkillCardName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const SkillCardCategory = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const SkillCardBody = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const SkillDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

export const SkillCardFooter = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
`;

export const SkillTimeline = styled.div`
  margin-top: 1.5rem;
`;

export const TimelineSkillCard = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
`;

export const TimelineSkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const TimelineSkillIcon = styled.span`
  font-size: 1.25rem;
`;

export const TimelineSkillInfo = styled.div`
  /* flex: 1 제거해서 필요한 만큼만 공간 차지 */
`;

export const TimelineSkillName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const TimelineSkillCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const TimelineSkillBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SkillLevelSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
  color: #374151;
  margin-left: 0.125rem;
  margin-right: 0.5rem;
  align-self: flex-start;
  margin-top: -0.125rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

export const ExperienceTimeline = styled.div`
  margin-top: 1.5rem;
`;

export const TimelineExperienceCard = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
`;

export const TimelineExperienceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const TimelineExperienceIcon = styled.span`
  font-size: 1.25rem;
`;

export const TimelineExperienceInfo = styled.div`
  /* flex: 1 제거해서 필요한 만큼만 공간 차지 */
`;

export const TimelineExperienceName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const TimelineExperienceCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const TimelineExperienceBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TimelineExperienceRemoveButton = styled.button`
  background: none;
  color: #6b7280;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    color: #374151;
    background: #f3f4f6;
  }
`;

// 남은 스타일들
export const CertificationSearchContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 300px;
`;

export const CertificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 100%;
  width: 100%;
`;

export const CertificationOption = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background-color: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const CertificationName = styled.span`
  font-weight: 500;
  color: #374151;
`;

export const CertificationCategory = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

export const SelectedCertificationsContainer = styled.div`
  margin-top: 1rem;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  min-width: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const NoResultsText = styled.div`
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-style: italic;
`;

// 어학 능력 레벨 선택 스타일
export const LanguageLevelSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
  color: #374151;
  margin-left: 0.125rem;
  margin-right: 0.5rem;
  align-self: flex-start;
  margin-top: -0.125rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

export const NoResultsCard = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-style: italic;
`;

export const EducationTimeline = styled.div`
  margin-top: 1.5rem;
`;

export const TimelineTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 1.5rem;
    top: 2.5rem;
    bottom: -1rem;
    width: 2px;
    background: #e5e7eb;
  }
  
  &:last-child::before {
    display: none;
  }
`;

export const TimelineContent = styled.div`
  flex: 1;
`;

export const TimelineSchoolCard = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
`;

export const TimelineSchoolHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const TimelineSchoolIcon = styled.span`
  font-size: 1.25rem;
`;

export const TimelineSchoolInfo = styled.div`
  /* flex: 1 제거해서 필요한 만큼만 공간 차지 */
`;

export const TimelineSchoolName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const TimelineSchoolCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const TimelineRemoveButton = styled.button`
  background: none;
  color: #6b7280;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    color: #374151;
    background: #f3f4f6;
  }
`;

export const TimelineSchoolBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
  color: #374151;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  align-self: flex-start;
  margin-top: -0.125rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

export const RestartButton = styled(motion.button)`
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${COLORS.primaryHover};
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.7rem 1.2rem;
  }
`;

// 에러 메시지
export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// 전체 너비 폼 그룹
export const FullWidthFormGroup = styled(FormGroup)`
  width: 100%;
`;

// 최소 너비 폼 그룹
export const MinWidthFormGroup = styled(FormGroup)`
  min-width: 100%;
`;

// 플렉스 스페이서
export const FlexSpacer = styled.div`
  flex: 1;
`;

// 에러 알림
export const ErrorAlert = styled.div`
  color: red;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;










