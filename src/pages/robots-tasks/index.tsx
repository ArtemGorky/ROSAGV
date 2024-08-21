import { Fragment } from 'react';
import { observer } from "mobx-react-lite";
import { useIntl } from 'react-intl';
import Title from 'antd/es/typography/Title';
import { RobotsTasksTable } from './view/robots-tasks-table';
import { FilterDropdown } from './view/filter-dropdown';

const RobotsTasks = observer(() => {

  const intl = useIntl();

  return (
    <Fragment>
      <Title>{intl.formatMessage({ id: 'page.robotsTasks.title' })}</Title>
      <FilterDropdown intl={intl} />
      <RobotsTasksTable intl={intl} />
    </Fragment>
  );
});

export default RobotsTasks;
