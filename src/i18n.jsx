import React from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from './locales/en.json';
import ruMessages from './locales/ru.json';

import enMessagesParksAndRobots from './locales/pages/parks-and-robots/en.json';
import ruMessagesParksAndRobots from './locales/pages/parks-and-robots/ru.json';

import enMessagesRobotsTasks from './locales/pages/robots-tasks/en.json';
import ruMessagesRobotsTasks from './locales/pages/robots-tasks/ru.json';

import enMessagesRobotsTargetTask from './locales/pages/robots-target-task/en.json';
import ruMessagesRobotsTargetTask from './locales/pages/robots-target-task/ru.json';

import enMessagesRobotsInfo from './locales/pages/robots-info/en.json';
import ruMessagesRobotsInfo from './locales/pages/robots-info/ru.json';

import enMessagesTasksErrors from './locales/pages/tasks-errors/en.json';
import ruMessagesTasksErrors from './locales/pages/tasks-errors/ru.json';

import enMessagesTargetRobotInfo from './locales/pages/target-robot-info/en.json';
import ruMessagesTargetRobotInfo from './locales/pages/target-robot-info/ru.json';

import enMessagesRobotsHistory from './locales/pages/robots-history/en.json';
import ruMessagesRobotsHistory from './locales/pages/robots-history/ru.json';

const messages = {
  en: {
    ...enMessages,
    ...enMessagesParksAndRobots,
    ...enMessagesRobotsTasks,
    ...enMessagesRobotsTargetTask,
    ...enMessagesRobotsInfo,
    ...enMessagesTasksErrors,
    ...enMessagesTargetRobotInfo,
    ...enMessagesRobotsHistory
  },
  ru: {
    ...ruMessages,
    ...ruMessagesParksAndRobots,
    ...ruMessagesRobotsTasks,
    ...ruMessagesRobotsTargetTask,
    ...ruMessagesRobotsInfo,
    ...ruMessagesTasksErrors,
    ...ruMessagesTargetRobotInfo,
    ...ruMessagesRobotsHistory
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
