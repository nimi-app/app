import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from './locales/en/common.json';
import landing from './locales/en/landing.json';
import nimi from './locales/en/nimi.json';

export const defaultNS = 'common';

export const resources = {
  en: {
    common,
    landing,
    nimi,
  },
};

use(initReactI18next).init({
  lng: 'en',
  resources,
  defaultNS,
});
