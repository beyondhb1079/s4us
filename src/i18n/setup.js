import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import contactEn from './translations/english/contactEn.json';
import contactEs from './translations/spanish/contactEs.json';

const resources = {
  en: { contact: contactEn },
  es: { contact: contactEs },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    supportedLngs: ['en', 'es'],
    fallbackLng: 'en',
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'],
    },
  });

export default i18n;
