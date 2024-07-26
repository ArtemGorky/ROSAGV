import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const BugReport = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.bugReport.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.bugReport.description' })}</p>
    </Fragment>
  );
};

export default BugReport;
