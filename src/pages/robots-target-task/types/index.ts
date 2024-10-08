export interface RobotsTargetTask {
    task_id: string
    command: string
    robot_id: any
    targets: string[]
    name: string
    min_start_time: any
    wrapping_required: boolean
    task_state: RobotsTargetTaskState
}

export interface RobotsTargetTaskState {
    state: number
    timestamp: string
    robot_id: string
    start_time: string
    end_time: string
    error_code: string
}

export interface RobotTaskResponseMessage {
    task_id: string;
    status: string;
}