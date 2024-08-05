import { parksAndRobotsMockData, parksAndRobotsReqConfig } from "@/shared";
import { httpClient } from "../http-client";

export const getParksAndRobots = async () => {
    try {


        // const resp = await httpClient(parksAndRobotsReqConfig).get("/fleets");

        // console.log(resp.data[0]);

        return parksAndRobotsMockData;

    } catch (error) {
        console.error("Error of getting parks and robots: ", error);
        return error
    }
};
