import { IntlProps } from "../../types";
import { observer } from "mobx-react-lite";
import { RobotTasksPagination } from "../robot-tasks-pagination/RobotTasksPagination";
import { WithRobotsTasksCards } from "../../hoc/WithRobotsTasksCards";
import { WithRobotsTasksTable } from "../../hoc/WithRobotsTasksTable";
import { robotsTasksStore } from "@/entities";
import { useDeviceDetect } from "@/hooks";

// import styles from "./TasksContent.module.css";

export const TasksContent = observer(({ intl }: IntlProps) => {

    const { isMobile } = useDeviceDetect();

    const {
        store: {
            isTableTaskContent
        },
    } = robotsTasksStore;

    return <>
        {
            isTableTaskContent
                ? <>
                    {isMobile && <RobotTasksPagination intl={intl} />}
                    <WithRobotsTasksTable intl={intl} />
                    {!isMobile && <RobotTasksPagination intl={intl} />}

                </>
                : <>
                    <RobotTasksPagination intl={intl} />
                    <WithRobotsTasksCards intl={intl} />
                </>
        }
    </>
});