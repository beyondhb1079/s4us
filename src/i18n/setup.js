import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import TranslationsEn from './translations/english.json';
import TranslationsSp from './translations/spanish.json';

const resources = {
  en: { translation: TranslationsEn },
  es: { translation: TranslationsSp },
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
