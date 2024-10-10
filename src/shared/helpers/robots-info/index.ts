import { RobotsInfo } from "@/pages/robots-info/types";
import { IntlShape } from "react-intl";

export const getRobotsInfoStructuredData = (data: string) => {

    const info = JSON.parse(data);

    const StructuredData = info.map((obj: RobotsInfo, index: number) => {

        return {
            key: index,
            robot: {
                robot_id: obj.robot.robot_id,
                type: obj.robot.type,
                enable_technical_tasks: obj.robot.enable_technical_tasks,
                charge_threshold: obj.robot.charge_threshold
            },
            latest_status: {
                id: obj.latest_status.id,
                robot_id: obj.latest_status.robot_id,
                connected: obj.latest_status.connected,
                manual: obj.latest_status.manual,
                active_task: obj.latest_status.active_task,
                failed_task: obj.latest_status.failed_task,
                fail_description: obj.latest_status.fail_description,
                obstacle: obj.latest_status.obstacle,
                traffic: obj.latest_status.traffic,
                forks_up: obj.latest_status.forks_up,
                pedal_pressed: obj.latest_status.pedal_pressed,
                battery_level: obj.latest_status.battery_level,
                battery_charging: obj.latest_status.battery_charging,
                mark_id: obj.latest_status.mark_id,
                current_task_id: obj.latest_status.current_task_id,
                current_mission_id: obj.latest_status.current_mission_id,
                current_mission: obj.latest_status.current_mission,
                current_action: obj.latest_status.current_action,
                current_action_type: obj.latest_status.current_action_type,
                pose_stamped: obj.latest_status.pose_stamped,
                vel: obj.latest_status.vel,
                timestamp: obj.latest_status.timestamp
            }
        }

    });

    return StructuredData;
}

export const getStatusBatteryRobotsInfo = (level: number) => {
    switch (level) {
        case 100:
            return "success";
        case 0:
            return "exception";

        default:
            return "normal";
    }
}

export const getFilterListRobotsInfo = (intl: IntlShape) => {
    return [
        {
            text: intl.formatMessage({ id: 'page.robotsInfo.tabletFilterList.connected' }),
            value: "connected"
        },
        {
            text: intl.formatMessage({ id: 'page.robotsInfo.tabletFilterList.manual' }),
            value: "manual"
        },
        {
            text: intl.formatMessage({ id: 'page.robotsInfo.tabletFilterList.obstacle' }),
            value: "obstacle"
        },
        {
            text: intl.formatMessage({ id: 'page.robotsInfo.tabletFilterList.traffic' }),
            value: "traffic"
        },
        {
            text: intl.formatMessage({ id: 'page.robotsInfo.tabletFilterList.forks_up' }),
            value: "forks_up"
        },
        {
            text: intl.formatMessage({ id: 'page.robotsInfo.tabletFilterList.pedal_pressed' }),
            value: "pedal_pressed"
        },
        {
            text: intl.formatMessage({ id: 'page.robotsInfo.tabletFilterList.battery_charging' }),
            value: "battery_charging"
        }
    ];
}