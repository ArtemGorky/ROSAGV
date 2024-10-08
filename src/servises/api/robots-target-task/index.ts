import { robotsTasksReqConfig } from "@/shared";
import { httpClient } from "../http-client";

export const getRobotsTargetTask = async (queryStr: string) => {
    try {

        // http://10.1.242.3:8000/api/tasks/7424e41c-76c7-4b4a-9599-bce6ca46da13/

        const resp = await httpClient(robotsTasksReqConfig).get(`tasks/${queryStr}/`);

        return resp.data;

    } catch (error) {
        console.error("Error of getting robots tasks name: ", error);
        return error
    }
};

export const getRobotsTargetTaskHistory = async (queryStr: string) => {
    try {

        // http://10.1.242.3:8000/api/tasks/7424e41c-76c7-4b4a-9599-bce6ca46da13/state/

        const resp = await httpClient(robotsTasksReqConfig).get(`tasks/${queryStr}/state/`);

        return resp.data;

    } catch (error) {
        console.error("Error of getting robots tasks name: ", error);
        return error
    }
};


export const robotTaskRetry = async (queryStr: string) => {
    try {

        // http://10.1.242.3:8000/api/tasks/retry/

        const res = await httpClient(robotsTasksReqConfig).post(`tasks/retry/`, [{
            task_id: queryStr,
        }]);

        return res.data;

    } catch (error) {
        console.error("Error of getting robots tasks name: ", error);
        return error
    }
};

export const robotTaskCancel = async (queryStr: string) => {
    try {

        // http://10.1.242.3:8000/api/tasks/cancel/

        const res = await httpClient(robotsTasksReqConfig).post(`tasks/cancel/`, [{
            task_id: queryStr,
        }]);

        return res.data;

    } catch (error) {
        console.error("Error of getting robots tasks name: ", error);
        return error
    }
};