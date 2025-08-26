import React from 'react';
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

const partners: Partner[] = [
  { id: 'soongsil', name: '숭실대학교', logo: '/images/soongsil.png' },
  { id: 'kaci', name: 'KACI', logo: '/images/kaci.png' },
  { id: 'opa', name: 'OPA', logo: '/images/opa.png' },
  { id: 'kt-cloud', name: 'KT Cloud', logo: '/images/kt_cloud.png' },
  { id: 'nhn-cloud', name: 'NHN Cloud', logo: '/images/nhn_cloud.png' },
  { id: 'naver-cloud', name: 'Naver Cloud', logo: '/images/naver_cloud.png' }
];

const PartnersSection: React.FC = () => {
  return (
    <PartnersContainer id="sponsor">
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.slow }}
        viewport={{ once: true }}
      >
        함께 성장하는 <span className="highlight">파트너십</span>
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
