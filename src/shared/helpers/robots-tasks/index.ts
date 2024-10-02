import { RobotsTasks } from "@/pages/robots-tasks/types";
import moment from 'moment';

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