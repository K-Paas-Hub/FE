import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

export const PartnersContainer = styled.section`
  padding: 5rem 2rem;
  background: rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0.5rem;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  
  .highlight {
    color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

export const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
`;

export const PartnerLogo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: white;
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    height: 100px;
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    height: 80px;
    padding: 1rem;
    border-radius: 8px;
  }
`;

export const LogoImage = styled.img`
  max-width: 100%;
  max-height: 80px;
  object-fit: contain;
  filter: brightness(0) invert(1); // 로고를 흰색으로 변환
  transition: all 0.3s ease;
  
  ${PartnerLogo}:hover & {
    filter: brightness(1) invert(0); // 호버 시 원래 색상으로
  }
  
  @media (max-width: 768px) {
    max-height: 60px;
  }
  
  @media (max-width: 480px) {
    max-height: 50px;
  }
`;
