import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../theme/theme';

export const JobDetailContainer = styled.div`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  min-height: 100vh;
  background: ${theme.colors.white} !important;
  color: ${theme.colors.textPrimary};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.borderLight};
  
  ${theme.media.tablet} {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: stretch;
  }
`;

export const BackButton = styled(motion.button)`
  background: ${theme.colors.backgroundGray};
  color: ${theme.colors.textPrimary};
  border: 1px solid ${theme.colors.borderLight};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.base};
  
  &:hover {
    background: ${theme.colors.primaryLight};
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primaryDark};
  }
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const ApplyButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  font-size: ${theme.typography.fontSize.base};
  min-height: 44px;
  min-width: 120px;
  
  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.sm};
    min-width: 100px;
  }
`;

export const CompanySection = styled.section`
  display: flex;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.xl};
  box-shadow: ${theme.shadows.sm};
  
  ${theme.media.tablet} {
    flex-direction: column;
    gap: ${theme.spacing.lg};
    padding: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
  }
  
  .company-logo {
    flex-shrink: 0;
    
    .logo {
      width: 80px;
      height: 80px;
      border-radius: ${theme.radius.lg};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.typography.fontSize['2xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      
      &.red {
        background: #fee2e2;
        color: #dc2626;
      }
      
      &.blue {
        background: #dbeafe;
        color: #2563eb;
      }
      
      &.green {
        background: #dcfce7;
        color: ${theme.colors.primaryDark};
      }
      
      &.orange {
        background: #fed7aa;
        color: #ea580c;
      }
      
      &.purple {
        background: #f3e8ff;
        color: #7c3aed;
      }
      
      ${theme.media.tablet} {
        width: 60px;
        height: 60px;
        font-size: ${theme.typography.fontSize.xl};
      }
    }
  }
  
  .company-info {
    flex: 1;
    
    h1 {
      font-size: ${theme.typography.fontSize['3xl']};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.textPrimary};
      margin: 0 0 ${theme.spacing.sm} 0;
      line-height: ${theme.typography.lineHeight.tight};
      
      ${theme.media.tablet} {
        font-size: ${theme.typography.fontSize['2xl']};
      }
      
      ${theme.media.mobile} {
        font-size: ${theme.typography.fontSize.xl};
      }
    }
    
    h2 {
      font-size: ${theme.typography.fontSize.xl};
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.textSecondary};
      margin: 0 0 ${theme.spacing.md} 0;
      
      ${theme.media.tablet} {
        font-size: ${theme.typography.fontSize.lg};
      }
    }
    
    .job-meta {
      display: flex;
      flex-wrap: wrap;
      gap: ${theme.spacing.md};
      margin-bottom: ${theme.spacing.md};
      
      span {
        background: ${theme.colors.backgroundGray};
        color: ${theme.colors.textSecondary};
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        border-radius: ${theme.radius.md};
        font-size: ${theme.typography.fontSize.sm};
        font-weight: ${theme.typography.fontWeight.medium};
      }
      
      ${theme.media.mobile} {
        gap: ${theme.spacing.sm};
        
        span {
          font-size: ${theme.typography.fontSize.xs};
          padding: ${theme.spacing.xs};
        }
      }
    }
    
    .visa-badge {
      display: inline-block;
      background: ${theme.colors.primaryLight};
      color: ${theme.colors.primaryDark};
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      border-radius: ${theme.radius.md};
      font-size: ${theme.typography.fontSize.sm};
      font-weight: ${theme.typography.fontWeight.semibold};
      border: 1px solid ${theme.colors.primary};
    }
  }
`;

export const JobDescription = styled.section`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.textPrimary};
    margin: 0 0 ${theme.spacing.md} 0;
    
    ${theme.media.tablet} {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
  
  p {
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.relaxed};
    color: ${theme.colors.textSecondary};
    margin: 0;
  }
`;

export const RequirementsSection = styled.section`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.textPrimary};
    margin: 0 0 ${theme.spacing.md} 0;
    
    ${theme.media.tablet} {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      position: relative;
      padding-left: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.base};
      line-height: ${theme.typography.lineHeight.normal};
      color: ${theme.colors.textSecondary};
      
      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: ${theme.colors.primary};
        font-weight: ${theme.typography.fontWeight.bold};
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const BenefitsSection = styled.section`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.textPrimary};
    margin: 0 0 ${theme.spacing.md} 0;
    
    ${theme.media.tablet} {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      position: relative;
      padding-left: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.base};
      line-height: ${theme.typography.lineHeight.normal};
      color: ${theme.colors.textSecondary};
      
      &:before {
        content: '🎁';
        position: absolute;
        left: 0;
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const ContactSection = styled.section`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.textPrimary};
    margin: 0 0 ${theme.spacing.md} 0;
    
    ${theme.media.tablet} {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
  
  .contact-info {
    p {
      font-size: ${theme.typography.fontSize.base};
      line-height: ${theme.typography.lineHeight.normal};
      color: ${theme.colors.textSecondary};
      margin: 0 0 ${theme.spacing.sm} 0;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textSecondary};
  
  &:before {
    content: '⏳';
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: ${theme.spacing.xl};
  
  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.error};
    margin: 0 0 ${theme.spacing.md} 0;
    
    ${theme.media.tablet} {
      font-size: ${theme.typography.fontSize.xl};
    }
  }
  
  p {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.textSecondary};
    margin: 0 0 ${theme.spacing.xl} 0;
    line-height: ${theme.typography.lineHeight.normal};
  }
`;
