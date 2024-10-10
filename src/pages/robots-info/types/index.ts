import { IntlShape } from "react-intl";

export type IntlProps = {
    intl: IntlShape;
};

export interface RobotsInfoTypes {
    robot_id: string;
    charge_threshold: number
}

export interface RobotsInfo {
    key: number;
    robot: Robot;
    latest_status: LatestStatus;
    latest_coord: LatestCoord;
}

export interface Robot {
    robot_id: string;
    type: number;
    enable: boolean;
    enable_technical_tasks: boolean;
    charge_threshold: number;
}

export interface LatestStatus {
    id: string;
    robot_id: string;
    connected: boolean;
    manual: boolean;
    active_task: boolean;
    failed_task: boolean;
    fail_description: string;
    obstacle: boolean;
    traffic: boolean;
    forks_up: boolean;
    pedal_pressed: boolean;
    battery_level: number;
    battery_charging: boolean;
    mark_id: number;
    current_task_id: any;
    current_mission_id: any;
    current_mission: any;
    current_action: any;
    current_action_type: any;
    timestamp: string;
}
export interface LatestCoord {
    id: string,
    robot_id: string,
    position_x: number,
    position_y: number,
    position_z: number,
    orientation_x: number,
    orientation_y: number,
    orientation_z: number,
    orientation_w: number,
    vel: number,
    timestamp: string
}

export interface PoseStamped {
    position: Position;
    orientation: Orientation;
}

export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface Orientation {
    x: number;
    y: number;
    z: number;
    w: number;
}

export type TablePaginationPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'none';

