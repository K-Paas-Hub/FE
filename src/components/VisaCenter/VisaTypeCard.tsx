import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { VisaType } from '../../types/visa';
import {
  VisaCard,
  VisaIcon,
  VisaName,
  VisaFullName,
  VisaDescription,
  VisaDetails,
  VisaDuration,
  ExtensionBadge,
  DocumentCount,
} from '../../styles/components/VisaTypeCard.styles';

interface VisaTypeCardProps {
  visaType: VisaType;
  onClick: () => void;
}

const VisaTypeCard: React.FC<VisaTypeCardProps> = ({ visaType, onClick }) => {
  const { t } = useTranslation();
  
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
    <VisaCard
      as={motion.div}
      onClick={onClick}
      whileHover={{ 
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${visaType.name} ${t('visaCenter.card.viewInfo')}`}
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
        📄 {t('visaCenter.card.requiredDocuments')}: {visaType.documents.length}{t('common.count')}
      </DocumentCount>
      
      <VisaDetails>
        <VisaDuration>{t('visaCenter.card.stayPeriod')}: {visaType.duration}</VisaDuration>
        <ExtensionBadge $extension={visaType.extension}>
          {visaType.extension ? t('visaCenter.card.extensionPossible') : t('visaCenter.card.extensionNotPossible')}
        </ExtensionBadge>
      </VisaDetails>
    </VisaCard>
  );
};

export default VisaTypeCard;
