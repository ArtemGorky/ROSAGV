import { mockDelay, robotsFleetReqConfig, robotsHistoryMockData } from "@/shared";
import { httpClient } from "../http-client";

export const getRobotsHistory = async (queryStr: string, locale: string) => {
    try {

        // const resp = await httpClient(robotsTasksReqConfig).get(`tasks/${queryStr}/?lang=${locale}`);

        await mockDelay(750);

        return robotsHistoryMockData;
        // return resp.data;

    } catch (error) {
        console.error("Error of getting robots history: ", error);
        return error
    }
};


export const getRobotHistoryIds = async (queryStr: string) => {
    try {

        // const resp = { data: newMockTasksRobotIdData };  // robotsFleetReqConfig

        const resp = await httpClient(robotsFleetReqConfig).get(`robots/${queryStr}`);

        // await httpClient(robotsTasksReqConfig).get(`tasks/`);

        return resp.data;

    } catch (error) {
        console.error("Error of getting robot history ids: ", error);
        return error
    }
};