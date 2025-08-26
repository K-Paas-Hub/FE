import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
          {t('landing.hero.title').split(' ').map((word: string, index: number) => 
            word === 'INNOVATION' ? 
              <span key={index} className="highlight">{word}</span> : 
              <span key={index}>{word}</span>
          )}
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.duration.slow, delay: 0.2 }}
        >
          {t('landing.hero.subtitle')}
        </HeroSubtitle>
        <CTAButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.duration.slow, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCTAClick}
        >
          {t('landing.hero.ctaButton')} →
        </CTAButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
