import { Fragment } from 'react';
import { observer } from "mobx-react-lite";
import { useIntl } from 'react-intl';
import Title from 'antd/es/typography/Title';
import { RobotTasksPagination } from './view/robot-tasks-pagination/RobotTasksPagination';
import { FilterDropdown } from './view/filter-dropdown/FilterDropdown';
// import { WithRobotsTasksTable } from './hoc/WithRobotsTasksTable';
import { RefetchDropdown } from './view/refetch-dropdown/RefetchDropdown';
import { WithRobotsTasksCards } from './hoc/WithRobotsTasksCards';

const RobotsTasks = observer(() => {

  const intl = useIntl();

  return (
    <Fragment>
      <Title>{intl.formatMessage({ id: 'page.robotsTasks.title' })}</Title>
      <FilterDropdown intl={intl} />
      <RefetchDropdown intl={intl} />
      {/* <WithRobotsTasksTable intl={intl} /> */}
      <RobotTasksPagination intl={intl} />
      <WithRobotsTasksCards intl={intl} />
    </Fragment>
  );
});

export default RobotsTasks;
