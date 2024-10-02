import { robotsTasksStore } from '@/entities';
import { RobotsTasksTable } from '../view/robots-tasks-table/RobotsTasksTable';
import { observer } from 'mobx-react-lite';
import { RobotsTasks } from '../types';
import { useInterval } from 'usehooks-ts';
import { IntlShape } from 'react-intl';

type RobotsTasksTableProps = {
    currentTasks: RobotsTasks[];
    isLoading: boolean;
    intl: IntlShape;
}

export const WithRefetchDataRobotsTasksTable = observer(({ currentTasks, intl, isLoading }: RobotsTasksTableProps) => {

    const {
        store: {
            tasksRefetchData, getRobotsTasksData
        },
    } = robotsTasksStore;

    useInterval(() => getRobotsTasksData(), tasksRefetchData * 1000);

    return <RobotsTasksTable currentTasks={currentTasks} intl={intl} isLoading={isLoading} />

});
