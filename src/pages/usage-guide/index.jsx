import React, { Fragment } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

const UsageGuide = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.usageGuide.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.usageGuide.description' })}</p>
    </Fragment>
  );
};

export default UsageGuide;
