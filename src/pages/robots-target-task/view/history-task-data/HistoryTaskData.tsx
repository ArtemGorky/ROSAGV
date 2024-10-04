import { IntlShape } from "react-intl";
import { Skeleton, Table, Typography } from 'antd';

import styles from "./HistoryTaskData.module.css"
import { RobotsTargetTaskState } from "../../types";
import { colors } from "@/shared/constants";
import { getTasksStatusLocale } from "@/shared/helpers";
import { RobotsTargetTaskStore } from "@/entities";
import { observer } from "mobx-react-lite";

const { Title } = Typography;

type Props = {
    intl: IntlShape;
}

export const HistoryTaskData = observer(({ intl }: Props) => {

    const {
        store: {
            robotsTargetTaskHistory
        },
    } = RobotsTargetTaskStore;

    const dataSource = robotsTargetTaskHistory.map((obj, index) => ({
        key: index,
        timestamp: obj.timestamp,
        state: obj.state,
        robot_id: obj.robot_id,
        error_code: obj.error_code
    }));

    const columns = [
        {
            title: 'Дата',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (text: string) => text ?? "_____"
        },
        {
            title: 'Статус',
            dataIndex: 'state',
            key: 'state',
            render: (num: number) => {

                return <div>
                    <span
                        style={{ backgroundColor: `#${colors[num ?? 6]}` }}
                        className={styles.roundIndicator}
                    ></span>
                    <span>{getTasksStatusLocale(intl, num ?? 6) ?? "_____"}</span>
                </div>

            }
        },
        {
            title: 'ID робота',
            dataIndex: 'robot_id',
            key: 'robot_id',
            render: (text: string) => text ?? "_____"
        },
        {
            title: 'Код ошибки',
            dataIndex: 'error_code',
            key: 'error_code',
            render: (text: string) => text !== "" && text !== null ? text : "_____"

        },
    ];


    return <>
        {
            robotsTargetTaskHistory?.length
                ? <Table rootClassName={styles.rootTable} pagination={false} dataSource={dataSource} columns={columns} />
                : <Skeleton.Node
                    rootClassName={styles.skeletonNode}
                    style={{ width: "485px", height: "35vh" }}
                    active={true}
                />
        }
    </>
});