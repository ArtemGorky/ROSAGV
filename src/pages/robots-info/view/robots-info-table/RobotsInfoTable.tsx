import { IntlShape } from "react-intl";
import styles from "./RobotsInfoTable.module.css"
import { Progress, Table, TableColumnsType, TableProps } from "antd";
import { RobotsInfo } from "../../types";
import {
    ActiveIcon,
    ArrowUpIcon,
    BarrierIcon,
    ChargeIcon,
    ConnectIcon,
    getFilterListRobotsInfo,
    getStatusBatteryRobotsInfo,
    HandIcon,
    PedalIcon,
    tableScrollX,
    tableScrollY,
    TrafficLightsIcon
} from "@/shared";
import { observer } from "mobx-react-lite";
import { RobotsInfoStore } from "@/entities";
import {
    CheckOutlined,
    CloseOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { TablePaginationPosition } from "@/shared/types";

type RobotsInfoTableProps = {
    intl: IntlShape;
    currentInfo: RobotsInfo[];
    isMobile: boolean;
    isLoading?: boolean;
}

export const RobotsInfoTable = observer(({ intl, isMobile, currentInfo, isLoading = false }: RobotsInfoTableProps) => {

    const {
        store: {
            robotsInfoPageSize, setRobotsInfoPageSize, setCurrentRobotId
        },
    } = RobotsInfoStore;

    const navigate = useNavigate();

    const columns: TableColumnsType<RobotsInfo> = isMobile ? [
        {
            title: intl.formatMessage({ id: 'page.robotsInfo.table.robot_id' }),
            dataIndex: ['robot', 'robot_id'],
            key: 'robot_id',
            fixed: 'left',
            width: 80,
            filters: currentInfo.map(obj => ({
                text: obj.robot.robot_id,
                value: obj.robot.robot_id,
            })),
            render: (text, record) =>
                <div>
                    <span>
                        <span
                            style={{ backgroundColor: record.latest_status.connected ? "#4f0" : "#f40" }}
                            className={styles.roundIndicator}
                        >
                        </span>
                    </span>
                    <span>{text ?? "_____"}</span>
                </div>,
            onFilter: (value, record) => record.robot.robot_id.indexOf(value as string) === 0,
            filterSearch: true,
        },
        {
            title: intl.formatMessage({ id: 'page.robotsInfo.table.state' }),
            dataIndex: 'latest_status',
            key: 'latest_status',
            filters: getFilterListRobotsInfo(intl).map(obj => ({
                text: obj.text,
                value: obj.value,
                children: [
                    {
                        text: <CheckOutlined />,
                        value: `${obj.value}-true`,
                    },
                    {
                        text: <CloseOutlined />,
                        value: `${obj.value}-false`,
                    },
                ],
            })),
            render: obj => {

                const progressState = getStatusBatteryRobotsInfo(obj.battery_level);

                return <>
                    <span title={`${obj.battery_level}% заряда`} className={styles.progressBlock}>
                        <HandIcon
                            iconClass={`${styles.iconContainer} ${styles.stateIconHidden}`}
                            size={"42"}
                        />
                        <Progress
                            strokeColor={"#fff"}
                            className={
                                progressState === "exception"
                                    ? styles.exceptionProgress
                                    : styles.normalProgress
                            }
                            type={"circle"}
                            percent={obj.battery_level}
                            size={40}
                            status={progressState}
                        />
                    </span>
                    {obj.connected && <ConnectIcon title={"Подключен к сети"} iconClass={styles.iconContainer} size={"42"} />}
                    {obj.battery_charging && <ChargeIcon title={"Зарядка"} iconClass={styles.iconContainer} size={"42"} />}
                    {obj.manual && <HandIcon title={"Ручное управление"} iconClass={styles.iconContainer} size={"42"} />}
                    {obj.obstacle && <BarrierIcon title={"Препятствие"} iconClass={styles.iconContainer} size={"42"} />}
                    {obj.forks_up && <ArrowUpIcon title={"Вилы подняты"} iconClass={styles.iconContainer} size={"42"} />}
                    {obj.pedal_pressed && <PedalIcon title={"Педаль зажата"} iconClass={styles.iconContainer} size={"42"} />}
                    {obj.traffic && <TrafficLightsIcon title={"Остановлен траффик контролем"} iconClass={styles.iconContainer} size={"42"} />}
                    {obj.active_task && <ActiveIcon title={"Имеет активную задачу"} iconClass={styles.iconContainer} size={"42"} />}
                </>
            },
            onFilter: (value: string, record) => {

                const key = value.split("-")[0];

                return value.includes("true") ? record.latest_status[key] : !record.latest_status[key]
            }
        },
        {
            title: intl.formatMessage({ id: 'page.robotsInfo.table.charge_threshold' }),
            dataIndex: ['robot', 'charge_threshold'],
            key: 'charge_threshold',
            fixed: 'right',
            width: 80,
            render: text => text ? `${text}%` : "_____",
            sorter: (a, b) => a.robot.charge_threshold - b.robot.charge_threshold,
        },
    ]
        : [
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.table.robot_id' }),
                dataIndex: ['robot', 'robot_id'],
                key: 'robot_id',
                fixed: 'left',
                filters: currentInfo.map(obj => ({
                    text: obj.robot.robot_id,
                    value: obj.robot.robot_id,
                })),
                render: (text, record) =>
                    <div>
                        <span>
                            <span
                                style={{ backgroundColor: record.latest_status.connected ? "#4f0" : "#f40" }}
                                className={styles.roundIndicator}
                            >
                            </span>
                        </span>
                        <span>{text ?? "_____"}</span>
                    </div>,
                onFilter: (value, record) => record.robot.robot_id.indexOf(value as string) === 0,
                filterSearch: true,
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.tableHeaders.charging_percentage' }),
                dataIndex: ['latest_status', 'battery_level'],
                key: 'battery_level',
                render: text => `${text}%`
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.tableHeaders.connected' }),
                dataIndex: ['latest_status', 'connected'],
                key: 'connected',
                render: text => text ? <CheckOutlined className={styles.stateIcon} /> : <CloseOutlined className={styles.stateIcon} />
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.tableHeaders.battery_charging' }),
                dataIndex: ['latest_status', 'battery_charging'],
                key: 'battery_charging',
                render: text => text ? <CheckOutlined className={styles.stateIcon} /> : <CloseOutlined className={styles.stateIcon} />
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.tableHeaders.manual' }),
                dataIndex: ['latest_status', 'manual'],
                key: 'manual',
                render: text => text ? <CheckOutlined className={styles.stateIcon} /> : <CloseOutlined className={styles.stateIcon} />
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.tableHeaders.obstacle' }),
                dataIndex: ['latest_status', 'obstacle'],
                key: 'obstacle',
                render: text => text ? <CheckOutlined className={styles.stateIcon} /> : <CloseOutlined className={styles.stateIcon} />
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.tableHeaders.forks_up' }),
                dataIndex: ['latest_status', 'forks_up'],
                key: 'forks_up',
                render: text => text ? <CheckOutlined className={styles.stateIcon} /> : <CloseOutlined className={styles.stateIcon} />
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.tableHeaders.pedal_pressed' }),
                dataIndex: ['latest_status', 'pedal_pressed'],
                key: 'pedal_pressed',
                render: text => text ? <CheckOutlined className={styles.stateIcon} /> : <CloseOutlined className={styles.stateIcon} />
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.tableHeaders.traffic' }),
                dataIndex: ['latest_status', 'traffic'],
                key: 'traffic',
                render: text => text ? <CheckOutlined className={styles.stateIcon} /> : <CloseOutlined className={styles.stateIcon} />
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.tableHeaders.active_task' }),
                dataIndex: ['latest_status', 'active_task'],
                key: 'active_task',
                render: text => text ? <CheckOutlined className={styles.stateIcon} /> : <CloseOutlined className={styles.stateIcon} />
            },
            {
                title: intl.formatMessage({ id: 'page.robotsInfo.table.charge_threshold' }),
                dataIndex: ['robot', 'charge_threshold'],
                key: 'charge_threshold',
                fixed: 'right',
                render: text => text ? `${text}%` : "_____",
                sorter: (a, b) => a.robot.charge_threshold - b.robot.charge_threshold,
            },
        ];

    const paginationParams = {
        pageSize: robotsInfoPageSize,
        position: ['topRight'] as TablePaginationPosition[],
        showQuickJumper: !isMobile,
        showSizeChanger: !isMobile,
        showTotal: isMobile
            ? () => ""
            : () => `${intl.formatMessage({ id: 'page.robotsInfo.pagination.total' })}
            ${Math.ceil(currentInfo.length / robotsInfoPageSize)}
            ${intl.formatMessage({ id: 'page.robotsInfo.pagination.page' })}`
    }

    const onChange: TableProps<RobotsInfo>['onChange'] = (pagination) => {
        pagination.pageSize !== robotsInfoPageSize && setRobotsInfoPageSize(pagination.pageSize);
    };

    const rowClickHandler = (id: string) => {
        setCurrentRobotId(id);
        navigate("/scenes/robots-info/robot", { state: { id } });
    }

    return <div className={styles.tableContainer}>
        <Table<RobotsInfo>
            onRow={(record) => {
                return {
                    onClick: () => {
                        rowClickHandler(record.robot.robot_id);
                    },
                };
            }}
            dataSource={currentInfo}
            columns={columns}
            scroll={{ x: isMobile ? null : tableScrollX, y: tableScrollY }}
            loading={!currentInfo.length}
            onChange={onChange}
            pagination={paginationParams}
            showSorterTooltip={{ target: 'sorter-icon' }}
            className={styles.table}
        />
    </div>
});