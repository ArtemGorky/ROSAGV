import { TableColumnsType, Table, Button, Image, TableProps, TablePaginationConfig } from "antd";

import styles from "./RobotsHistoryTable.module.css";
import { tableScrollY } from "@/shared";
import { RobotsHistory } from "../../types";
import { observer } from "mobx-react-lite";
import { IntlShape } from "react-intl";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";

type Props = {
    intl: IntlShape;
    onChange: (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<RobotsHistory> | SorterResult<RobotsHistory>[],
        extra: TableCurrentDataSource<RobotsHistory>
    ) => void;
    isLoading: boolean;
    robotsHistory: RobotsHistory[];
    isMobile: boolean;
}

export const RobotsHistoryTable = observer(({ intl, isLoading, robotsHistory, isMobile = false, onChange }: Props) => {

    const columns: TableColumnsType<RobotsHistory> = isMobile
        ? [
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.title' }),
                dataIndex: "taskName",
                key: 'taskName',
                render: text => text
            },
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.robot' }),
                dataIndex: "robot_id",
                key: 'robot_id',
                render: text => text
            },
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.date' }),
                dataIndex: "date",
                key: 'date',
                render: text => text
            }
        ]
        : [
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.title' }),
                dataIndex: "taskName",
                key: 'taskName',
                render: text => text
            },
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.robot' }),
                dataIndex: "robot_id",
                key: 'robot_id',
                render: text => text
            },
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.date' }),
                dataIndex: "date",
                key: 'date',
                render: text => text
            },
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.pointName' }),
                dataIndex: "point_name",
                key: 'point_name',
                render: text => text
            },
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.task' }),
                dataIndex: "current_task",
                key: 'current_task',
                render: text => text
            },
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.rmsPoint' }),
                dataIndex: "rms_point",
                key: 'rms_point',
                render: text => text
            },
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.video' }),
                dataIndex: "video",
                key: 'video',
                render: strs => <div className={styles.imgBlock}>
                    {strs.map((str: string, index: number) => <Image key={index} className={styles.img} src={str} />)}
                </div>
            },
            {
                title: intl.formatMessage({ id: 'page.robotsHistory.table.action' }),
                key: 'action',
                render: _ => <Button type={"primary"}>{intl.formatMessage({ id: 'page.robotsHistory.setTegBtn.title' })}</Button>
            },
        ];

    return (
        <div className={styles.container}>
            <Table<RobotsHistory>
                dataSource={robotsHistory}
                columns={columns}
                scroll={{ y: tableScrollY }}
                loading={isLoading}
                onChange={onChange}
                pagination={false}
                showSorterTooltip={{ target: 'sorter-icon' }}
                className={styles.table}
            />
        </div>
    )
});