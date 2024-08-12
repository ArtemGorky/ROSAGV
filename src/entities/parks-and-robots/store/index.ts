import { makeAutoObservable, runInAction } from "mobx";
import { getParksAndRobots } from "@/servises";
import { getParksAndRobotsStructuredData } from "@/shared/helpers";
import { IssueTypes, ParksAndRobotsTypes, ValueTypes } from "@/pages/parks-and-robots/types";

/*Добавить типы*/
// import { QueryParams, Todo } from "shared/api/todos/model";
/*Добавить типы*/

class ParksAndRobotsStore {
    parksAndRobots: ParksAndRobotsTypes[] = [];
    currentRobots: ParksAndRobotsTypes[] = [];

    isLoading: boolean = false;
    taskError: string = "";

    robotsName: ValueTypes[] = [];
    currentRobotName: string | null = null;

    robotsStatuses: ValueTypes[] = [];
    robotsCurrentStatuses: string[] = [];

    robotsTaskIds: ValueTypes[] = [];
    robotsCurrentTaskIds: string[] = [];

    isOpenDropdown: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    openingControl = (isOpen: boolean) => {
        this.isOpenDropdown = isOpen;
    }

    filterRobotsByTaskId = (taskIds: string[]) => {

        this.robotsCurrentTaskIds = taskIds;

        if (taskIds.length) {

            this.currentRobots = this.parksAndRobots.filter(robot => taskIds.includes(robot.task_id))
                .filter(robot => robot.name === this.currentRobotName || !this.currentRobotName)
                .filter(robot => this.robotsCurrentTaskIds.includes(robot.status) || !this.robotsCurrentStatuses.length)

        }
        else {

            this.currentRobots = this.parksAndRobots
                .filter(robot => robot.name === this.currentRobotName || !this.currentRobotName)
                .filter(robot => this.robotsCurrentTaskIds.includes(robot.status) || !this.robotsCurrentStatuses.length)
        }

    }

    filterRobotsByStatus = (status: string[]) => {

        this.robotsCurrentStatuses = status;

        if (status.length) {

            this.currentRobots = this.parksAndRobots.filter(robot => status.includes(robot.status))
                .filter(robot => robot.name === this.currentRobotName || !this.currentRobotName)
                .filter(robot => this.robotsCurrentTaskIds.includes(robot.task_id) || !this.robotsCurrentTaskIds.length)

        }
        else {

            this.currentRobots = this.parksAndRobots
                .filter(robot => robot.name === this.currentRobotName || !this.currentRobotName)
                .filter(robot => this.robotsCurrentTaskIds.includes(robot.task_id) || !this.robotsCurrentTaskIds.length)
        }

    }

    filterRobotsByName = (name: string | null) => {

        const currentName = this.robotsName.find(obj => obj.value === name);

        if (name && currentName) {

            this.currentRobots = this.parksAndRobots.filter(robot => robot.name === name)
                .filter(robot => this.robotsCurrentStatuses.includes(robot.status) || !this.robotsCurrentStatuses.length)
                .filter(robot => this.robotsCurrentTaskIds.includes(robot.task_id) || !this.robotsCurrentTaskIds.length)

            this.currentRobotName = name;
        }

        if (name === null) {

            this.currentRobots = this.parksAndRobots
                .filter(robot => this.robotsCurrentStatuses.includes(robot.status) || !this.robotsCurrentStatuses.length)
                .filter(robot => this.robotsCurrentTaskIds.includes(robot.task_id) || !this.robotsCurrentTaskIds.length)

            this.currentRobotName = null;
        }
    }

    getParksAndRobotsData = async () => {
        try {
            this.isLoading = true;

            const data = await getParksAndRobots();

            const robots = Object.keys(data.robots).map(key => data.robots[key]);

            const names = robots.map(robot => ({ value: robot.name }));

            const statuses = [...new Set(robots.map(robot => (robot.status)))].map(status => ({ value: status }));

            const taskIdis = [...new Set(robots.map(robot => (robot.task_id)))].map(taskId => ({ value: taskId }));


            const structuredData = getParksAndRobotsStructuredData(data.robots);


            runInAction(() => {
                this.robotsName = names;
                this.robotsStatuses = statuses;
                this.robotsTaskIds = taskIdis;

                this.isLoading = false;
                this.parksAndRobots = structuredData;
                this.currentRobots = structuredData;
            });

        } catch (error) {

            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.taskError = error.message;
                });
            }

        }
    };

}

export const store = new ParksAndRobotsStore();
