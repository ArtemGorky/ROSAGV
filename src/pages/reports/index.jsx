import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const Reports = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.reports.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.reports.description' })}</p>
    </Fragment>
  );
};

export default Reports;
