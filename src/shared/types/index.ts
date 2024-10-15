import { IntlShape } from "react-intl";

export type ValueTypes = {
    value: string;
}
export type OptionsTypes = {
    label: any;
    value: string;
    id: number;
}


export interface FleetData {
    links: Links
    total_items: number
    total_pages: number
    current_page: number
    page_size: number
    results: FleetResult[]
}

export interface Links {
    next: any
    previous: any
}

export interface FleetResult {
    robot_id: string
    type: number
    enable_technical_tasks: boolean
    charge_threshold: number
}

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

export type IntlProps = {
    intl: IntlShape;
};

export type TablePaginationPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'none';