import { Fragment } from 'react';
import { observer } from "mobx-react-lite";
import { useIntl } from 'react-intl';
import Title from 'antd/es/typography/Title';
import { FilterDropdown } from './view/filter-dropdown/FilterDropdown';
import { RefetchDropdown } from './view/refetch-dropdown/RefetchDropdown';
import { OrderDropdown } from './view/order-dropdown/OrderDropdown';
import { ToggleSwitch } from './view/toggle-switch/ToggleSwitch';
import { TasksContent } from './view/tasks-content/TasksContent';

const RobotsTasks = observer(() => {

  const intl = useIntl();

  return (
    <Fragment>
      <Title>{intl.formatMessage({ id: 'page.robotsTasks.title' })}</Title>
      <FilterDropdown intl={intl} />
      <RefetchDropdown intl={intl} />
      <OrderDropdown intl={intl} />
      <ToggleSwitch intl={intl} />
      <TasksContent intl={intl} />
    </Fragment>
  );
});

export default RobotsTasks;
