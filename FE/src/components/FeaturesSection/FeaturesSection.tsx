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
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
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
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${COLORS.primary};
`;

const FeatureDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
`;

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🎯',
    title: '정확한 매칭',
    description: 'AI 기반 알고리즘으로 기업과 인재의 최적 매칭을 제공합니다'
  },
  {
    icon: '⚡',
    title: '빠른 프로세스',
    description: '간편한 지원부터 합격까지, 모든 과정을 빠르고 효율적으로'
  },
  {
    icon: '🔒',
    title: '안전한 보안',
    description: '개인정보 보호와 데이터 보안을 최우선으로 하는 안전한 플랫폼'
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
        우리의 <span className="highlight">특별한 기능</span>
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
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Section>
  );
};

export default FeaturesSection;
