import React from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from './locales/en.json';
import ruMessages from './locales/ru.json';

import enMessagesParksAndRobots from './locales/pages/parks-and-robots/en.json';
import ruMessagesParksAndRobots from './locales/pages/parks-and-robots/ru.json';

const messages = {
  en: {
    ...enMessages,
    ...enMessagesParksAndRobots
  },
  ru: {
    ...ruMessages,
    ...ruMessagesParksAndRobots
  },
};

const I18nProvider = ({ locale, children }) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default I18nProvider;
