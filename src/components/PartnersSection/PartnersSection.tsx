import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ANIMATIONS } from '../../constants';
import {
  PartnersContainer,
  SectionTitle,
  PartnersGrid,
  PartnerLogo,
  LogoImage
} from '../../styles/components/PartnersSection.styles';



interface Partner {
  id: string;
  name: string;
  logo: string;
}

const PartnersSection: React.FC = () => {
  const { t } = useTranslation();
  
  const partners: Partner[] = [
    { id: 'soongsil', name: t('partners.partners.soongsil'), logo: '/images/soongsil.png' },
    { id: 'kaci', name: t('partners.partners.kaci'), logo: '/images/kaci.png' },
    { id: 'opa', name: t('partners.partners.opa'), logo: '/images/opa.png' },
    { id: 'kt-cloud', name: t('partners.partners.ktCloud'), logo: '/images/kt_cloud.png' },
    { id: 'nhn-cloud', name: t('partners.partners.nhnCloud'), logo: '/images/nhn_cloud.png' },
    { id: 'naver-cloud', name: t('partners.partners.naverCloud'), logo: '/images/naver_cloud.png' }
  ];
  return (
    <PartnersContainer id="sponsor">
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.slow }}
        viewport={{ once: true }}
      >
        {t('partners.title')} <span className="highlight">{t('partners.highlight')}</span>
      </SectionTitle>
      <PartnersGrid>
        {partners.map((partner, index) => (
          <PartnerLogo 
            key={partner.id}
            as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal, delay: 0.1 * (index + 1) }}
            viewport={{ once: true }}
          >
            <LogoImage 
              src={partner.logo} 
              alt={partner.name}
              title={partner.name}
            />
          </PartnerLogo>
        ))}
      </PartnersGrid>
    </PartnersContainer>
  );
};

export default PartnersSection;
