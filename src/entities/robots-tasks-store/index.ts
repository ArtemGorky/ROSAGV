import { makeAutoObservable, runInAction } from "mobx";
import { getRobotsTasks } from "@/servises";
import { RobotsTasksDataType, RobotsTasksType } from "@/pages/robots-tasks/types";
import { getRobotsTasksStructuredData } from "@/shared/helpers/robots-tasks";
import { ValueTypes } from "@/shared/types";

class robotsTasksStore {
    robotsTasks: RobotsTasksDataType[] = [];
    currentTasks: RobotsTasksDataType[] = [];

    isLoading: boolean = false;
    getRobotsTasksError: string = "";

    tasksRequester: ValueTypes[] = [];
    currentRequester: string | null = null;

    tasksStatuses: ValueTypes[] = [];
    tasksCurrentStatuses: string[] = [];

    taskCategory: ValueTypes[] = [];
    currentTaskCategory: string[] = [];

    isOpenDropdown: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    openingControl = (isOpen: boolean) => {
        this.isOpenDropdown = isOpen;
    }

    filterTasksByCategory = (taskCategory: string[]) => {

        this.currentTaskCategory = taskCategory;

        if (taskCategory.length) {

            this.currentTasks = this.robotsTasks.filter(task => taskCategory.includes(task.category ?? ""))
                .filter(task => (this.currentRequester === "∅" && task.requester === null) ||
                    (task.requester === this.currentRequester) ||
                    !this.currentRequester)
                .filter(robot => this.tasksCurrentStatuses.includes(robot.status) || !this.tasksCurrentStatuses.length)

        }
        else {

            this.currentTasks = this.robotsTasks
                .filter(task => (this.currentRequester === "∅" && task.requester === null) ||
                    (task.requester === this.currentRequester) ||
                    !this.currentRequester)
                .filter(robot => this.tasksCurrentStatuses.includes(robot.status) || !this.tasksCurrentStatuses.length)
        }

    }

    filterTasksByStatus = (status: string[]) => {

        this.tasksCurrentStatuses = status;

        if (status.length) {

            this.currentTasks = this.robotsTasks.filter(task => status.includes(task.status ?? ""))
                .filter(task => (this.currentRequester === "∅" && task.requester === null) ||
                    (task.requester === this.currentRequester) ||
                    !this.currentRequester)
                .filter(task => this.currentTaskCategory.includes(task.category ?? "") || !this.currentTaskCategory.length)

        }
        else {

            this.currentTasks = this.robotsTasks
                .filter(task => (this.currentRequester === "∅" && task.requester === null) ||
                    (task.requester === this.currentRequester) ||
                    !this.currentRequester)
                .filter(task => this.currentTaskCategory.includes(task.category ?? "") || !this.currentTaskCategory.length)
        }

    }

    filterTasksByRequester = (requester: string | null) => {

        const currentRequester = this.tasksRequester.find(obj => obj.value === requester);

        if (requester === "∅") {

            this.currentTasks = this.robotsTasks.filter(robot => robot.requester === null)
                .filter(robot => this.tasksCurrentStatuses.includes(robot.status) || !this.tasksCurrentStatuses.length)
                .filter(robot => this.currentTaskCategory.includes(robot.category ?? "") || !this.currentTaskCategory.length)

            this.currentRequester = "∅";
        }

        if (requester && currentRequester) {

            this.currentTasks = this.robotsTasks.filter(robot => robot.requester === requester)
                .filter(robot => this.tasksCurrentStatuses.includes(robot.status) || !this.tasksCurrentStatuses.length)
                .filter(robot => this.currentTaskCategory.includes(robot.category ?? "") || !this.currentTaskCategory.length)

            this.currentRequester = requester;
        }

        if (requester === null || requester === "") {
            this.currentTasks = this.robotsTasks
                .filter(robot => this.tasksCurrentStatuses.includes(robot.status) || !this.tasksCurrentStatuses.length)
                .filter(robot => this.currentTaskCategory.includes(robot.category ?? "") || !this.currentTaskCategory.length)

            this.currentRequester = null;
        }
    }

    getRobotsTasksData = async () => {
        try {
            this.isLoading = true;

            const data: RobotsTasksType[] = await getRobotsTasks();

            const requesters = data.map(task => ({ value: task.booking.requester ?? "" }));

            const statuses = [...new Set(data.map(task => (task.status)))].map(status => ({ value: status ?? "" }));

            const taskCategory = [...new Set(data.map(task => (task.category)))].map(category => ({ value: category ?? "" }));

            const structuredData = getRobotsTasksStructuredData(data);

            runInAction(() => {
                this.tasksRequester = requesters;
                this.tasksStatuses = statuses;
                this.taskCategory = taskCategory;

                this.isLoading = false;
                this.robotsTasks = structuredData;
                this.currentTasks = structuredData;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.getRobotsTasksError = error.message;
                });
            }

        }
    };

}

export const store = new robotsTasksStore();
