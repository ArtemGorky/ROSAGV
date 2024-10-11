import { robotsFleetReqConfig } from "@/shared";
import { httpClient } from "../http-client";

export const getTargetRobotInfo = async (queryStr: string, locale: string) => {
    try {

        // http://10.1.242.3:8011/api/robot-states/216f004e-afe2-44f7-b103-aa616bea10bc/

        const resp = await httpClient(robotsFleetReqConfig).get(`robot-states/${queryStr}/?lang=${locale}`);

        return resp.data;

    } catch (error) {
        console.error("Error of getting target robot info: ", error);
        return error
    }
};