import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';
import { useCountUp } from '../../hooks';

const StatsContainer = styled.section`
  background: rgba(74, 222, 128, 0.1);
  background-image: url('/images/foregin_worker.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  position: relative;
  padding: 6rem 2rem;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 26, 26, 0.7);
    z-index: 1;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
  
  .highlight {
    color: ${COLORS.primary};
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
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.8rem;
  font-weight: 900;
  color: ${COLORS.primary};
  margin-bottom: 0.5rem;
  line-height: 1.1;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #cccccc;
  font-weight: 500;
`;

interface Stat {
  number: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { number: 10000, label: '등록된 기업', suffix: '+' },
  { number: 50000, label: '채용 성공', suffix: '+' },
  { number: 95, label: '만족도', suffix: '%' },
  { number: 24, label: '고객 지원', suffix: '/7' }
];

const StatsSection: React.FC = () => {
  const count1 = useCountUp(10000, 2500, 0);
  const count2 = useCountUp(50000, 2500, 500);
  const count3 = useCountUp(95, 2000, 1000);
  const count4 = useCountUp(24, 1500, 1500);

  const counts = [count1, count2, count3, count4];

  return (
    <StatsContainer id="project">
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.slow }}
        viewport={{ once: true }}
      >
        함께 만들어가는<br />
        <span className="highlight">성공 스토리</span>
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
            <StatNumber>
              {counts[index].toLocaleString()}{stat.suffix}
            </StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatsGrid>
    </StatsContainer>
  );
};

export default StatsSection;
