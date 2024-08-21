import { robotsTasksReqConfig } from "@/shared";
import { httpClient } from "../http-client";

export const getRobotsTasks = async () => {
    try {

        const resp = await httpClient(robotsTasksReqConfig).get("/tasks");

        return resp.data;

    } catch (error) {
        console.error("Error of getting robots tasks: ", error);
        return error
    }
};
