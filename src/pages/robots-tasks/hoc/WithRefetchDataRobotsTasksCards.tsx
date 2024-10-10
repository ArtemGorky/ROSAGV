import { robotsTasksStore } from '@/entities';
import { RobotsTasksCards } from '../view/robot-tasks-cards/RobotTasksCards';
import { observer } from 'mobx-react-lite';
import { RobotsTasks } from '../types';
import { useInterval } from 'usehooks-ts';
import { IntlShape } from 'react-intl';

type RobotsTasksTableProps = {
    currentTasks: RobotsTasks[];
    isLoading: boolean;
    intl: IntlShape;
}

export const WithRefetchDataRobotsTasksCards = observer(({ currentTasks, intl, isLoading }: RobotsTasksTableProps) => {

    const {
        store: {
            tasksRefetchData, getRobotsTasksData
        },
    } = robotsTasksStore;

    useInterval(() => getRobotsTasksData(intl.locale), Number(tasksRefetchData) * 1000);

    return <RobotsTasksCards currentTasks={currentTasks} intl={intl} isLoading={isLoading} />

});
