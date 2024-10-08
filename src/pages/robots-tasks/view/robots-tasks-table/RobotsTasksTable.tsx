import { Table, TableColumnsType, Tooltip } from 'antd';
import { observer } from "mobx-react-lite";
import { RobotsTasks, TaskState } from '../../types';
import { tableScrollX, tableScrollY } from '@/shared';
import { IntlShape } from 'react-intl';

import styles from "./RobotsTasksTable.module.css";
import { getTasksStatusLocale } from '@/shared/helpers';
import { colors } from '@/shared/constants';

import { useNavigate } from "react-router-dom";
import { useDeviceDetect } from '@/hooks';

type RobotsTasksTableProps = {
    currentTasks: RobotsTasks[];
    isLoading: boolean;
    intl: IntlShape;
}

export const RobotsTasksTable = observer(({ currentTasks, intl, isLoading }: RobotsTasksTableProps) => {

    const navigate = useNavigate();

    const { isMobile } = useDeviceDetect();

    const columns: TableColumnsType<RobotsTasks> = isMobile
        ? [
            {
                width: 110,
                title: intl.formatMessage({ id: 'page.robotsTasks.table.name' }),
                dataIndex: 'name',
                key: 'name',
                render: text => text ?? "_____",
            },

            {
                width: 110,
                title: intl.formatMessage({ id: 'page.robotsTasks.table.task_state' }),
                dataIndex: 'task_state',
                key: 'task_state',
                fixed: 'right',
                render: (task: TaskState) => {
                    if (task) {
                        return <>
                            <div>
                                <Tooltip
                                    color={"rgb(43, 52, 66)"}
                                    title={
                                        <>
                                            <span>Статус: </span>
                                            <span> {task?.state ?? "_____"} </span>
                                            <div>
                                                <span>Время: </span>
                                                < span > {task?.timestamp ?? "_____"
                                                }</span>
                                            </div>
                                            < div >
                                                <span>ID робота: </span>
                                                < span > {task?.robot_id ?? "_____"
                                                } </span>
                                            </div>
                                            < div >
                                                <span>Время начала: </span>
                                                < span > {task?.start_time ?? "_____"}</span>
                                            </div>
                                            < div >
                                                <span>Время завершения: </span>
                                                < span > {task?.end_time ?? "_____"}</span>
                                            </div>
                                            < div >
                                                <span>Код ошибки: </span>
                                                < span > {task?.error_code === "" || !task?.error_code ? "отсутствует" : task?.error_code}</span>
                                            </div>
                                        </>
                                    }
                                >
                                    <span>
                                        <span
                                            style={{ backgroundColor: `#${colors[task?.state ?? 6]}` }}
                                            className={styles.roundIndicator}
                                        >
                                        </span>
                                    </span>
                                    <span>{getTasksStatusLocale(intl, task?.state ?? 6) ?? "_____"}</span>
                                </Tooltip>

                            </div>
                        </>
                    }
                    else {
                        return "_____"
                    }
                }
            },

            {
                width: 80,
                title: intl.formatMessage({ id: 'page.robotsTasks.table.min_start_time' }),
                dataIndex: 'min_start_time',
                key: 'min_start_time',
                render: text => text ?? "_____",
            },
        ]
        : [
            {
                title: intl.formatMessage({ id: 'page.robotsTasks.table.name' }),
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                render: text => text ?? "_____"
            },
            {
                title: intl.formatMessage({ id: 'page.robotsTasks.table.task_id' }),
                dataIndex: 'task_id',
                key: 'task_id',
                render: text => text ? <Tooltip color={"rgb(43, 52, 66)"} title={text} >
                    <p className={styles.tooltipTableText} > {text} </p>
                </Tooltip> : "_____"
            },
            {
                title: intl.formatMessage({ id: 'page.robotsTasks.table.command' }),
                dataIndex: 'command',
                key: 'command',
                render: text => text ?? "_____"
            },
            {
                title: intl.formatMessage({ id: 'page.robotsTasks.table.robot_id' }),
                dataIndex: 'robot_id',
                key: 'robot_id',
                render: text => text ?? "_____"
            },
            {
                title: intl.formatMessage({ id: 'page.robotsTasks.table.min_start_time' }),
                dataIndex: 'min_start_time',
                key: 'min_start_time',
                render: text => text ?? "_____"
            },
            {
                title: intl.formatMessage({ id: 'page.robotsTasks.table.wrapping_required' }),
                dataIndex: 'wrapping_required',
                key: 'wrapping_required',
                render: text => text
                    ? intl.formatMessage({ id: 'page.robotsTasks.card.packagingRequired.packagingRequired' })
                    : intl.formatMessage({ id: 'page.robotsTasks.card.packagingRequired.noPackagingRequired' })
            },
            {
                title: intl.formatMessage({ id: 'page.robotsTasks.table.task_state' }),
                dataIndex: 'task_state',
                key: 'task_state',
                fixed: 'right',
                render: (task: TaskState) => {
                    if (task) {
                        return <>
                            <div>
                                <Tooltip
                                    color={"rgb(43, 52, 66)"}
                                    title={
                                        <>
                                            <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.status' })}: </span>
                                            <span> {task?.state ?? "_____"} </span>
                                            <div>
                                                <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.time' })}: </span>
                                                < span > {task?.timestamp ?? "_____"
                                                }</span>
                                            </div>
                                            < div >
                                                <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.robotId' })}: </span>
                                                < span > {task?.robot_id ?? "_____"
                                                } </span>
                                            </div>
                                            < div >
                                                <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.startTime' })}: </span>
                                                < span > {task?.start_time ?? "_____"}</span>
                                            </div>
                                            < div >
                                                <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.endTime' })}: </span>
                                                < span > {task?.end_time ?? "_____"}</span>
                                            </div>
                                            < div >
                                                <span>{intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.errorCode' })}: </span>
                                                < span > {task?.error_code === "" || !task?.error_code
                                                    ? intl.formatMessage({ id: 'page.robotsTasks.cardTooltip.missingErrorCode' })
                                                    : task?.error_code}</span>
                                            </div>
                                        </>
                                    }
                                >
                                    <span>
                                        <span
                                            style={{ backgroundColor: `#${colors[task?.state ?? 6]}` }}
                                            className={styles.roundIndicator}
                                        >
                                        </span>
                                    </span>
                                    <span>{getTasksStatusLocale(intl, task?.state ?? 6) ?? "_____"}</span>
                                </Tooltip>

                            </div>
                        </>
                    }
                    else {
                        return "_____"
                    }
                }
            },
        ];

    const rowClickHandler = (taskId: string) => navigate("/scenes/robots-tasks/task", { state: { id: taskId } });

    return (
        <div className={styles.tableContainer}>
            <Table<RobotsTasks>
                onRow={(record) => {
                    return {
                        onClick: () => {
                            rowClickHandler(record.task_id);
                        },
                    };
                }}
                className={styles.tableRoot}
                dataSource={currentTasks}
                columns={columns}
                scroll={{ x: isMobile ? null : tableScrollX, y: tableScrollY }}
                loading={isLoading}
                pagination={false}
            />
        </div>

    );

});
