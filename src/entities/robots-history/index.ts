import { RobotsHistory } from "@/pages/robots-history/types";
import { getRobotHistoryIds, getRobotsHistory, getRobotsTargetTask } from "@/servises";
import { debounceDelay } from "@/shared/constants";
import { FleetData, FleetResult, OptionsTypes } from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";
import moment from "moment";

class RobotsHistoryStore {
    robotsHistory: RobotsHistory[] = [];

    isLoadingRobotsHistory: boolean = false;
    isRobotHistoryIdsLoading: boolean = false;

    isOpenDropdown: boolean = false;

    timerDebounce: ReturnType<typeof setTimeout> | null = null;

    robotHistoryIds: OptionsTypes[] = [];

    tempRobotHistoryIds: OptionsTypes[] = [];
    currentRobotHistoryIds: OptionsTypes[] = [];

    robotsHistoryTotalPages: number = 0;
    robotsHistoryCurrentPage: number = 1;
    robotsHistoryPageSize: number = 5;

    historyStartDate: string = moment().subtract(365, 'days').format().split("+")[0];
    historyEndDate: string = moment().format().split("+")[0];

    constructor() {
        makeAutoObservable(this);
    }


    handleDebounce = (val: string | OptionsTypes[], key: string) => {

        this.timerDebounce && clearTimeout(this.timerDebounce);

        this.timerDebounce = setTimeout(() => {
            this.setHistoryCurrentPage(1);
            runInAction(() => {
                this[key] = val;
            });
        }, debounceDelay);
    }

    setHistoryCurrentPage = (val: number) => {
        this.robotsHistoryCurrentPage = val;
    };

    setRobotsHistoryPageSize = (val: number) => {
        this.robotsHistoryPageSize = val;
    }

    setRobotHistoryId = (option: OptionsTypes[]) => {
        this.tempRobotHistoryIds = option;
        this.handleDebounce(option, 'currentRobotHistoryIds');
    };

    openingControl = (isOpen: boolean) => {
        this.isOpenDropdown = isOpen;
    }

    setRangeDateHistory = (dates: string[]) => {
        this.historyStartDate = dates[0] ? `${dates[0]}T00:00:00` : "";
        this.historyEndDate = dates[1] ? `${dates[1]}T00:00:00` : "";
        this.setHistoryCurrentPage(1);
    };

    resetRobotHistoryFilterData = () => {
        runInAction(() => {
            this.tempRobotHistoryIds = [];
            this.currentRobotHistoryIds = [];

            this.historyStartDate = moment().subtract(1, 'days').format().split("+")[0];
            this.historyEndDate = moment().format().split("+")[0];
        });
    };

    getRobotsHistoryData = async (queryStr: string, locale: string) => {
        try {
            this.isLoadingRobotsHistory = true;

            const data: RobotsHistory[] = await getRobotsHistory(queryStr, locale);

            runInAction(() => {
                this.isLoadingRobotsHistory = false;
                this.robotsHistory = data;
                this.robotsHistoryTotalPages = Math.ceil(data.length / this.robotsHistoryPageSize);
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoadingRobotsHistory = false;
                    this.robotsHistory = null;
                });
            }

        }
    };



    getRobotHistoryIdsData = async (locale: string) => {
        try {

            this.isRobotHistoryIdsLoading = true;

            const targetQueryStr = `?lang=${locale}`;

            const data: FleetData = await getRobotHistoryIds(targetQueryStr);

            const targetData: OptionsTypes[] = data.results.map((res: FleetResult, index: number) =>
                ({ value: res.robot_id, label: res.robot_id, id: index }));

            runInAction(() => {
                this.isRobotHistoryIdsLoading = false;
                this.robotHistoryIds = targetData;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isRobotHistoryIdsLoading = false;
                    this.robotHistoryIds = [{ value: "0", label: `Ошибка: ${error.message}`, id: 0 }]
                });
            }

        }
    };



}

export const store = new RobotsHistoryStore();
