import { newMockTasksCommandData, newMockTasksNameData, newMockTasksRobotIdData, robotsTasksReqConfig } from "@/shared";
import { httpClient } from "../http-client";

// import { newMockTasksData } from "@/shared/mock-data/new-robots-tasks";

export const getRobotsTasks = async (queryStr: string) => {
    try {

        // http://10.1.242.3:8000/api/tasks/?page=1&command=to_B

        const resp = await httpClient(robotsTasksReqConfig).get(`tasks/${queryStr}`);

        // const resp = { data: newMockTasksData };

        return resp.data;

    } catch (error) {
        // console.error("Error of getting robots tasks: ", error);
        return error
    }
};

export const getRobotsTasksCommand = async (queryStr: string) => {
    try {

        // const resp = { data: newMockTasksCommandData };

        // await httpClient(robotsTasksReqConfig).get(`tasks/`);  // http://10.1.242.3:8000/api/tasks/commands/

        const resp = await httpClient(robotsTasksReqConfig).get(`tasks/commands/${queryStr}`);

        return resp.data.commands;

    } catch (error) {
        console.error("Error of getting robots tasks command: ", error);
        return error
    }
};

export const getRobotsTasksName = async (queryStr: string) => {
    try {

        // const resp = { data: newMockTasksNameData };  // http://10.1.242.3:8000/api/tasks/names/?name=В0406812

        const resp = await httpClient(robotsTasksReqConfig).get(`tasks/names/${queryStr}`);

        // await httpClient(robotsTasksReqConfig).get(`tasks/`);

        return resp.data;

    } catch (error) {
        console.error("Error of getting robots tasks name: ", error);
        return error
    }
};

export const getRobotsTasksRobotId = async () => {
    try {

        const resp = { data: newMockTasksRobotIdData };

        // await httpClient(robotsTasksReqConfig).get(`tasks/`);

        return resp.data;

    } catch (error) {
        console.error("Error of getting robots tasks name: ", error);
        return error
    }
};

export const getRobotsTasksStatus = async (queryStr: string) => {
    try {

        const resp = await httpClient(robotsTasksReqConfig).get(`tasks/statuses/${queryStr}`);

        return resp.data.statuses;

    } catch (error) {
        console.error("Error of getting robots tasks name: ", error);
        return error
    }
};
