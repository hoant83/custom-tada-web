import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { retrieveFromStorage } from '@/libs/utils/storage.util';

const lang = retrieveFromStorage('lang') ?? process.env.REACT_APP_DEFAULT_LANG;

export default i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: lang,
    lng: lang,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${process.env.REACT_APP_BACKEND_URL}/api/languages/{{lng}}`,
      parse: (data: any) => {
        return JSON.parse(data).result;
      },
    },
  });
