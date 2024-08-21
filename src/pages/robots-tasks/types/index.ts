import { IntlShape } from "react-intl";

export type IntlProps = {
    intl: IntlShape;
};

export type RobotsTasksDataType = {
    taskId: string,
    requestTime: number,
    requester: string,
    category: string,
    assignedToGroup: string,
    assignedToName: string,
    status: string,
    dispatchStatus: string,
    expectedRobotName: string,
    taskStartTime: number,
    taskFinishTime: number,
    originalEstimateMillis: number,
    estimateMillis: number,
    errors: string,
};

export interface RobotsTasksType {
    booking: RobotsTasksBooking
    category: string
    detail: string
    unix_millis_start_time: number
    unix_millis_finish_time: number
    original_estimate_millis: number
    estimate_millis: number
    assigned_to: RobotsTasksAssignedTo
    status: string
    dispatch: RobotTasksDispatch
    phases: RobotsTasksPhases
    completed: number[]
    active: number
    pending: any[]
    interruptions: any
    cancellation: any
    killed: any
}

export type RobotTasksDispatch = {
    status: string;
    assignment: {
        expected_robot_name: string;
    },
    errors: string;
}

export interface RobotsTasksBooking {
    id: string
    unix_millis_earliest_start_time: number
    unix_millis_request_time: any
    priority: any
    labels: any
    requester: any
}

export interface RobotsTasksAssignedTo {
    group: string
    name: string
}

export interface RobotsTasksPhases {
    "1": RobotsTasksN1
    "2": RobotsTasksN22
}

export interface RobotsTasksN1 {
    id: number
    category: string
    detail: string
    unix_millis_start_time: number
    unix_millis_finish_time: number
    original_estimate_millis: number
    estimate_millis: number
    final_event_id: number
    events: Events
    skip_requests: any
}

export interface Events {
    "0": RobotsTasksN0
    "1": RobotsTasksN12
    "2": RobotsTasksN2
}

export interface RobotsTasksN0 {
    id: number
    status: string
    name: string
    detail: string
    deps: number[]
}

export interface RobotsTasksN12 {
    id: number
    status: string
    name: string
    detail: string
    deps: number[]
}

export interface RobotsTasksN2 {
    id: number
    status: string
    name: string
    detail: string
    deps: any[]
}

export interface RobotsTasksN22 {
    id: number
    category: string
    detail: string
    unix_millis_start_time: number
    unix_millis_finish_time: number
    original_estimate_millis: number
    estimate_millis: number
    final_event_id: number
    events: RobotsTasksEvents2
    skip_requests: any
}

export interface RobotsTasksEvents2 {
    "0": RobotsTasksN02
    "1": RobotsTasksN13
    "2": RobotsTasksN23
}

export interface RobotsTasksN02 {
    id: number
    status: string
    name: string
    detail: string
    deps: number[]
}

export interface RobotsTasksN13 {
    id: number
    status: string
    name: string
    detail: string
    deps: number[]
}

export interface RobotsTasksN23 {
    id: number
    status: string
    name: string
    detail: string
    deps: any[]
}
