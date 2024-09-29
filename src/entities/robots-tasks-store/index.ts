import { makeAutoObservable, runInAction } from "mobx";
import { getRobotsTasks, getRobotsTasksCommand, getRobotsTasksName, getRobotsTasksRobotId } from "@/servises";
import { RobotsTasks, TasksData } from "@/pages/robots-tasks/types";
import { getRobotsTasksStructuredData } from "@/shared/helpers/robots-tasks";
import { ValueTypes } from "@/shared/types";

class robotsTasksStore {
    robotsTasks: RobotsTasks[] = [];
    currentTasks: RobotsTasks[] = [];

    isLoading: boolean = false;
    getRobotsTasksError: string = "";

    tasksRequester: ValueTypes[] = [];
    currentRequester: string | null = null;

    tasksStatuses: ValueTypes[] = [];
    tasksCurrentStatuses: string[] = [];

    taskCategory: ValueTypes[] = [];
    currentTaskCategory: string[] = [];

    isOpenDropdown: boolean = false;

    tasksCommand: string = "";
    tasksName: string = "";
    tasksRobotId: string = "";

    tasksStartDate: string = "";
    tasksEndDate: string = "";

    isTasksCommandLoading: boolean = false;
    isTasksNameLoading: boolean = false;
    isTasksRobotIdLoading: boolean = false;

    tasksCommands: ValueTypes[] = [];
    tasksNames: ValueTypes[] = [];
    tasksRobotIds: ValueTypes[] = [];

    tasksTotalPages: number = 0;
    tasksCurrentPage: number = 1;
    tasksPageSize: number = 20;

    constructor() {
        makeAutoObservable(this);
    }

    openingControl = (isOpen: boolean) => {
        this.isOpenDropdown = isOpen;
    }


    setTasksPageSize = (val: number) => {
        this.tasksPageSize = val
    };

    setTasksCurrentPage = (val: number) => {
        this.tasksCurrentPage = val;
    };


    setTasksCommand = (val: string | null) => {
        this.tasksCommand = val;
        this.setTasksCurrentPage(1);
    };

    setTasksName = (val: string | null) => {
        this.tasksName = val;
        this.setTasksCurrentPage(1);
    };

    setTasksRobotId = (val: string | null) => {
        this.tasksRobotId = val;
        this.setTasksCurrentPage(1);
    };


    setRangeDateTasks = (dates: string[]) => {
        this.tasksStartDate = dates[0] ? `${dates[0]}T00:00:00` : "";
        this.tasksEndDate = dates[1] ? `${dates[1]}T00:00:00` : "";
        this.setTasksCurrentPage(1);
    };

    resetTasksFilterData = () => {
        this.setTasksCommand("")
        this.setTasksName("");
        this.setTasksRobotId("");
        this.setRangeDateTasks([]);
        this.setTasksCurrentPage(1);
    };


    getTasksCommand = async () => {
        try {

            this.isTasksCommandLoading = true;

            const data: string[] = await getRobotsTasksCommand();

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

            const data: string[] = await getRobotsTasksName();

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

    getRobotsTasksData = async () => {
        try {
            this.isLoading = true;

            const pageSizeParam = this.tasksPageSize ? `&page_size=${this.tasksPageSize}` : "";
            const robotIdParam = this.tasksRobotId ? `&robot_id=${this.tasksRobotId}` : "";
            const commandParam = this.tasksCommand ? `&command=${this.tasksCommand}` : "";
            const nameParam = this.tasksName ? `&name=${this.tasksName}` : "";
            const pageParam = this.tasksCurrentPage ? `&page=${this.tasksCurrentPage}` : "";

            const startTimeAfter = this.tasksStartDate ? `&min_start_time_after=${this.tasksStartDate}` : "";
            const startTimeBefore = this.tasksEndDate ? `&min_start_time_before=${this.tasksEndDate}` : "";

            const queryStr = `${pageParam}${commandParam}${nameParam}${robotIdParam}${startTimeAfter}${startTimeBefore}${pageSizeParam}`;

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
