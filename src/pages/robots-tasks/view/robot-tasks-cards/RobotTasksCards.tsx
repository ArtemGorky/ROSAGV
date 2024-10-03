import { Card, Flex, Spin, Table, TableColumnsType, Tooltip } from 'antd';
import { observer } from "mobx-react-lite";
import { RobotsTasks, TaskState } from '../../types';
import { tableScrollX, tableScrollY } from '@/shared';
import { IntlShape } from 'react-intl';

import styles from "./RobotsTasksCards.module.css";
import { colors } from '@/shared/constants';
import { getTasksStatusLocale } from '@/shared/helpers';

type RobotsTasksCardsProps = {
    currentTasks: RobotsTasks[];
    isLoading: boolean;
    intl: IntlShape;
}

export const RobotsTasksCards = observer(({ currentTasks, intl, isLoading }: RobotsTasksCardsProps) => {

    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70%' }}>
                <Spin size="large" />
            </div>
        )
    }

    return (
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
                            {task.wrapping_required ? "Да" : "Нет"}
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
                                        <span>Статус: </span>
                                        <span> {task.task_state?.state ?? "_____"} </span>
                                        <div>
                                            <span>Время: </span>
                                            < span > {task.task_state?.timestamp ?? "_____"
                                            }</span>
                                        </div>
                                        < div >
                                            <span>ID робота: </span>
                                            < span > {task?.robot_id ?? "_____"
                                            } </span>
                                        </div>
                                        < div >
                                            <span>Время начала: </span>
                                            < span > {task.task_state?.start_time ?? "_____"}</span>
                                        </div>
                                        < div >
                                            <span>Время завершения: </span>
                                            < span > {task.task_state?.end_time ?? "_____"}</span>
                                        </div>
                                        < div >
                                            <span>Код ошибки: </span>
                                            < span >
                                                {task.task_state?.error_code === "" || !task.task_state?.error_code
                                                    ? "отсутствует"
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
    )
});
