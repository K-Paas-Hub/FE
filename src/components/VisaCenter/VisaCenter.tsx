import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ANIMATIONS } from '../../constants';
import { 
  VISA_TYPES, 
  VISA_CATEGORIES, 
  VISA_CATEGORY_LABELS,
  VisaType,
  VisaCategoryType
} from '../../constants/visa';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

import VisaTypeCard from './VisaTypeCard';
import '../../styles/VisaCenter.css';

const VisaCenter: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredVisaTypes = useMemo(() => {
    const visaTypesArray = Object.values(VISA_TYPES);
    
    if (selectedCategory === 'all') {
      return visaTypesArray;
    }
    
    // selectedCategory를 대문자로 변환하여 VISA_CATEGORIES의 키와 매칭
    const categoryKey = selectedCategory.toUpperCase() as VisaCategoryType;
    const categoryVisas = VISA_CATEGORIES[categoryKey];
    
    if (!categoryVisas) {
      return visaTypesArray;
    }
    
    return visaTypesArray.filter(visa => 
      (categoryVisas as readonly string[]).includes(visa.id.toUpperCase())
    );
  }, [selectedCategory]);

  const handleVisaClick = (visaType: VisaType) => {
    navigate(`/visa/${visaType.id}`);
  };

  return (
    <div className="visa-container">
      <MainHeader />
      <main className="visa-content">
        <motion.div 
          className="filter-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.duration.normal, delay: 0.1 }}
        >
          <div className="category-filter">
            <button
              className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              {t('visaCenter.all')}
            </button>
            {Object.entries(VISA_CATEGORY_LABELS).map(([category, labelKey]) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category.toLowerCase() ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.toLowerCase())}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="visa-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: ANIMATIONS.duration.normal, 
            delay: 0.3,
            staggerChildren: 0.1
          }}
        >
          {filteredVisaTypes.map((visaType, index) => (
            <motion.div
              key={visaType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: ANIMATIONS.duration.normal
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
