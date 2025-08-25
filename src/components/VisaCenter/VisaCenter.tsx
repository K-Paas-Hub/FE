import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ANIMATIONS, COLORS } from '../../constants';
import { VISA_TYPES, VISA_CATEGORIES, VISA_CATEGORY_LABELS } from '../../constants/visa';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import VisaTypeCard from './VisaTypeCard';

const VisaContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

const TopBanner = styled.div`
  background: #1e293b;
  color: white;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`;

const BannerText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BannerClose = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VisaContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const VisaHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const VisaTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const VisaSubtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// 필터링 섹션 스타일
const FilterSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? COLORS.primary : 'white'};
  color: ${props => props.$active ? 'white' : '#6b7280'};
  border: 2px solid ${props => props.$active ? COLORS.primary : '#e5e5e5'};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${props => props.$active ? COLORS.primaryHover : '#f9fafb'};
    border-color: ${props => props.$active ? COLORS.primaryHover : COLORS.primary};
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const VisaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: stretch;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const VisaCenter: React.FC = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof VISA_CATEGORY_LABELS>('ALL');

  const handleVisaTypeClick = (visaTypeId: string) => {
    navigate(`/visa/${visaTypeId}`);
  };

  const filteredVisaTypes = useMemo(() => {
    let filtered = Object.values(VISA_TYPES);
    
    if (selectedCategory !== 'ALL') {
      const categoryVisas = VISA_CATEGORIES[selectedCategory as keyof typeof VISA_CATEGORIES];
      filtered = filtered.filter(visa => 
        Array.isArray(categoryVisas) && categoryVisas.includes(visa.id.toUpperCase())
      );
    }
    
    return filtered;
  }, [selectedCategory]);

  return (
    <VisaContainer>
      {showBanner && (
        <TopBanner>
          <BannerText>
            Community Open! 💬 한국 취업을 준비하는 모든 외국인을 위한 공간이 생겼어요 →
          </BannerText>
          <BannerClose onClick={() => setShowBanner(false)}>×</BannerClose>
        </TopBanner>
      )}
      
      <MainHeader />
      
      <VisaContent>
        <VisaHeader>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal }}
          >
            <VisaTitle>비자 센터</VisaTitle>
            <VisaSubtitle>
              한국에서 일하고 공부하기 위한 비자 정보를 확인하세요
            </VisaSubtitle>
          </motion.div>
        </VisaHeader>

        {/* 필터링 UI */}
        <FilterSection>
          <CategoryFilter>
            {Object.entries(VISA_CATEGORY_LABELS).map(([key, label]) => (
              <CategoryButton
                key={key}
                $active={selectedCategory === key}
                onClick={() => setSelectedCategory(key as keyof typeof VISA_CATEGORY_LABELS)}
              >
                {label}
              </CategoryButton>
            ))}
          </CategoryFilter>
        </FilterSection>

        <VisaGrid>
          {filteredVisaTypes.map((visaType, index) => (
            <motion.div
              key={visaType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: ANIMATIONS.duration.normal, 
                delay: index * 0.1 
              }}
            >
              <VisaTypeCard
                visaType={visaType}
                onClick={() => handleVisaTypeClick(visaType.id)}
              />
            </motion.div>
          ))}
        </VisaGrid>
      </VisaContent>
      <MainFooter />
    </VisaContainer>
  );
};

export default VisaCenter;
