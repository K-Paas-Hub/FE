import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15rem;
  font-weight: 900;
  color: rgba(74, 222, 128, 0.1);
  z-index: 1;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 6rem;
  }
`;

const HeroContent = styled.div`
  z-index: 2;
  position: relative;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  
  .highlight {
    color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.6rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #cccccc;
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.2rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: ${COLORS.primary};
  margin-top: 2rem;
  color: #1a1a1a;
  border: none;
  padding: 1rem 2.3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 48px;
  min-width: 200px;
  
  &:hover {
    background: ${COLORS.primaryHover};
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem 2rem;
    font-size: 1rem;
    min-width: 180px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
    font-size: 0.9rem;
    min-width: 160px;
  }
`;

const HeroSection: React.FC = () => {
  return (
    <HeroContainer id="hero">
      <BackgroundText>RECRUIT</BackgroundText>
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.duration.slow }}
        >
          WE ARE <span className="highlight">INNOVATION</span>
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.duration.slow, delay: 0.2 }}
        >
          혁신적인 채용 플랫폼으로<br />
          최고의 인재와 기업을 연결합니다
        </HeroSubtitle>
        <CTAButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.duration.slow, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          채용 사이트 바로가기 →
        </CTAButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
