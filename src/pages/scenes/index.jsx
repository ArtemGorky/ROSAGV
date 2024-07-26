import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const Scenes = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: 'page.scenes.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.scenes.description' })}</p>
    </Fragment>
  );
};

export default Scenes;
