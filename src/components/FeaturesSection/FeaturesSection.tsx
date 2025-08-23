import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

const Section = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  
  .highlight {
    color: ${COLORS.primary};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${COLORS.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  transition: all 0.3s ease;
  overflow: hidden;
  
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    transition: all 0.3s ease;
  }
  
  ${FeatureCard}:hover & {
    background: ${COLORS.primary};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${COLORS.primary};
  transition: color 0.3s ease;
  
  ${FeatureCard}:hover & {
    color: ${COLORS.primary};
  }
`;

const FeatureDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
  transition: color 0.3s ease;
  
  ${FeatureCard}:hover & {
    color: #1a1a1a;
  }
`;

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
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <Section id="activity">
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.slow }}
        viewport={{ once: true }}
      >
        Fair Work의 <span className="highlight">특별한 기능</span>
      </SectionTitle>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal, delay: 0.1 * (index + 1) }}
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
