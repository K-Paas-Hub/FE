import React from 'react';
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
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    icon: '🌍',
    title: '다국어 지원',
    description: '다양한 언어로 지원하여 외국인 노동자들이 쉽게 이용할 수 있습니다',
    image: '/images/earth.png'
  },
  {
    icon: '⚖️',
    title: '공정한 채용',
    description: '차별 없는 공정한 채용 프로세스로 모든 노동자의 권리를 보호합니다',
    image: '/images/fair.png'
  },
  {
    icon: '🤝',
    title: '법적 지원',
    description: '노동법과 비자 관련 법적 지원으로 안전한 근무 환경을 제공합니다',
    image: '/images/legal.png'
  },
  {
    icon: '📋',
    title: '비자 지원',
    description: '체계적인 비자 신청 및 갱신 지원으로 안정적인 체류를 보장합니다',
    image: '/images/visa_icon.png'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <Section id="activity">
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.slow, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Fair Work의 <span className="highlight">특별한 기능</span>
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
              <img src={feature.image} alt={feature.title} />
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Section>
  );
};

export default FeaturesSection;
