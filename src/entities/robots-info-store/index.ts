import { RobotsInfo } from "@/pages/robots-info/types";
import { getRobotsInfo, getRobotsTargetTask } from "@/servises";
import { getRobotsInfoStructuredData, robotsInfo } from "@/shared";
import { RobotsTargetTask } from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";

const wsUrl = `${import.meta.env.VITE_AGV_ROBOTS_INFO_SOCKET}/robot_state/`;

class RobotsInfoStore {
    targetRobotInfoSocket: WebSocket | null = null;

    currentRobotsInfo: RobotsInfo[] = [];

    currentRobotInfo: RobotsInfo | null = null;

    currentRobotId: string | null = null;

    isLoadingRobotsInfo: boolean = false;

    robotsInfoPageSize: number = 10;

    robotsTargetTask: RobotsTargetTask | null = null;

    isTasksDisabled: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsTasksDisabled = (val: boolean) => {
        this.isTasksDisabled = val;
    }

    setCurrentRobotId = (id: string | null) => {
        this.currentRobotId = id;
    }

    setRobotsInfoPageSize = (val: number) => {
        this.robotsInfoPageSize = val;
    }

    getRobotsInfoData = async () => {
        try {
            this.isLoadingRobotsInfo = true;

            const data: RobotsInfo[] = await getRobotsInfo();

            runInAction(() => {
                this.isLoadingRobotsInfo = false;
                this.currentRobotsInfo = data;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoadingRobotsInfo = false;
                    this.currentRobotsInfo = null;
                });
            }

        }
    };

    robotsInfoStartSocketConnection = async () => {
        try {
            const ws = this.targetRobotInfoSocket ?? new WebSocket(wsUrl);

            ws.onopen = () => {
                runInAction(() => {
                    this.targetRobotInfoSocket = ws;
                });
            };

            ws.onmessage = (event) => {

                const structuredData = getRobotsInfoStructuredData(event.data);

                runInAction(() => {

                    // this.currentRobotsInfo = structuredData;

                    this.currentRobotsInfo = robotsInfo;

                    this.currentRobotInfo = this.currentRobotsInfo.find(obj => obj.robot.robot_id === this.currentRobotId);

                });

            };

            ws.onclose = () => {
                runInAction(() => {
                    this.targetRobotInfoSocket = null;
                    console.log('WebSocket connection closed');
                });
            };

            ws.onerror = (error) => {
                if (error instanceof Error) {
                    console.error(`WebSocket erro connection: ${error.message}`);
                }
            };

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.targetRobotInfoSocket = null;
                });
            }

        }
    }

    getRobotsTargetTaskData = async (queryStr: string, locale: string) => {
        try {

            const data: RobotsTargetTask = await getRobotsTargetTask(queryStr, locale);

            runInAction(() => {
                this.robotsTargetTask = data;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.robotsTargetTask = null;
                });
            }

        }
    };

}

export const store = new RobotsInfoStore();
