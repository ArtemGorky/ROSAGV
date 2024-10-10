// import { robotsInfoReqConfig } from "@/shared/configs";
// import { httpClient } from "../http-client";

import { robotsInfo } from "@/shared";

export const getRobotsInfo = async () => {
    try {

        // http://10.1.242.3:8000/api/tasks/7424e41c-76c7-4b4a-9599-bce6ca46da13/

        // const resp = await httpClient(robotsInfoReqConfig).get(`tasks/${queryStr}/?lang=${locale}`);

        const res = robotsInfo

        return res;

    } catch (error) {
        console.error("Error of getting robots tasks name: ", error);
        return error
    }
};