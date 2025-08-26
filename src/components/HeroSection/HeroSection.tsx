import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ANIMATIONS } from '../../constants';
import {
  HeroContainer,
  BackgroundText,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CTAButton,
} from '../../styles/components/HeroSection.styles';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/main');
  };

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
          onClick={handleCTAClick}
        >
          채용 사이트 바로가기 →
        </CTAButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
