import { RobotsTasksType } from "@/pages/robots-tasks/types";

export const getRobotsTasksStructuredData = (data: RobotsTasksType[]) => {

    const structuredData = data.map((obj: RobotsTasksType, index: number) => {

        return {
            key: index,
            taskId: obj.booking.id,
            requestTime: obj.booking.unix_millis_request_time,
            requester: obj.booking.requester,
            category: obj.category,
            assignedToGroup: obj.assigned_to.group,
            assignedToName: obj.assigned_to.name,
            status: obj.status,
            dispatchStatus: obj.dispatch?.status,
            expectedRobotName: obj.dispatch?.assignment?.expected_robot_name,
            taskStartTime: obj.unix_millis_start_time,
            taskFinishTime: obj.unix_millis_finish_time,
            originalEstimateMillis: obj.original_estimate_millis,
            estimateMillis: obj.estimate_millis,
            errors: obj.dispatch?.errors,
        }
    });

    return structuredData;
}