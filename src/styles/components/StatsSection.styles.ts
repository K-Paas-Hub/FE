import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

export const StatsContainer = styled.section`
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
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
    min-height: 40vh;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
    min-height: 35vh;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
  
  .highlight {
    color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export const StatsGrid = styled.div`
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

export const StatItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

export const StatNumber = styled.div`
  font-size: 2.8rem;
  font-weight: 900;
  color: ${COLORS.primary};
  margin-bottom: 0.5rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #cccccc;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;
