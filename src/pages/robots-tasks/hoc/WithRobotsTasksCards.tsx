import { useEffect } from 'react';
import { robotsTasksStore } from '@/entities';
import { observer } from "mobx-react-lite";
import { IntlProps } from '../types';
import { WithRefetchDataRobotsTasksCards } from './WithRefetchDataRobotsTasksCards';
import { RobotsTasksCards } from '../view/robot-tasks-cards/RobotTasksCards';

export const WithRobotsTasksCards = observer(({ intl }: IntlProps) => {

    const {
        store: {
            isLoading, currentTasks, tasksCurrentPage, tasksCommand, tasksName, tasksRobotId, tasksStartDate, tasksEndDate,
            tasksPageSize, tasksStatus, tasksRefetchData, getRobotsTasksData
        },
    } = robotsTasksStore;

    useEffect(() => {

        getRobotsTasksData();

    }, [tasksCurrentPage, tasksCommand, tasksName, tasksRobotId, tasksStartDate, tasksEndDate, tasksPageSize, tasksStatus]);

    return (
        tasksRefetchData
            ? <WithRefetchDataRobotsTasksCards currentTasks={currentTasks} intl={intl} isLoading={isLoading} />
            : <RobotsTasksCards currentTasks={currentTasks} intl={intl} isLoading={isLoading} />
    );

});
