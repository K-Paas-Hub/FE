import styled, { css } from 'styled-components';
import { theme } from '../theme/theme';

// Headings
export const H1 = styled.h1<{ $color?: string; $align?: 'left' | 'center' | 'right'; }>`
  font-size: ${theme.typography.fontSize['5xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${props => props.$color || theme.colors.textPrimary};
  text-align: ${props => props.$align || 'left'};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize['4xl']};
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

export const H2 = styled.h2<{ $color?: string; $align?: 'left' | 'center' | 'right'; }>`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${props => props.$color || theme.colors.textPrimary};
  text-align: ${props => props.$align || 'left'};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize['3xl']};
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

export const H3 = styled.h3<{ $color?: string; $align?: 'left' | 'center' | 'right'; }>`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.semibold};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${props => props.$color || theme.colors.textPrimary};
  text-align: ${props => props.$align || 'left'};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize['2xl']};
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

export const H4 = styled.h4<{ $color?: string; $align?: 'left' | 'center' | 'right'; }>`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.semibold};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${props => props.$color || theme.colors.textPrimary};
  text-align: ${props => props.$align || 'left'};
  margin: 0;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.xl};
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

export const H5 = styled.h5<{ $color?: string; $align?: 'left' | 'center' | 'right'; }>`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.medium};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${props => props.$color || theme.colors.textPrimary};
  text-align: ${props => props.$align || 'left'};
  margin: 0;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.lg};
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize.base};
  }
`;

export const H6 = styled.h6<{ $color?: string; $align?: 'left' | 'center' | 'right'; }>`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${props => props.$color || theme.colors.textPrimary};
  text-align: ${props => props.$align || 'left'};
  margin: 0;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.base};
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize.sm};
  }
`;

// Paragraph
export const Paragraph = styled.p<{ 
  $size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  $color?: string;
  $align?: 'left' | 'center' | 'right' | 'justify';
  $lineHeight?: 'tight' | 'normal' | 'relaxed';
  $weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}>`
  font-size: ${props => theme.typography.fontSize[props.$size || 'base']};
  font-weight: ${props => theme.typography.fontWeight[props.$weight || 'normal']};
  line-height: ${props => theme.typography.lineHeight[props.$lineHeight || 'normal']};
  color: ${props => props.$color || theme.colors.textPrimary};
  text-align: ${props => props.$align || 'left'};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

// Text Variants
export const TextLarge = styled.span`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textPrimary};
`;

export const TextBase = styled.span`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textPrimary};
`;

export const TextSmall = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
`;

export const TextMuted = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textMuted};
`;

// Text Utilities
export const TextBold = styled.span`
  font-weight: ${theme.typography.fontWeight.bold};
`;

export const TextSemibold = styled.span`
  font-weight: ${theme.typography.fontWeight.semibold};
`;

export const TextMedium = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const TextLight = styled.span`
  font-weight: ${theme.typography.fontWeight.light};
`;

// Links
export const Link = styled.a<{ $variant?: 'primary' | 'secondary' | 'muted' }>`
  color: ${props => {
    switch (props.$variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'muted':
        return theme.colors.textMuted;
      default:
        return theme.colors.primary;
    }
  }};
  text-decoration: none;
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.ease};
  
  &:hover {
    text-decoration: underline;
    color: ${props => {
      switch (props.$variant) {
        case 'secondary':
          return theme.colors.secondaryHover;
        case 'muted':
          return theme.colors.textSecondary;
        default:
          return theme.colors.primaryHover;
      }
    }};
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

// Code Text
export const Code = styled.code`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: 0.9em;
  background: ${theme.colors.backgroundGray};
  color: ${theme.colors.textPrimary};
  padding: 0.125rem 0.25rem;
  border-radius: ${theme.radius.sm};
  border: 1px solid ${theme.colors.borderLight};
`;

export const CodeBlock = styled.pre`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
  background: ${theme.colors.backgroundGray};
  color: ${theme.colors.textPrimary};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.colors.borderLight};
  overflow-x: auto;
  white-space: pre;
  line-height: ${theme.typography.lineHeight.relaxed};
`;

// Lists
export const UnorderedList = styled.ul`
  margin: 0;
  padding-left: ${theme.spacing.lg};
  color: ${theme.colors.textPrimary};
  
  li {
    margin-bottom: ${theme.spacing.sm};
    line-height: ${theme.typography.lineHeight.relaxed};
  }
`;

export const OrderedList = styled.ol`
  margin: 0;
  padding-left: ${theme.spacing.lg};
  color: ${theme.colors.textPrimary};
  
  li {
    margin-bottom: ${theme.spacing.sm};
    line-height: ${theme.typography.lineHeight.relaxed};
  }
`;

export const ListItem = styled.li`
  line-height: ${theme.typography.lineHeight.relaxed};
`;

// Blockquote
export const Blockquote = styled.blockquote`
  margin: 0;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.backgroundGray};
  border-left: 4px solid ${theme.colors.primary};
  border-radius: ${theme.radius.md};
  font-style: italic;
  color: ${theme.colors.textSecondary};
  
  p {
    margin: 0;
  }
  
  cite {
    display: block;
    margin-top: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.textMuted};
    font-style: normal;
    
    &::before {
      content: '— ';
    }
  }
`;

// Text with highlight
export const HighlightText = styled.span<{ $color?: string }>`
  background: ${props => props.$color || theme.colors.primaryLight};
  color: ${theme.colors.primaryDark};
  padding: 0.125rem 0.25rem;
  border-radius: ${theme.radius.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`;

// Truncated text
export const TruncatedText = styled.span<{ $lines?: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.$lines || 1};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Text with icon
export const TextWithIcon = styled.div<{ $gap?: string }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$gap || theme.spacing.sm};
`;

// Status text
export const StatusText = styled.span<{ $status: 'success' | 'warning' | 'error' | 'info' }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  
  ${props => {
    switch (props.$status) {
      case 'success':
        return css`color: ${theme.colors.success};`;
      case 'warning':
        return css`color: ${theme.colors.warning};`;
      case 'error':
        return css`color: ${theme.colors.error};`;
      case 'info':
        return css`color: ${theme.colors.info};`;
      default:
        return css`color: ${theme.colors.textPrimary};`;
    }
  }}
`;