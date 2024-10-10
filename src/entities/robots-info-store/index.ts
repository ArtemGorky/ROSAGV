import { RobotsInfo } from "@/pages/robots-info/types";
import { getRobotsInfo } from "@/servises";
import { makeAutoObservable, runInAction } from "mobx";

class RobotsInfoStore {
    currentRobotsInfo: RobotsInfo[] = [];

    isLoadingRobotsInfo: boolean = false;

    robotsInfoPageSize: number = 10;

    constructor() {
        makeAutoObservable(this);
    }

    setRobotsInfo = (info: RobotsInfo[]) => {
        this.currentRobotsInfo = info;
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

}

export const store = new RobotsInfoStore();
