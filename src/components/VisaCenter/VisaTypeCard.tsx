import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';
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

const VisaIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${COLORS.primary}, #4ade80);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    border-radius: 12px;
  }
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

const ExtensionBadge = styled.span`
  background: ${COLORS.primary};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(74, 222, 128, 0.2);
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
      case 'e9': return '🏭';
      case 'h2': return '👥';
      case 'd2': return '🎓';
      case 'e7': return '💼';
      default: return '📋';
    }
  };

  return (
    <Card
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <VisaIcon>
        {getVisaIcon(visaType.id)}
      </VisaIcon>
      
      <VisaName>{visaType.name}</VisaName>
      <VisaFullName>{visaType.fullName}</VisaFullName>
      <VisaDescription>{visaType.description}</VisaDescription>
      
      <DocumentCount>
        📄 필요 서류: {visaType.documents.length}개
      </DocumentCount>
      
      <VisaDetails>
        <Duration>체류기간: {visaType.duration}</Duration>
        {visaType.extension && (
          <ExtensionBadge>연장 가능</ExtensionBadge>
        )}
      </VisaDetails>
    </Card>
  );
};

export default VisaTypeCard;
