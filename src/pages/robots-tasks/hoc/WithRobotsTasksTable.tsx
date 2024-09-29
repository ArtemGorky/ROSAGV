import { useEffect } from 'react';
import { robotsTasksStore } from '@/entities';
import { observer } from "mobx-react-lite";
import { IntlProps } from '../types';
import { useInterval } from 'usehooks-ts';
import { requestingTasksDelay } from '@/shared/constants';
import { RobotsTasksTable } from '../view/robots-tasks-table/RobotsTasksTable';

export const WithRobotsTasksTable = observer(({ intl }: IntlProps) => {

    const {
        store: {
            isLoading, currentTasks, tasksCurrentPage, tasksCommand, tasksName, tasksRobotId, tasksStartDate, tasksEndDate,
            tasksPageSize, getRobotsTasksData
        },
    } = robotsTasksStore;

    useInterval(() => getRobotsTasksData(), requestingTasksDelay);

    useEffect(() => {

        getRobotsTasksData();

    }, [tasksCurrentPage, tasksCommand, tasksName, tasksRobotId, tasksStartDate, tasksEndDate, tasksPageSize]);

    return <RobotsTasksTable currentTasks={currentTasks} intl={intl} isLoading={isLoading} />

});
