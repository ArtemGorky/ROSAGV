import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const Help = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.help.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.help.description' })}</p>
    </Fragment>
  );
};

export default Help;
