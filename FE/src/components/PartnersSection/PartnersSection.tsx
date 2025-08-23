import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

const PartnersContainer = styled.section`
  padding: 5rem 2rem;
  background: rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  
  .highlight {
    color: ${COLORS.primary};
  }
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
`;

const PartnerLogo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: white;
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  max-height: 80px;
  object-fit: contain;
  filter: brightness(0) invert(1); // 로고를 흰색으로 변환
  transition: all 0.3s ease;
  
  ${PartnerLogo}:hover & {
    filter: brightness(1) invert(0); // 호버 시 원래 색상으로
  }
`;

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
