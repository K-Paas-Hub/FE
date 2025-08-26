import styled from 'styled-components';
import { COLORS } from '../../constants';

export const SpellCheckContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

export const SpellCheckContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export const SpellCheckHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const SpellCheckTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const SpellCheckSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const SpellCheckSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    gap: 0.6rem;
  }
`;

export const SectionIcon = styled.span`
  background: ${COLORS.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
`;

export const NoDataMessage = styled.div`
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  color: #6b7280;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin: 1rem 0;
  }
`;

export const NoDataTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const NoDataText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;
