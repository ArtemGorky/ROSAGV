import { Card, Spin, Tooltip } from 'antd';
import { observer } from "mobx-react-lite";
import { RobotsTasks } from '../../types';
import { IntlShape } from 'react-intl';
import { colors } from '@/shared/constants';
import { getTasksStatusLocale } from '@/shared/helpers';
import { useNavigate } from "react-router-dom";

import styles from "./RobotsTasksCards.module.css";
import { MouseEvent } from 'react';

type RobotsTasksCardsProps = {
    currentTasks: RobotsTasks[];
    isLoading: boolean;
    intl: IntlShape;
}

export const RobotsTasksCards = observer(({ currentTasks, intl, isLoading }: RobotsTasksCardsProps) => {
    const navigate = useNavigate();

    const cardClickHandler = (taskId: string) =>
        (_: MouseEvent<HTMLDivElement>) => navigate("/scenes/robots-tasks/task", { state: { id: taskId } });

    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70%' }}>
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div className={styles.cardsContainer}>
            {
                currentTasks.map((task: RobotsTasks, index: number) => {
                    return (
                        <Card
                            title={
                                <div className={styles.cardTitle}>{task.name ?? "_____"}</div>
                            }
                            style={{
                                border: `1px solid #${colors[task?.task_state.state]}`
                            }}
                            className={styles.card}
                            key={index}
                            onClick={cardClickHandler(task.task_id)}
                        >
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span>
                                    {intl.formatMessage({ id: 'page.robotsTasks.table.task_id' })}:
                                </span>
                                <span>
                                    {task.task_id ? <Tooltip color={"rgb(43, 52, 66)"} title={task.task_id} >
                                        <div className={styles.tooltipCardTaskId}>{task.task_id}</div>
                                    </Tooltip> : "_____"}
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span>
                                    {intl.formatMessage({ id: 'page.robotsTasks.table.command' })}:
                                </span>
                                <span>
                                    {task.command ?? "_____"}
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span>
                                    {intl.formatMessage({ id: 'page.robotsTasks.table.robot_id' })}:
                                </span>
                                <span>
                                    {task.robot_id ?? "_____"}
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span>
                                    {intl.formatMessage({ id: 'page.robotsTasks.table.targets' })}:
                                </span>
                                <span>
                                    {task.targets?.length
                                        ? task.targets.map((str: string, index: number) => {
                                            return <span key={index}>{str ?? "_____"}&nbsp;</span>
                                        })
                                        : "_____"}
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span>
                                    {intl.formatMessage({ id: 'page.robotsTasks.table.min_start_time' })}:
                                </span>
                                <span>
                                    {task.min_start_time ?? "_____"}
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span>
                                    {intl.formatMessage({ id: 'page.robotsTasks.table.wrapping_required' })}:
                                </span>
                                <span>
                                    {
                                        task.wrapping_required
                                            ? intl.formatMessage({ id: 'page.robotsTasks.card.packagingRequired.packagingRequired' })
                                            : intl.formatMessage({ id: 'page.robotsTasks.card.packagingRequired.noPackagingRequired' })
                                    }
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span>
                                    {intl.formatMessage({ id: 'page.robotsTasks.table.task_state' })}:
                                </span>
                                <span>
                                    <Tooltip
                                        color={"rgb(43, 52, 66)"}
                                        title={
                                            <>
                                                <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.status' })}: </span>
                                                <span> {task.task_state?.state ?? "_____"} </span>
                                                <div>
                                                    <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.time' })}: </span>
                                                    < span > {task.task_state?.timestamp ?? "_____"
                                                    }</span>
                                                </div>
                                                < div >
                                                    <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.robotId' })}: </span>
                                                    < span > {task?.robot_id ?? "_____"
                                                    } </span>
                                                </div>
                                                < div >
                                                    <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.startTime' })}: </span>
                                                    < span > {task.task_state?.start_time ?? "_____"}</span>
                                                </div>
                                                < div >
                                                    <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.endTime' })}: </span>
                                                    < span > {task.task_state?.end_time ?? "_____"}</span>
                                                </div>
                                                < div >
                                                    <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.errorCode' })}: </span>
                                                    < span >
                                                        {task.task_state?.error_code === "" || !task.task_state?.error_code
                                                            ? intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.missingErrorCode' })
                                                            : task.task_state?.error_code}</span>
                                                </div>
                                            </>
                                        }
                                    >
                                        {(getTasksStatusLocale(intl, task?.task_state.state ?? 6)) ?? "_____"}
                                    </Tooltip>
                                </span>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    )
});
