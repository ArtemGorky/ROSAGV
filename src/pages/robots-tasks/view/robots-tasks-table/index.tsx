import { Spin, Table, TableColumnsType } from 'antd';
import { useEffect } from 'react';
import { robotsTasksStore } from '@/entities';
import { observer } from "mobx-react-lite";
import { IntlProps, RobotsTasksDataType } from '../../types';

export const RobotsTasksTable = observer(({ intl }: IntlProps) => {

    const {
        store: { isLoading, currentTasks, getRobotsTasksData },
    } = robotsTasksStore;

    const tableScrollX = 2400;

    const columns: TableColumnsType<RobotsTasksDataType> = [
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.taskId' }),
            dataIndex: 'taskId',
            key: 'taskId',
            fixed: 'left',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.requestTime' }),
            dataIndex: 'requestTime',
            key: 'requestTime',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.requester' }),
            dataIndex: 'requester',
            key: 'requester',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.category' }),
            dataIndex: 'category',
            key: 'category',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.assignedToGroup' }),
            dataIndex: 'assignedToGroup',
            key: 'assignedToGroup',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.assignedToName' }),
            dataIndex: 'assignedToName',
            key: 'assignedToName',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.status' }),
            dataIndex: 'status',
            key: 'status',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.dispatchStatus' }),
            dataIndex: 'dispatchStatus',
            key: 'dispatchStatus',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.expectedRobotName' }),
            dataIndex: 'expectedRobotName',
            key: 'expectedRobotName',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.taskStartTime' }),
            dataIndex: 'taskStartTime',
            key: 'taskStartTime',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.taskFinishTime' }),
            dataIndex: 'taskFinishTime',
            key: 'taskFinishTime',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.originalEstimateMillis' }),
            dataIndex: 'originalEstimateMillis',
            key: 'originalEstimateMillis',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.estimateMillis' }),
            dataIndex: 'estimateMillis',
            key: 'estimateMillis',
            render: text => text ?? "_____"
        },
        {
            title: intl.formatMessage({ id: 'page.robotsTasks.table.errors' }),
            dataIndex: 'errors',
            key: 'errors',
            fixed: 'right',
            render: obj => {
                if (obj?.length) {
                    return obj.map((err: { code: string, category: string, detail: string }, index: number) => {
                        return <div key={index}>
                            <div>
                                <span>code: </span>
                                <span>{err?.code ?? "_____"}</span>
                            </div>
                            <div>
                                <span>category: </span>
                                <span>{err?.category ?? "_____"}</span>
                            </div>
                            <div>
                                <span>detail: </span>
                                <span>{err?.detail ?? "_____"}</span>
                            </div>
                            <br />
                        </div>
                    })
                }
                else {
                    return "_____"
                }
            }
        },
    ];

    useEffect(() => {

        getRobotsTasksData();

    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return <Table dataSource={currentTasks} columns={columns} scroll={{ x: tableScrollX }} />

});
