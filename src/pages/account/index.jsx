import React, { Fragment } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

const Account = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.account.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.account.description' })}</p>
    </Fragment>
  );
};

export default Account;
