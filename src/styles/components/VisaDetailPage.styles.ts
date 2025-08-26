import styled from 'styled-components';
import { COLORS } from '../../constants';

export const DetailContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

export const DetailContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const VisaHeader = styled.div`
  margin-bottom: 3rem;
`;

export const VisaTitle = styled.h1`
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

export const VisaDescription = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Section = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const DocumentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const DocumentItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  font-size: 1rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 0;
  }
`;

export const DocumentIcon = styled.span`
  color: ${COLORS.primary};
  font-size: 1.2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const StepList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: step-counter;
`;

export const StepItem = styled.li`
  counter-increment: step-counter;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
  
  &::before {
    content: counter(step-counter);
    background: ${COLORS.primary};
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    gap: 0.8rem;
    padding: 0.8rem 0;
    
    &::before {
      width: 20px;
      height: 20px;
      font-size: 0.7rem;
    }
  }
`;

export const StepContent = styled.div`
  flex: 1;
`;

export const StepName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.3rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const StepDescription = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
