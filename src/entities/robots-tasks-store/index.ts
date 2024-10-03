import { makeAutoObservable, runInAction } from "mobx";
import { getRobotsTasks, getRobotsTasksCommand, getRobotsTasksName, getRobotsTasksRobotId, getRobotsTasksStatus } from "@/servises";
import { RobotsTasks, TasksData } from "@/pages/robots-tasks/types";
import { getRobotsTasksStructuredData } from "@/shared/helpers/robots-tasks";
import { FleetData, FleetResult, OptionsTypes, ValueTypes } from "@/shared/types";
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

    tasksCommand: OptionsTypes[] = [];
    tasksName: string = "";
    tasksRobotId: OptionsTypes[] = [];
    tasksStatus: OptionsTypes[] = [];

    tempTasksCommand: OptionsTypes[] = [];
    tempTasksName: string = "";
    tempTasksRobotId: OptionsTypes[] = [];
    tempTasksStatus: OptionsTypes[] = [];


    // tasksStartDate: string = "";
    // tasksEndDate: string = "";

    tasksStartDate: string = moment().subtract(1, 'days').format().split("+")[0];
    tasksEndDate: string = moment().format().split("+")[0];


    isTasksCommandLoading: boolean = false;
    isTasksNameLoading: boolean = false;
    isTasksRobotIdLoading: boolean = false;
    isTasksStatusLoading: boolean = false;

    tasksCommands: OptionsTypes[] = [];
    tasksNames: OptionsTypes[] = [];
    tasksRobotIds: OptionsTypes[] = [];
    tasksStatuses: OptionsTypes[] = [];

    tasksTotalPages: number = 0;
    tasksCurrentPage: number = 1;
    tasksPageSize: number = 20;

    statusObj: any = null;

    timerDebounce: ReturnType<typeof setTimeout> | null = null;

    tasksRefetchData: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    handleDebounce = (val: string | OptionsTypes[], key: string) => {

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


    setTasksCommand = (option: OptionsTypes[]) => {
        this.tempTasksCommand = option;
        this.handleDebounce(option, 'tasksCommand');
    };

    setTasksName = (val: string) => {
        this.tempTasksName = val;
        this.handleDebounce(val, 'tasksName');
    };

    setTasksRobotId = (option: OptionsTypes[]) => {
        this.tempTasksRobotId = option;
        this.handleDebounce(option, 'tasksRobotId');
    };

    setTasksStatus = (option: OptionsTypes[]) => {
        this.tempTasksStatus = option;
        this.handleDebounce(option, 'tasksStatus');
    };


    setRangeDateTasks = (dates: string[]) => {
        this.tasksStartDate = dates[0] ? `${dates[0]}T00:00:00` : "";
        this.tasksEndDate = dates[1] ? `${dates[1]}T00:00:00` : "";
        this.setTasksCurrentPage(1);
    };

    resetTasksFilterData = () => {
        runInAction(() => {
            this.tasksCommand = [];
            this.tasksName = "";
            this.tasksRobotId = [];
            this.tasksStatus = [];

            this.tempTasksCommand = [];
            this.tempTasksName = "";
            this.tempTasksRobotId = [];
            this.tempTasksStatus = [];
        });
    };


    setTasksRefetchData = (val: number | null) => this.tasksRefetchData = val;


    getTasksCommand = async () => {
        try {

            this.isTasksCommandLoading = true;

            const data: string[] = await getRobotsTasksCommand();

            const targetData: OptionsTypes[] = Object.keys(data).map((key: string) => ({ value: key, label: data[key] }));

            runInAction(() => {
                this.isTasksCommandLoading = false;
                this.tasksCommands = targetData
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isTasksCommandLoading = false;
                    this.tasksCommands = [{ value: "0", label: `Ошибка: ${error.message}` }]
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

            const targetData: OptionsTypes[] = data.map((val: string) => ({ value: val, label: val }));

            runInAction(() => {
                this.isTasksNameLoading = false;
                this.tasksNames = targetData
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isTasksNameLoading = false;
                    this.tasksNames = [{ value: "0", label: `Ошибка: ${error.message}` }];
                });
            }

        }
    };


    getTasksRobotId = async () => {
        try {

            this.isTasksRobotIdLoading = true;

            const data: FleetData = await getRobotsTasksRobotId();

            const targetData: OptionsTypes[] = data.results.map((res: FleetResult) =>
                ({ value: res.robot_id, label: res.robot_id }));

            runInAction(() => {
                this.isTasksRobotIdLoading = false;
                this.tasksRobotIds = targetData;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isTasksRobotIdLoading = false;
                    this.tasksRobotIds = [{ value: "0", label: `Ошибка: ${error.message}` }]
                });
            }

        }
    };

    getTasksStatus = async () => {
        try {

            this.isTasksStatusLoading = true;

            const data: Record<string, any> = await getRobotsTasksStatus();

            const targetData: OptionsTypes[] = Object.keys(data).map((key: string) => ({ value: key, label: data[key] }));

            runInAction(() => {
                this.statusObj = data;
                this.isTasksStatusLoading = false;
                this.tasksStatuses = targetData;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isTasksStatusLoading = false;
                    this.tasksStatuses = [{ value: "0", label: `Ошибка: ${error.message}` }]
                });
            }

        }
    };

    getRobotsTasksData = async () => {
        try {
            this.isLoading = true;

            const pageSizeParam = this.tasksPageSize ? `&page_size=${this.tasksPageSize}` : "";

            const robotIdParam = this.tasksRobotId.length
                ? this.tasksRobotId.reduce((accum: string, option: OptionsTypes, index: number) => {
                    if (index === this.tasksRobotId.length - 1) {
                        accum = `${accum}${option.label}`
                    }
                    else {
                        accum = `${accum}${option.label},`
                    }
                    return accum
                }, "&robot_id=")
                : "";

            const commandParam = this.tasksCommand.length
                ? this.tasksCommand.reduce((accum: string, option: OptionsTypes, index: number) => {
                    if (index === this.tasksCommand.length - 1) {
                        accum = `${accum}${option.label}`
                    }
                    else {
                        accum = `${accum}${option.label},`
                    }
                    return accum
                }, "&command=")
                : "";

            const statusParam = this.tasksStatus.length
                ? this.tasksStatus.reduce((accum: string, option: OptionsTypes, index: number) => {
                    if (index === this.tasksStatus.length - 1) {
                        accum = `${accum}${option.value}`
                    }
                    else {
                        accum = `${accum}${option.value},`
                    }
                    return accum
                }, "&last_state__in=")
                : "";

            const nameParam = this.tasksName ? `&name=${this.tasksName}` : "";
            const pageParam = this.tasksCurrentPage ? `&page=${this.tasksCurrentPage}` : "";

            const startTimeAfter = this.tasksStartDate ? `&taskstate_timestamp_after=${this.tasksStartDate}` : "";
            const startTimeBefore = this.tasksEndDate ? `&taskstate_timestamp_before=${this.tasksEndDate}` : "";


            const queryStr = `${pageParam}${commandParam}${nameParam}${robotIdParam}${startTimeAfter}${startTimeBefore}${pageSizeParam}${statusParam}`;

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
