import { TargetRobotInfo } from "@/pages/target-robot-info/types";
// import { getTargetRobotInfo } from "@/servises";
import { targetRobotMockData } from "@/shared";
import { makeAutoObservable, runInAction } from "mobx";

// const wsUrl = `${import.meta.env.VITE_AGV_ROBOTS_INFO_SOCKET}/robot_state/`;

class TargetRobotInfoStore {
    targetRobotInfo: TargetRobotInfo | null = null;

    isLoadingRobotInfo: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    getTargetRobotInfoData = async (queryStr: string, locale: string) => {
        try {
            this.isLoadingRobotInfo = true;

            // const data: TargetRobotInfo = await getTargetRobotInfo(queryStr, locale);

            const data: TargetRobotInfo = targetRobotMockData;

            runInAction(() => {
                this.isLoadingRobotInfo = false;
                this.targetRobotInfo = data;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoadingRobotInfo = false;
                    this.targetRobotInfo = null;
                });
            }

        }
    };

}

export const store = new TargetRobotInfoStore();
