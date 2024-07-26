import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const Dashboard = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.dashboard.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.dashboard.description' })}</p>
    </Fragment>
  );
};

export default Dashboard;
