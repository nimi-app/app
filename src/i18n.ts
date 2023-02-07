import { use } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

// TODO: MIRKO CHECK THIS

const i18NextInstance = use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['common', 'landing', 'nimi'],
    backend: {
      loadPath: `./locales/{{lng}}/{{ns}}.json`,
    },
    react: {
      useSuspense: false,
    },
    fallbackLng: 'en',
    preload: ['en'],
    keySeparator: false,
    interpolation: { escapeValue: false },
    load: 'languageOnly',
    defaultNS: 'common',
  });

export default i18NextInstance;
