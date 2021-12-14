import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import englishTranslations from '';
// import spanishTranslations from '';

/* const resources = {
  en: { translation: { test: 'hello' } },
  es: { translation: { test: 'hola' } },
}; */

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
