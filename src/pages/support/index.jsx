import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const Support = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.support.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.support.description' })}</p>
    </Fragment>
  );
};

export default Support;
