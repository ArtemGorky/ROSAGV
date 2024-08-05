import { makeAutoObservable, runInAction } from "mobx";
import { getParksAndRobots } from "@/servises";
import { getParksAndRobotsStructuredData } from "@/shared/helpers";

/*Добавить типы*/
// import { QueryParams, Todo } from "shared/api/todos/model";
/*Добавить типы*/

class ParksAndRobotsStore {
    parksAndRobots: any[] = [];
    currentRobots: any[] = [];
    robots?: any;
    isLoading = false;
    taskListError = "";
    taskError = "";
    isUpdateLoading = false;

    robotsName = [];

    constructor() {
        makeAutoObservable(this);
    }

    filterRobotsByName = (name: string) => {
        if (name) {
            this.currentRobots = Object.keys(this.parksAndRobots).map(key => {
                if (this.parksAndRobots[key]["name"] === name) {
                    return this.parksAndRobots[key]
                }
            }).filter(item => item);
        }
    }

    getParksAndRobotsData = async () => {
        try {
            this.isLoading = true;

            const data = await getParksAndRobots();

            const robots = Object.keys(data.robots).map(key => data.robots[key]);

            const names = robots.map(robot => ({ value: robot.name }));


            const structuredData = getParksAndRobotsStructuredData(data);


            runInAction(() => {
                this.robotsName = names;

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
