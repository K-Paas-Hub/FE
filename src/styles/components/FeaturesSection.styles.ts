import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

export const Section = styled.section`
  padding: 8rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(74, 222, 128, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  
  .highlight {
    color: ${COLORS.primary};
    background: linear-gradient(135deg, ${COLORS.primary}, #4ade80);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, ${COLORS.primary}, transparent);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.15) 0%, rgba(74, 222, 128, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(74, 222, 128, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
    animation: rotate 4s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  &:hover {
    background: white;
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    border-color: ${COLORS.primary};
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 20px;
    
    &:hover {
      transform: translateY(-8px) scale(1.01);
    }
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 16px;
    
    &:hover {
      transform: translateY(-5px) scale(1.005);
    }
  }
`;

export const FeatureIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, ${COLORS.primary}, #4ade80);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 25px rgba(74, 222, 128, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    transition: all 0.4s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  
  ${FeatureCard}:hover & {
    background: linear-gradient(135deg, #4ade80, ${COLORS.primary});
    transform: scale(1.15) rotate(5deg);
    box-shadow: 0 15px 35px rgba(74, 222, 128, 0.4);
    
    img {
      transform: scale(1.1);
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin-bottom: 1.2rem;
    
    img {
      width: 50px;
      height: 50px;
    }
  }
  
  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    margin-bottom: 1rem;
    
    img {
      width: 45px;
      height: 45px;
    }
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${COLORS.primary};
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  ${FeatureCard}:hover & {
    color: ${COLORS.primary};
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

export const FeatureDescription = styled.p`
  color: #cccccc;
  line-height: 1.7;
  font-size: 1.1rem;
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  ${FeatureCard}:hover & {
    color: #1a1a1a;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

