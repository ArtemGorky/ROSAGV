import React from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from './locales/en.json';
import ruMessages from './locales/ru.json';

const messages = {
  en: enMessages,
  ru: ruMessages,
};

const I18nProvider = ({ locale, children }) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default I18nProvider;
