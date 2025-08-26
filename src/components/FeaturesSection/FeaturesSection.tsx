import React from 'react';
import { useTranslation } from 'react-i18next';
import { ANIMATIONS } from '../../constants';
import {
  Section,
  FeaturesGrid,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  SectionTitle,
  FeatureCard
} from '../../styles/components/FeaturesSection.styles';

interface Feature {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
}

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const features: Feature[] = [
    {
      icon: '🌍',
      titleKey: 'landing.features.multilingual.title',
      descriptionKey: 'landing.features.multilingual.description',
      image: '/images/earth.png'
    },
    {
      icon: '⚖️',
      titleKey: 'landing.features.fairHiring.title',
      descriptionKey: 'landing.features.fairHiring.description',
      image: '/images/fair.png'
    },
    {
      icon: '🤝',
      titleKey: 'landing.features.legalSupport.title',
      descriptionKey: 'landing.features.legalSupport.description',
      image: '/images/legal.png'
    },
    {
      icon: '📋',
      titleKey: 'landing.features.visaSupport.title',
      descriptionKey: 'landing.features.visaSupport.description',
      image: '/images/visa_icon.png'
    }
  ];

  return (
    <Section id="activity">
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.slow, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {t('landing.features.title').split(' ').map((word: string, index: number) => 
          word === '특별한' ? 
            <span key={index} className="highlight">{word}</span> : 
            <span key={index}>{word}</span>
        )}
      </SectionTitle>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: ANIMATIONS.duration.normal, 
              delay: 0.2 * (index + 1),
              ease: "easeOut"
            }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
            viewport={{ once: true }}
          >
            <FeatureIcon>
              <img src={feature.image} alt={t(feature.titleKey)} />
            </FeatureIcon>
            <FeatureTitle>{t(feature.titleKey)}</FeatureTitle>
            <FeatureDescription>{t(feature.descriptionKey)}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Section>
  );
};

export default FeaturesSection;
