import { IntlShape } from "react-intl";

export interface TargetRobotInfo {
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

export type IntlProps = {
    intl: IntlShape;
};