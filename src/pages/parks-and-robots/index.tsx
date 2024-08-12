import { Fragment } from 'react';
import { observer } from "mobx-react-lite";
import { ParksAndRobotsTable } from './view/parks-and-robots-table';
import { ParksAndRobotsTitle } from './view/parks-and-robots-title';
import { useIntl } from 'react-intl';
import { FilterDropdown } from './view/filter-dropdown';

const ParksAndRobots = observer(() => {

  const intl = useIntl();

  return (
    <Fragment>
      <ParksAndRobotsTitle intl={intl} />
      <FilterDropdown intl={intl} />
      <ParksAndRobotsTable intl={intl} />
    </Fragment>
  );
});

export default ParksAndRobots;
