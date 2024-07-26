import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const CardsAndSnapshots = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.cardsAndSnapshots.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.cardsAndSnapshots.description' })}</p>
    </Fragment>
  );
};

export default CardsAndSnapshots;
