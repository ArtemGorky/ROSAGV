import { RobotsTasks } from "@/pages/robots-tasks/types";
import moment from 'moment';
import { IntlShape } from "react-intl";

export const getRobotsTasksStructuredData = (data: RobotsTasks[]) => {

    const structuredData = data.map((obj: RobotsTasks, index: number) => {

        const startDate = obj.min_start_time ? moment(obj.min_start_time).format("DD.MM.YYYY hh:mm") : null;

        const stateTimestamp = obj.task_state.timestamp ? moment(obj.task_state.timestamp).format("DD.MM.YYYY hh:mm") : null;
        const stateStartTime = obj.task_state.start_time ? moment(obj.task_state.start_time).format("DD.MM.YYYY hh:mm") : null;
        const stateEndTime = obj.task_state.end_time ? moment(obj.task_state.end_time).format("DD.MM.YYYY hh:mm") : null;

        return {
            key: index,
            task_id: obj.task_id,
            command: obj.command,
            robot_id: obj.task_state.robot_id,
            targets: obj.targets,
            name: obj.name,
            min_start_time: startDate,
            wrapping_required: obj.wrapping_required,
            task_state: {
                ...obj.task_state,
                timestamp: stateTimestamp,
                start_time: stateStartTime,
                end_time: stateEndTime
            }
        }
    });

    return structuredData;
}

export const getTasksStatusLocale = (intl: IntlShape, num: number) => {

    const statuses: Record<number, string> = {
        1: intl.formatMessage({ id: 'page.robotsTasks.status.accepted' }),  // Accepted
        2: intl.formatMessage({ id: 'page.robotsTasks.status.queued' }),  // "Queued"
        3: intl.formatMessage({ id: 'page.robotsTasks.status.assigned' }),  // "Assigned"
        4: intl.formatMessage({ id: 'page.robotsTasks.status.inProgress' }),  // "In Progress"
        5: intl.formatMessage({ id: 'page.robotsTasks.status.success' }),  // "Success"
        6: intl.formatMessage({ id: 'page.robotsTasks.status.failed' }),  // "Failed"
        7: intl.formatMessage({ id: 'page.robotsTasks.status.cancelled' }),  // "Cancelled"
    }

    return statuses[num];
}

export const getTasksStatusName = (intl: IntlShape, num: string) => {

    const statuses: Record<string, string> = {
        "Accepted": intl.formatMessage({ id: 'page.robotsTasks.status.accepted' }),  // Accepted
        "Queued": intl.formatMessage({ id: 'page.robotsTasks.status.queued' }),  // "Queued"
        "Assigned": intl.formatMessage({ id: 'page.robotsTasks.status.assigned' }),  // "Assigned"
        "In Progress": intl.formatMessage({ id: 'page.robotsTasks.status.inProgress' }),  // "In Progress"
        "Success": intl.formatMessage({ id: 'page.robotsTasks.status.success' }),  // "Success"
        "Failed": intl.formatMessage({ id: 'page.robotsTasks.status.failed' }),  // "Failed"
        "Cancelled": intl.formatMessage({ id: 'page.robotsTasks.status.cancelled' }),  // "Cancelled"
    }

    return statuses[num];
}