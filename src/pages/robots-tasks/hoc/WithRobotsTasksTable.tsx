import { useEffect } from 'react';
import { robotsTasksStore } from '@/entities';
import { observer } from "mobx-react-lite";
import { IntlProps } from '../types';
import { RobotsTasksTable } from '../view/robots-tasks-table/RobotsTasksTable';
import { WithRefetchDataRobotsTasksTable } from './WithRefetchDataRobotsTasksTable';

export const WithRobotsTasksTable = observer(({ intl }: IntlProps) => {

    const {
        store: {
            isLoading, currentTasks, tasksCurrentPage, tasksCommand, tasksName, tasksRobotId, tasksStartDate, tasksEndDate,
            tasksPageSize, tasksStatus, tasksRefetchData, tasksRangeStatus, tasksMinStartTimeAfter, tasksMinStartTimeBefore,
            tasksOrder, getRobotsTasksData
        },
    } = robotsTasksStore;

    useEffect(() => {

        getRobotsTasksData(intl.locale);

    }, [
        tasksCurrentPage,
        tasksCommand,
        tasksName,
        tasksRobotId,
        tasksStartDate,
        tasksEndDate,
        tasksPageSize,
        tasksStatus,
        tasksRangeStatus,
        tasksMinStartTimeAfter,
        tasksMinStartTimeBefore,
        tasksOrder,
        intl.locale
    ]);

    return (
        tasksRefetchData
            ? <WithRefetchDataRobotsTasksTable currentTasks={currentTasks} intl={intl} isLoading={isLoading} />
            : <RobotsTasksTable currentTasks={currentTasks} intl={intl} isLoading={isLoading} />
    );

});
