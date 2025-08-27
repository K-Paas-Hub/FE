import styled from 'styled-components';

/**
 * VisaCenter 컴포넌트 스타일
 * VisaCenter.css를 styled-components로 변환
 */

export const VisaContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

export const VisaContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const VisaHeader = styled.div`
  text-align: center;
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
`;

export const VisaSubtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

export const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

export const CategoryButton = styled.button<{ $active?: boolean }>`
  background: white;
  color: #6b7280;
  border: 2px solid #e5e5e5;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  min-width: 44px;

  &:hover {
    background: #f9fafb;
    border-color: #4ade80;
  }

  ${props => props.$active && `
    background: #4ade80;
    color: white;
    border-color: #4ade80;

    &:hover {
      background: #22c55e;
    }
  `}

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const VisaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;
