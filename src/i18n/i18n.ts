import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

const resources = {
  en: {
    translation: enTranslation,
    dir: 'ltr'
  },
  ar: {
    translation: arTranslation,
    dir: 'rtl'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    defaultNS: 'translation',
    resources,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

// Handle document direction
const handleDirectionChange = () => {
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = i18n.language;
};

i18n.on('languageChanged', handleDirectionChange);
handleDirectionChange(); // Set initial direction

export default i18n;
