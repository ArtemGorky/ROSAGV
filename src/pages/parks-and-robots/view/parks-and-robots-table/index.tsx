import { Spin, Table } from 'antd';
import { useEffect } from 'react';
import { parksAndRobotsStore } from '@/entities';
import { observer } from "mobx-react-lite";
import { IntlProps, IssueTypes } from '../../types';

export const ParksAndRobotsTable = observer(({ intl }: IntlProps) => {

    const {
        store: { currentRobots, isLoading, getParksAndRobotsData },
    } = parksAndRobotsStore;

    const columns = [
        {
            title: intl.formatMessage({ id: 'page.parksAndRobots.table.name' }),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: intl.formatMessage({ id: 'page.parksAndRobots.table.status' }),
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: intl.formatMessage({ id: 'page.parksAndRobots.table.task_id' }),
            dataIndex: 'task_id',
            key: 'task_id',
        },
        {
            title: intl.formatMessage({ id: 'page.parksAndRobots.table.unix_millis_time' }),
            dataIndex: 'unix_millis_time',
            key: 'unix_millis_time',
        },
        {
            title: intl.formatMessage({ id: 'page.parksAndRobots.table.battery' }),
            dataIndex: 'battery',
            key: 'battery',
        },
        {
            title: intl.formatMessage({ id: 'page.parksAndRobots.table.issues' }),
            dataIndex: 'issues',
            key: 'issues',
            render: (_: string, record: { issues: IssueTypes[] }) => {

                return <div>{record.issues.map((issue: IssueTypes, index: number) => {

                    return (
                        <div key={index}>
                            <div>{issue.category}</div>
                            <div>{issue.detail.message}</div>
                        </div>
                    );

                })}</div>
            },
        },
    ];

    useEffect(() => {

        getParksAndRobotsData();

    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return <Table dataSource={currentRobots} columns={columns} />

});
