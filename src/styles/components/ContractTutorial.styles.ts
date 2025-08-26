import styled from 'styled-components';
import { COLORS } from '../../constants';

export const TutorialContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

export const TutorialContent = styled.main`
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

export const TutorialHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: ${COLORS.primary};
  border-radius: 16px;
  color: white;
  box-shadow: 0 4px 20px rgba(74, 222, 128, 0.2);
  
  @media (max-width: 768px) {
    padding: 2rem 0;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0;
    border-radius: 12px;
  }
`;

export const TutorialTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const TutorialSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const TutorialSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 1rem;
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
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 50px;
    height: 2px;
    background: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    gap: 0.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    gap: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    
    &::after {
      width: 35px;
    }
  }
`;

export const SectionNumber = styled.span`
  background: ${COLORS.primary};
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
`;

export const SectionContent = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1f2937;
    padding-left: 0.8rem;
    border-left: 3px solid ${COLORS.primary};
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-top: 1.5rem;
      padding-left: 0.6rem;
      border-left-width: 2px;
    }
  }
  
  p {
    margin-bottom: 1rem;
  }
`;

export const ImportantBox = styled.div`
  background: #ecfdf5;
  border: 1px solid ${COLORS.primary};
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
    margin: 1.2rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
  }
`;

export const ImportantTitle = styled.h4`
  color: #065f46;
  font-weight: 600;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    gap: 0.5rem;
  }
`;

export const WarningIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  
  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;

export const ExampleBox = styled.div`
  background: #f8f9fa;
  border-left: 4px solid ${COLORS.primary};
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 12px 12px 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
    margin: 1.2rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin: 1rem 0;
    border-left-width: 3px;
    border-radius: 0 8px 8px 0;
  }
`;

export const ExampleTitle = styled.h5`
  color: ${COLORS.primary};
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    gap: 0.5rem;
  }
`;

export const ContractIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

export const CodeBlock = styled.pre`
  background: #1f2937;
  color: #f9fafb;
  padding: 1.2rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid #374151;
  
  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.8rem;
    border-radius: 6px;
  }
`;

export const FAQSection = styled.div`
  margin-top: 2rem;
`;

export const FAQItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${COLORS.primary};
    box-shadow: 0 2px 8px rgba(74, 222, 128, 0.1);
  }
  
  @media (max-width: 480px) {
    border-radius: 8px;
    margin-bottom: 0.8rem;
  }
`;

export const FAQQuestion = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  background: ${props => props.$isOpen ? COLORS.primary : 'white'};
  color: ${props => props.$isOpen ? 'white' : '#1f2937'};
  border: none;
  padding: 1.5rem;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${props => props.$isOpen ? COLORS.primaryHover : '#f8f9fa'};
  }
  
  &::after {
    content: '${props => props.$isOpen ? '−' : '+'}';
    font-size: 1.5rem;
    color: ${props => props.$isOpen ? 'white' : COLORS.primary};
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 0.9rem;
    
    &::after {
      font-size: 1.3rem;
    }
  }
`;

export const FAQAnswer = styled.div<{ $isOpen: boolean }>`
  background: #f8f9fa;
  padding: ${props => props.$isOpen ? '1.5rem' : '0 1.5rem'};
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  line-height: 1.6;
  color: #374151;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    padding: ${props => props.$isOpen ? '1.2rem' : '0 1.2rem'};
  }
  
  @media (max-width: 480px) {
    padding: ${props => props.$isOpen ? '1rem' : '0 1rem'};
    font-size: 0.9rem;
  }
`;

export const Checklist = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

export const ChecklistItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 1rem;
  padding: 1.2rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid ${COLORS.primary};
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e9ecef;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.6rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    gap: 0.5rem;
    border-left-width: 3px;
    border-radius: 6px;
  }
`;

export const CheckIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
  margin-top: 0.2rem;
  
  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
`;

export const PrimaryButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${COLORS.primaryHover};
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }
`;
