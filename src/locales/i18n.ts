//External Lib  import
import { Application } from 'express';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';

const initI18next = (app: Application) => {
  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      fallbackLng: 'en',
      backend: {
        loadPath: './src/locales/{{lng}}/translate.json',
      },
    });

  app.use(i18nextMiddleware.handle(i18next));
};

export default initI18next;
