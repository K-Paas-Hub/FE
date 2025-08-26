import styled from 'styled-components';
import { theme } from '../theme/theme';

// Page Layout Components - 모든 페이지에서 재사용되는 공통 컴포넌트

// Main Page Container
export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.backgroundGray};
`;

// Main Content Wrapper
export const PageContent = styled.main`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
  }
`;

// Page Header Section
export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

// Enhanced Page Header with Background
export const PageHeaderWithBg = styled(PageHeader)`
  padding: ${theme.spacing.xl} 0;
  background: ${theme.colors.primary};
  border-radius: ${theme.radius.lg};
  color: white;
  box-shadow: ${theme.shadows.lg};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg} 0;
    margin-bottom: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md} 0;
    border-radius: ${theme.radius.md};
  }
`;

// Page Title
export const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.lg};
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.xl};
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

// Page Title for colored backgrounds
export const PageTitleLight = styled(PageTitle)`
  color: white;
`;

// Page Subtitle
export const PageSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

// Page Subtitle for colored backgrounds
export const PageSubtitleLight = styled(PageSubtitle)`
  color: rgba(255, 255, 255, 0.9);
`;

// Page Section
export const PageSection = styled.section`
  background: white;
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.md};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
    border-radius: ${theme.radius.md};
  }
`;

// Section Title
export const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.lg};
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.md};
  }
`;

// Section Subtitle
export const SectionSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

// Form Section - 특화된 섹션
export const FormSection = styled(PageSection)`
  border-left: 4px solid ${theme.colors.primary};
`;

// Action Section - 버튼들을 위한 섹션
export const ActionSection = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.xl};
  
  ${theme.media.mobile} {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

// Progress Section - 진행상황 표시
export const ProgressSection = styled.div`
  background: ${theme.colors.backgroundLight};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  border-left: 4px solid ${theme.colors.success};
`;

// Alert Section - 알림/경고
export const AlertSection = styled.div<{ $variant?: 'info' | 'warning' | 'error' | 'success' }>`
  background: ${props => {
    switch (props.$variant) {
      case 'warning': return theme.colors.warningLight;
      case 'error': return theme.colors.dangerLight;
      case 'success': return theme.colors.successLight;
      default: return theme.colors.primaryLight;
    }
  }};
  border: 1px solid ${props => {
    switch (props.$variant) {
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.danger;
      case 'success': return theme.colors.success;
      default: return theme.colors.primary;
    }
  }};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

// Responsive Grid for form layouts
export const FormGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns || 2}, 1fr);
  gap: ${theme.spacing.lg};
  
  ${theme.media.tablet} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

// Loading Section
export const LoadingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
`;

// Empty State Section
export const EmptySection = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
  
  h3 {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    font-size: ${theme.typography.fontSize.base};
    line-height: 1.6;
  }
`;