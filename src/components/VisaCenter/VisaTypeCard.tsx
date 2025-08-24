import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
import { VisaType } from '../../types/visa';

const Card = styled(motion.div)`
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
    border-color: ${COLORS.primary};
    box-shadow: 0 8px 25px rgba(74, 222, 128, 0.15);
    transform: translateY(-4px);
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const VisaIcon = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  object-fit: cover;
  background: linear-gradient(135deg, ${COLORS.primary}, #4ade80);
  padding: 8px;
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.2);
`;

const VisaName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
`;

const VisaFullName = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const VisaDescription = styled.p`
  font-size: 1rem;
  color: #374151;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  flex: 1;
`;

const VisaDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
  position: relative;
  z-index: 1;
`;

const Duration = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
`;

const ExtensionBadge = styled.span<{ $extension: boolean }>`
  background: ${props => props.$extension ? COLORS.primary : '#ef4444'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 2px 4px ${props => props.$extension ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
`;

const DocumentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.5rem;
  position: relative;
  z-index: 1;
`;

interface VisaTypeCardProps {
  visaType: VisaType;
  onClick: () => void;
}

const VisaTypeCard: React.FC<VisaTypeCardProps> = ({ visaType, onClick }) => {
  const getVisaIcon = (visaId: string) => {
    switch (visaId) {
      case 'e9': return '/images/visa/conveyor.png';
      case 'h2': return '/images/visa/labourer.png';
      case 'd2': return '/images/visa/graduation-hat.png';
      case 'e7': return '/images/visa/portfolio.png';
      case 'e8': return '/images/visa/settings.png';
      case 'e6': return '/images/visa/paint-palette.png';
      case 'c4': return '/images/visa/alarm-clock.png';
      case 'f4': return '/images/earth.png';
      default: return '/images/visa/portfolio.png';
    }
  };

  return (
    <Card
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      aria-label={`${visaType.name} 정보 보기`}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}

    >
      <VisaIcon 
        src={getVisaIcon(visaType.id)} 
        alt={`${visaType.name} 아이콘`}
      />
      
      <VisaName>{visaType.name}</VisaName>
      <VisaFullName>{visaType.fullName}</VisaFullName>
      <VisaDescription>{visaType.description}</VisaDescription>
      
      <DocumentCount>
        📄 필요 서류: {visaType.documents.length}개
      </DocumentCount>
      
      <VisaDetails>
        <Duration>체류기간: {visaType.duration}</Duration>
        <ExtensionBadge $extension={visaType.extension}>
          {visaType.extension ? '연장 가능' : '연장 불가'}
        </ExtensionBadge>
      </VisaDetails>
    </Card>
  );
};

export default VisaTypeCard;
