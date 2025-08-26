import React from 'react';
import { motion } from 'framer-motion';
import { VisaType } from '../../types/visa';
import '../../styles/VisaTypeCard.css';

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
    <motion.div
      className="visa-card"
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
      <img 
        className="visa-icon"
        src={getVisaIcon(visaType.id)} 
        alt={`${visaType.name} 아이콘`}
      />
      
      <h3 className="visa-name">{visaType.name}</h3>
      <p className="visa-full-name">{visaType.fullName}</p>
      <p className="visa-description">{visaType.description}</p>
      
      <div className="document-count">
        📄 필요 서류: {visaType.documents.length}개
      </div>
      
      <div className="visa-details">
        <span className="visa-duration">체류기간: {visaType.duration}</span>
        <span className={`extension-badge extension-${visaType.extension}`}>
          {visaType.extension ? '연장 가능' : '연장 불가'}
        </span>
      </div>
    </motion.div>
  );
};

export default VisaTypeCard;
