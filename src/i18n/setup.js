import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import TranslationsEn from './translations/english.json';
import TranslationsSp from './translations/spanish.json';

const resources = {
  en: { translation: TranslationsEn },
  sp: { translation: TranslationsSp },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
