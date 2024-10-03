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