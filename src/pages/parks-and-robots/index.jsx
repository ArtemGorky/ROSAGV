import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const ParksAndRobots = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.parksAndRobots.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.parksAndRobots.description' })}</p>
    </Fragment>
  );
};

export default ParksAndRobots;
