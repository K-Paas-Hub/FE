import styled from 'styled-components';
import { theme } from '../theme/theme';

// Container Components
export const Container = styled.div`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  
  ${theme.media.tablet} {
    padding: 0 ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: 0 ${theme.spacing.md};
  }
`;

export const ContainerFluid = styled.div`
  width: 100%;
  padding: 0 ${theme.spacing.md};
  
  ${theme.media.tablet} {
    padding: 0 ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: 0 ${theme.spacing.md};
  }
`;

// Section Components
export const Section = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  
  ${theme.media.tablet} {
    padding: ${theme.spacing['2xl']} 0;
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.xl} 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  color: ${theme.colors.textPrimary};
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.xl};
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.lg};
  }
`;

// Content Components
export const MainContent = styled.main`
  flex: 1;
  padding: ${theme.spacing.xl} 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const ContentRow = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: flex-start;
  
  ${theme.media.tablet} {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

export const ContentColumn = styled.div<{ $flex?: number }>`
  flex: ${props => props.$flex || 1};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

// Grid Components
export const Grid = styled.div<{ 
  $columns?: number; 
  $gap?: string; 
  $minWidth?: string; 
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns || 'auto-fit'}, minmax(${props => props.$minWidth || '300px'}, 1fr));
  gap: ${props => props.$gap || theme.spacing.lg};
  
  ${theme.media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.md};
  }
  
  ${theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

// Flexbox Components
export const FlexRow = styled.div<{ 
  $justify?: string; 
  $align?: string; 
  $gap?: string; 
  $wrap?: boolean; 
}>`
  display: flex;
  justify-content: ${props => props.$justify || 'flex-start'};
  align-items: ${props => props.$align || 'flex-start'};
  gap: ${props => props.$gap || theme.spacing.md};
  flex-wrap: ${props => props.$wrap ? 'wrap' : 'nowrap'};
`;

export const FlexColumn = styled.div<{ 
  $justify?: string; 
  $align?: string; 
  $gap?: string; 
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.$justify || 'flex-start'};
  align-items: ${props => props.$align || 'flex-start'};
  gap: ${props => props.$gap || theme.spacing.md};
`;

// Card Components
export const Card = styled.div<{ $padding?: boolean; $shadow?: boolean; }>`
  background: ${theme.colors.backgroundLight};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.lg};
  padding: ${props => props.$padding !== false ? theme.spacing.lg : '0'};
  box-shadow: ${props => props.$shadow !== false ? theme.shadows.sm : 'none'};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

// Page Layout Components
export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.backgroundLight};
`;

export const PageHeader = styled.header`
  background: ${theme.colors.backgroundLight};
  border-bottom: 1px solid ${theme.colors.borderLight};
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
`;

export const PageFooter = styled.footer`
  background: ${theme.colors.backgroundLight};
  border-top: 1px solid ${theme.colors.borderLight};
  margin-top: auto;
`;