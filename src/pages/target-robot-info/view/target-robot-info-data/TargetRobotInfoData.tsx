import { IntlProps } from "../../types";
import { observer } from "mobx-react-lite";
import { TargetRobotInfoContent } from "../target-robot-info-content/TargetRobotInfoContent";
import { closeConnectionDelay, getStatusBatteryRobotsInfo } from "@/shared";

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import { RobotsInfoStore } from "@/entities";
import { BasicModal } from "@/ui";


export const TargetRobotInfoData = observer(({ intl }: IntlProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const {
        store: {
            currentRobotInfo, targetRobotInfoSocket, robotsTargetTask, isTasksDisabled, robotsInfoStartSocketConnection,
            setCurrentRobotId, getRobotsTargetTaskData, setIsTasksDisabled
        },
    } = RobotsInfoStore;

    const closeConnection = () => {
        targetRobotInfoSocket?.close();
    }

    useEffect(() => {
        !location.state?.id && navigate("/scenes/robots-info");

        setCurrentRobotId(location.state?.id);

        robotsInfoStartSocketConnection();

        return (() => {
            setCurrentRobotId(null);
        });
    }, []);

    useEffect(() => {
        return (() => {
            setTimeout(() => {
                !document.location.pathname.includes("robots-info") && closeConnection();
            }, closeConnectionDelay);
        });
    }, [targetRobotInfoSocket]);


    useEffect(() => {

        currentRobotInfo?.latest_status.current_task_id &&
            getRobotsTargetTaskData(currentRobotInfo?.latest_status.current_task_id, intl.locale);

    }, [currentRobotInfo?.latest_status.current_task_id]);


    const progressState = getStatusBatteryRobotsInfo(currentRobotInfo?.latest_status.battery_level);

    const tasksDisableHandler = () => {
        setIsTasksDisabled(false);
    }

    const taskCancellationHandler = () => {
        setIsTasksDisabled(false);
    }

    return (
        <>
            <TargetRobotInfoContent
                intl={intl}
                robotsTargetTask={robotsTargetTask}
                currentRobotInfo={currentRobotInfo}
                progressState={progressState}
                setIsTasksDisabled={setIsTasksDisabled}
            />
            <BasicModal
                title={intl.formatMessage({ id: 'page.targetRobotInfo.modalTitle' })}
                content={intl.formatMessage({ id: 'page.targetRobotInfo.modalContent' })}
                isOpen={isTasksDisabled}
                handleOk={tasksDisableHandler}
                handleCancel={taskCancellationHandler}
            />
        </>
    );
});