import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../theme/theme';

// Hero Container
export const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

// Background Text
export const BackgroundText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15rem;
  font-weight: ${theme.typography.fontWeight.black};
  color: rgba(74, 222, 128, 0.1);
  z-index: 1;
  white-space: nowrap;
  
  ${theme.media.tablet} {
    font-size: 8rem;
  }
  
  ${theme.media.mobile} {
    font-size: 6rem;
  }
`;

// Hero Content
export const HeroContent = styled.div`
  z-index: 2;
  position: relative;
`;

export const HeroTitle = styled(motion.h1)`
  font-size: ${theme.typography.fontSize['6xl']};
  font-weight: ${theme.typography.fontWeight.black};
  margin-bottom: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  
  .highlight {
    color: ${theme.colors.primary};
  }
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize['4xl']};
    margin-bottom: 0.8rem;
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: 0.6rem;
  }
`;

export const HeroSubtitle = styled(motion.p)`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textLight};
  margin-bottom: 2rem;
  line-height: ${theme.typography.lineHeight.relaxed};
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: 1.5rem;
  }
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize.base};
    margin-bottom: 1.2rem;
  }
`;

export const CTAButton = styled(motion.button)`
  background: ${theme.colors.primary};
  margin-top: 2rem;
  color: #1a1a1a;
  border: none;
  padding: 1rem 2.3rem;
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  min-height: 48px;
  min-width: 200px;
  
  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-2px);
  }
  
  ${theme.media.tablet} {
    padding: 1.2rem 2rem;
    font-size: ${theme.typography.fontSize.base};
    min-width: 180px;
  }
  
  ${theme.media.mobile} {
    padding: 1rem 1.5rem;
    font-size: ${theme.typography.fontSize.sm};
    min-width: 160px;
  }
`;