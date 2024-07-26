import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const Settings = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.settings.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.settings.description' })}</p>
    </Fragment>
  );
};

export default Settings;
