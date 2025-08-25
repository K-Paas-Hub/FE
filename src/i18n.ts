import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 번역 파일 import
import ko from './locales/ko.json';
import en from './locales/en.json';
import vi from './locales/vi.json';
import km from './locales/km.json';
import ne from './locales/ne.json';
import id from './locales/id.json';
import zh from './locales/zh.json';
import th from './locales/th.json';

const resources = {
  ko: {
    translation: ko
  },
  en: {
    translation: en
  },
  vi: {
    translation: vi
  },
  km: {
    translation: km
  },
  ne: {
    translation: ne
  },
  id: {
    translation: id
  },
  zh: {
    translation: zh
  },
  th: {
    translation: th
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
