import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ANIMATIONS } from '../../constants';
import { VISA_TYPES, VISA_CATEGORIES, VISA_CATEGORY_LABELS } from '../../constants/visa';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

import VisaTypeCard from './VisaTypeCard';
import '../../styles/VisaCenter.css';

const VisaCenter: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredVisaTypes = useMemo(() => {
    const visaTypesArray = Object.values(VISA_TYPES);
    
    if (selectedCategory === 'all') {
      return visaTypesArray;
    }
    
    // 타입 안전성을 위해 any로 처리
    const categoryVisas = (VISA_CATEGORIES as any)[selectedCategory];
    
    if (!categoryVisas) {
      return visaTypesArray;
    }
    
    return visaTypesArray.filter(visa => 
      categoryVisas.includes(visa.id.toUpperCase())
    );
  }, [selectedCategory]);

  const handleVisaClick = (visaType: any) => {
    navigate(`/visa/${visaType.id}`);
  };

  return (
    <div className="visa-container">
      <MainHeader />
      <main className="visa-content">
        <div className="visa-header">
          <motion.h1 
            className="visa-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal }}
          >
            비자 종류별 안내
          </motion.h1>
          <motion.p 
            className="visa-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal, delay: 0.1 }}
          >
            목적에 맞는 비자를 선택하여 상세 정보를 확인하세요
          </motion.p>
        </div>

        <motion.div 
          className="filter-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.duration.normal, delay: 0.2 }}
        >
          <div className="category-filter">
            <button
              className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              전체
            </button>
            {Object.entries(VISA_CATEGORY_LABELS).map(([category, label]) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="visa-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.duration.normal, delay: 0.3 }}
        >
          {filteredVisaTypes.map((visaType, index) => (
            <motion.div
              key={visaType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: ANIMATIONS.duration.normal, 
                delay: 0.4 + (index * 0.1) 
              }}
            >
              <VisaTypeCard
                visaType={visaType}
                onClick={() => handleVisaClick(visaType)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>
      <MainFooter />
    </div>
  );
};

export default VisaCenter;
