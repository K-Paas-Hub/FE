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
        <motion.div 
          className="filter-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.duration.normal, delay: 0.1 }}
        >
          <div className="category-filter">
            {Object.entries(VISA_CATEGORY_LABELS).map(([category, label]) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === (category === 'ALL' ? 'all' : category.toLowerCase()) ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category === 'ALL' ? 'all' : category.toLowerCase())}
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
