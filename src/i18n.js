import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((lng, ns, clb) => {
      import(`../public/locales/${lng}/${ns}.json`)
        .then((resources) => {
          clb(null, resources);
        })
        .catch((error) => {
          clb(error, null);
        });
    })
  )
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: 'en',
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'],
    },
  });

export default i18n;
