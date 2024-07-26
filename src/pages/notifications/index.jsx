import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const Notifications = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.notifications.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.notifications.description' })}</p>
    </Fragment>
  );
};

export default Notifications;
