import { makeAutoObservable, runInAction } from "mobx";
import { getRobotsTasks, getRobotsTasksCommand, getRobotsTasksName, getRobotsTasksRobotId, getRobotsTasksStatus } from "@/servises";
import { RobotsTasks, TasksData } from "@/pages/robots-tasks/types";
import { getRobotsTasksStructuredData } from "@/shared/helpers/robots-tasks";
import { ValueTypes } from "@/shared/types";
import { debounceDelay } from "@/shared/constants";
import moment from "moment";

class robotsTasksStore {
    robotsTasks: RobotsTasks[] = [];
    currentTasks: RobotsTasks[] = [];

    isLoading: boolean = false;
    getRobotsTasksError: string = "";

    tasksRequester: ValueTypes[] = [];
    currentRequester: string | null = null;

    // tasksStatuses: ValueTypes[] = [];
    tasksCurrentStatuses: string[] = [];

    taskCategory: ValueTypes[] = [];
    currentTaskCategory: string[] = [];

    isOpenDropdown: boolean = false;
    isOpenRefetchDropdown: boolean = false;

    tasksCommand: string = "";
    tasksName: string = "";
    tasksRobotId: string = "";
    tasksStatus: string = "";

    tempTasksCommand: string = "";
    tempTasksName: string = "";
    tempTasksRobotId: string = "";
    tempTasksStatus: string = "";


    // tasksStartDate: string = "";
    // tasksEndDate: string = "";

    tasksStartDate: string = moment().subtract(1, 'days').format().split("+")[0];
    tasksEndDate: string = moment().format().split("+")[0];


    isTasksCommandLoading: boolean = false;
    isTasksNameLoading: boolean = false;
    isTasksRobotIdLoading: boolean = false;
    isTasksStatusLoading: boolean = false;

    tasksCommands: ValueTypes[] = [];
    tasksNames: ValueTypes[] = [];
    tasksRobotIds: ValueTypes[] = [];
    tasksStatuses: ValueTypes[] = [];

    tasksTotalPages: number = 0;
    tasksCurrentPage: number = 1;
    tasksPageSize: number = 20;

    statusObj: any = null;

    timerDebounce: ReturnType<typeof setTimeout> | null = null;

    tasksRefetchData: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    handleDebounce = (val: string, key: string) => {

        this.timerDebounce && clearTimeout(this.timerDebounce);

        this.timerDebounce = setTimeout(() => {
            this.setTasksCurrentPage(1);
            runInAction(() => {
                this[key] = val;
            });
        }, debounceDelay);
    }

    openingControl = (isOpen: boolean) => {
        this.isOpenDropdown = isOpen;
    }

    openingControlRefetchDropdown = (isOpen: boolean) => {
        this.isOpenRefetchDropdown = isOpen;
    }


    setTasksPageSize = (val: number) => {
        this.tasksPageSize = val
    };

    setTasksCurrentPage = (val: number) => {
        this.tasksCurrentPage = val;
    };


    setTasksCommand = (val: string | null) => {
        this.tempTasksCommand = val;
        this.handleDebounce(val, 'tasksCommand');
    };

    setTasksName = (val: string | null) => {
        this.tempTasksName = val;
        this.handleDebounce(val, 'tasksName');
    };

    setTasksRobotId = (val: string | null) => {
        this.tempTasksRobotId = val;
        this.handleDebounce(val, 'tasksRobotId');
    };

    setTasksStatus = (val: string | null) => {
        this.tempTasksStatus = val;
        this.handleDebounce(val, 'tasksStatus');
    };


    setRangeDateTasks = (dates: string[]) => {
        this.tasksStartDate = dates[0] ? `${dates[0]}T00:00:00` : "";
        this.tasksEndDate = dates[1] ? `${dates[1]}T00:00:00` : "";
        this.setTasksCurrentPage(1);
    };

    resetTasksFilterData = () => {
        runInAction(() => {
            this.tasksCommand = "";
            this.tasksName = "";
            this.tasksRobotId = "";
            this.tasksStatus = "";

            this.tempTasksCommand = "";
            this.tempTasksName = "";
            this.tempTasksRobotId = "";
            this.tempTasksStatus = "";
        });
    };


    setTasksRefetchData = (val: number | null) => this.tasksRefetchData = val;


    getTasksCommand = async () => {
        try {

            this.isTasksCommandLoading = true;


            const commandParam = this.tasksCommand ? `&commands=${this.tasksCommand}` : "";

            const queryStr = `${commandParam}`;

            const targetQueryStr = queryStr.replace("&", "?");


            const data: string[] = await getRobotsTasksCommand(targetQueryStr);

            const targetData: ValueTypes[] = data.map((val: string) => ({ value: val }));

            // const structuredData = getRobotsTasksStructuredData(data.results);

            runInAction(() => {
                this.isTasksCommandLoading = false;
                this.tasksCommands = targetData
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isTasksCommandLoading = false;
                    this.tasksCommands = [{ value: `Ошибка: ${error.message}` }]
                });
            }

        }
    };


    getTasksName = async () => {
        try {

            this.isTasksNameLoading = true;


            const nameParam = this.tasksName ? `&name=${this.tasksName}` : "";

            const queryStr = `${nameParam}`;

            const targetQueryStr = queryStr.replace("&", "?");


            const data: string[] = await getRobotsTasksName(targetQueryStr);

            const targetData: ValueTypes[] = data.map((val: string) => ({ value: val }));

            // const structuredData = getRobotsTasksStructuredData(data.results);

            runInAction(() => {
                this.isTasksNameLoading = false;
                this.tasksNames = targetData
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isTasksNameLoading = false;
                    this.tasksNames = [{ value: `Ошибка: ${error.message}` }]
                });
            }

        }
    };

    getTasksRobotId = async () => {
        try {

            this.isTasksRobotIdLoading = true;

            const data: string[] = await getRobotsTasksRobotId();

            const targetData: ValueTypes[] = data.map((val: string) => ({ value: val }));

            // const structuredData = getRobotsTasksStructuredData(data.results);

            runInAction(() => {
                this.isTasksRobotIdLoading = false;
                this.tasksRobotIds = targetData
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isTasksRobotIdLoading = false;
                    this.tasksRobotIds = [{ value: `Ошибка: ${error.message}` }]
                });
            }

        }
    };

    getTasksStatus = async () => {
        try {

            this.isTasksStatusLoading = true;


            const statusParam = this.tasksStatus ? `&status=${this.tasksStatus}` : "";

            const queryStr = `${statusParam}`;

            const targetQueryStr = queryStr.replace("&", "?");


            const data: Record<string, string> = await getRobotsTasksStatus(targetQueryStr);

            const targetData: ValueTypes[] = Object.values(data).map((val: string) => ({ value: val }));

            runInAction(() => {
                this.statusObj = data;
                this.isTasksStatusLoading = false;
                this.tasksStatuses = targetData
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isTasksStatusLoading = false;
                    this.tasksStatuses = [{ value: `Ошибка: ${error.message}` }]
                });
            }

        }
    };

    getRobotsTasksData = async () => {
        try {
            this.isLoading = true;

            const pageSizeParam = this.tasksPageSize ? `&page_size=${this.tasksPageSize}` : "";
            const robotIdParam = this.tasksRobotId ? `&robot_id=${this.tasksRobotId}` : "";
            const commandParam = this.tasksCommand ? `&command=${this.tasksCommand}` : "";
            const nameParam = this.tasksName ? `&name=${this.tasksName}` : "";
            const pageParam = this.tasksCurrentPage ? `&page=${this.tasksCurrentPage}` : "";

            const startTimeAfter = this.tasksStartDate ? `&taskstate_timestamp_after=${this.tasksStartDate}` : "";
            const startTimeBefore = this.tasksEndDate ? `&taskstate_timestamp_before=${this.tasksEndDate}` : "";

            const status = this.tasksStatus ? `&last_state=${this.tasksStatus}` : "";

            const queryStr = `${pageParam}${commandParam}${nameParam}${robotIdParam}${startTimeAfter}${startTimeBefore}${pageSizeParam}${status}`;

            const targetQueryStr = queryStr.replace("&", "?");

            const data: TasksData = await getRobotsTasks(targetQueryStr);

            const structuredData = getRobotsTasksStructuredData(data.results);

            runInAction(() => {
                this.isLoading = false;
                this.robotsTasks = structuredData;
                this.currentTasks = structuredData;
                this.tasksTotalPages = data.total_pages;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.robotsTasks = [];
                    this.currentTasks = [];
                    this.getRobotsTasksError = error.message;
                });
            }

        }
    };

}

export const store = new robotsTasksStore();
