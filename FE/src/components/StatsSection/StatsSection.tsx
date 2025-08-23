import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

const StatsContainer = styled.section`
  background: rgba(74, 222, 128, 0.1);
  padding: 5rem 2rem;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: ${COLORS.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #cccccc;
  font-weight: 500;
`;

interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: '10,000+', label: '등록된 기업' },
  { number: '50,000+', label: '채용 성공' },
  { number: '95%', label: '만족도' },
  { number: '24/7', label: '고객 지원' }
];

const StatsSection: React.FC = () => {
  return (
    <StatsContainer id="project">
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.slow }}
        viewport={{ once: true }}
      >
        우리의 <span className="highlight">성과</span>
      </SectionTitle>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: ANIMATIONS.duration.normal, delay: 0.1 * (index + 1) }}
            viewport={{ once: true }}
          >
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatsGrid>
    </StatsContainer>
  );
};

export default StatsSection;
