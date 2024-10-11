import { RobotTaskResponseMessage } from "@/pages/robots-target-task/types";
import { getRobotsTargetTask, getRobotsTargetTaskHistory, robotTaskCancel, robotTaskRetry } from "@/servises";
import { RobotsTargetTask, RobotsTargetTaskState } from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";
import moment from "moment";

class RobotsTargetTaskStore {
    robotsTargetTask: RobotsTargetTask | null = null;
    robotsTargetTaskHistory: RobotsTargetTaskState[] = [];

    isLoadingTargetTaskData: boolean = false;
    isLoadingTargetTaskHistoryData: boolean = false;

    isOpenRetryTaskModal: boolean = false;
    isOpenCancelTaskModal: boolean = false;

    robotTaskResponseMessage: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setIsOpenRetryTaskModal = (val: boolean) => {
        this.isOpenRetryTaskModal = val;
    }
    setIsOpenCancelTaskModal = (val: boolean) => {
        this.isOpenCancelTaskModal = val;
    }

    setRobotsTargetTask = (val: RobotsTargetTask | null) => {
        this.robotsTargetTask = val;
    }
    setRobotsTargetTaskHistory = (val: RobotsTargetTaskState[]) => {
        this.robotsTargetTaskHistory = val;
    }

    setRobotTaskResponseMessage = (val: string) => {
        this.robotTaskResponseMessage = val;
    }


    getRobotsTargetTaskData = async (queryStr: string, locale: string) => {
        try {
            this.isLoadingTargetTaskData = true;

            const data: RobotsTargetTask = await getRobotsTargetTask(queryStr, locale);

            runInAction(() => {
                this.isLoadingTargetTaskData = false;
                this.robotsTargetTask = data;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoadingTargetTaskData = false;
                    this.robotsTargetTask = null;
                });
            }

        }
    };

    getRobotsTargetTaskHistoryData = async (queryStr: string, locale: string) => {
        try {
            this.isLoadingTargetTaskHistoryData = true;

            const data: RobotsTargetTaskState[] = await getRobotsTargetTaskHistory(queryStr, locale);

            const targetData = data.map(obj => ({ ...obj, timestamp: moment(obj.timestamp).format("DD.MM.YYYY hh:mm") }));

            runInAction(() => {
                this.isLoadingTargetTaskHistoryData = false;
                this.robotsTargetTaskHistory = targetData;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoadingTargetTaskHistoryData = false;
                    this.robotsTargetTaskHistory = [];
                });
            }

        }
    };

    robotTargetTaskRetry = async (queryStr: string, locale: string) => {
        try {

            const data: RobotTaskResponseMessage[] = await robotTaskRetry(queryStr, locale);

            runInAction(() => {
                this.robotTaskResponseMessage = data[0].status;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.robotTaskResponseMessage = "";
                });
            }

        }
    };


    robotTargetTaskCancel = async (queryStr: string, locale: string) => {
        try {

            const data: RobotTaskResponseMessage[] = await robotTaskCancel(queryStr, locale);

            runInAction(() => {
                this.robotTaskResponseMessage = data[0].status;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.robotTaskResponseMessage = "";
                });
            }

        }
    };

}

export const store = new RobotsTargetTaskStore();
