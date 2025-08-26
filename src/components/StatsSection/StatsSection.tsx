import React from 'react';
import { ANIMATIONS } from '../../constants';
import { useCountUp } from '../../hooks';
import {
  StatsContainer,
  SectionTitle,
  StatsGrid,
  StatItem,
  StatNumber,
  StatLabel
} from '../../styles/components/StatsSection.styles';

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
  const count1 = useCountUp(10000, 'project', 2500, 0);
  const count2 = useCountUp(50000, 'project', 2500, 500);
  const count3 = useCountUp(95, 'project', 2000, 1000);
  const count4 = useCountUp(24, 'project', 1500, 1500);

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
