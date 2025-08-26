import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  languages: Array<{
    code: string;
    name: string;
    flag: string;
  }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('ko');

  const languages = [
    { code: 'ko', name: '한국어', flag: '/images/flags/south-korea.png' },
    { code: 'en', name: 'English', flag: '/images/flags/usa.png' },
    { code: 'vi', name: 'Tiếng Việt', flag: '/images/flags/vietnam.png' },
    { code: 'km', name: 'ភាសាខ្មែរ', flag: '/images/flags/cambodia.png' },
    { code: 'ne', name: 'नेपाली', flag: '/images/flags/nepal.png' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '/images/flags/indonesia.png' },
    { code: 'zh', name: '中文', flag: '/images/flags/china.png' },
    { code: 'th', name: 'ไทย', flag: '/images/flags/thailand.png' }
  ];

  const changeLanguage = (language: string) => {
    try {
      i18n.changeLanguage(language);
      setCurrentLanguage(language);
      localStorage.setItem('i18nextLng', language);
    } catch (error) {
      // localStorage 에러가 발생해도 언어 변경은 계속 진행
      console.warn('Failed to save language to localStorage:', error);
    }
  };

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('i18nextLng') || 'ko';
      setCurrentLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    } catch (error) {
      // localStorage 에러가 발생해도 기본 언어로 설정
      console.warn('Failed to load language from localStorage:', error);
      setCurrentLanguage('ko');
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  const value = {
    currentLanguage,
    changeLanguage,
    languages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
