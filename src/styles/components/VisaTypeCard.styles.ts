import styled from 'styled-components';

/**
 * VisaTypeCard 컴포넌트 스타일
 * VisaTypeCard.css를 styled-components로 변환
 */

export const VisaCard = styled.div`
  background: white;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.05) 0%, rgba(74, 222, 128, 0.02) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: #4ade80;
    box-shadow: 0 8px 25px rgba(74, 222, 128, 0.15);
    transform: translateY(-4px);
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const VisaIcon = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  object-fit: cover;
  background: linear-gradient(135deg, #4ade80, #4ade80);
  padding: 8px;
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.2);
`;

export const VisaName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
`;

export const VisaFullName = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

export const VisaDescription = styled.p`
  font-size: 1rem;
  color: #374151;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  flex: 1;
`;

export const VisaDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
  position: relative;
  z-index: 1;
`;

export const VisaDuration = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
`;

export const ExtensionBadge = styled.span<{ $extension: boolean }>`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  background: ${props => props.$extension ? '#4ade80' : '#ef4444'};
  box-shadow: 0 2px 4px ${props => props.$extension ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
`;

export const DocumentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.5rem;
  position: relative;
  z-index: 1;
`;
