import { IntlProps } from "../../types";
import { observer } from "mobx-react-lite";
import { RobotTasksPagination } from "../robot-tasks-pagination/RobotTasksPagination";
import { WithRobotsTasksCards } from "../../hoc/WithRobotsTasksCards";
import { WithRobotsTasksTable } from "../../hoc/WithRobotsTasksTable";
import { robotsTasksStore } from "@/entities";

// import styles from "./TasksContent.module.css";

export const TasksContent = observer(({ intl }: IntlProps) => {

    const {
        store: {
            isTableTaskContent
        },
    } = robotsTasksStore;

    return <>
        {
            isTableTaskContent
                ? <>
                    <WithRobotsTasksTable intl={intl} />
                    <RobotTasksPagination intl={intl} />
                </>
                : <>
                    <RobotTasksPagination intl={intl} />
                    <WithRobotsTasksCards intl={intl} />
                </>
        }
    </>
});