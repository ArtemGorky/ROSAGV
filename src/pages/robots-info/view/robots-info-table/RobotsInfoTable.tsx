import { IntlShape } from "react-intl";
import styles from "./RobotsInfoTable.module.css"
import { Progress, Table, TableColumnsType, TableProps } from "antd";
import { RobotsInfo, TablePaginationPosition } from "../../types";
import { getFilterListRobotsInfo, getStatusBatteryRobotsInfo, tableScrollY } from "@/shared";
import { observer } from "mobx-react-lite";
import { RobotsInfoStore } from "@/entities";
import {
    AlertOutlined,
    ApiOutlined,
    ArrowUpOutlined,
    CheckOutlined,
    CloseOutlined,
    ExclamationCircleOutlined,
    HeatMapOutlined,
    ThunderboltOutlined,
    ToolOutlined,
    WarningOutlined,
    WifiOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

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

    const columns: TableColumnsType<RobotsInfo> = [
        {
            title: intl.formatMessage({ id: 'page.robotsInfo.table.robot_id' }),
            dataIndex: ['robot', 'robot_id'],
            key: 'robot_id',
            fixed: 'left',
            width: isMobile ? 80 : "auto",
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
                        <ThunderboltOutlined className={`${styles.stateIcon} ${styles.stateIconHidden}`} />
                        <Progress
                            strokeColor={"#fff"}
                            className={
                                progressState === "exception"
                                    ? styles.exceptionProgress
                                    : styles.normalProgress
                            }
                            type={"circle"}
                            percent={obj.battery_level}
                            size={36}
                            status={progressState}
                        />
                    </span>
                    {obj.connected && <WifiOutlined title={"Подключен к сети"} className={styles.stateIcon} />}
                    {obj.battery_charging && <ApiOutlined title={"Зарядка"} className={styles.stateIcon} />}
                    {obj.manual && <ToolOutlined title={"Ручное управление"} className={styles.stateIcon} />}
                    {obj.obstacle && <ExclamationCircleOutlined title={"Препятствие"} className={styles.stateIcon} />}
                    {obj.forks_up && <ArrowUpOutlined title={"Вилы подняты"} className={styles.stateIcon} />}
                    {obj.pedal_pressed && <WarningOutlined title={"Педаль зажата"} className={styles.stateIcon} />}
                    {obj.traffic && <HeatMapOutlined title={"Остановлен траффик контролем"} className={styles.stateIcon} />}
                    {obj.active_task && <AlertOutlined title={"Имеет активную задачу"} className={styles.stateIcon} />}
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
            width: isMobile ? 80 : 'auto',
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
            scroll={{ y: tableScrollY }}
            loading={!currentInfo.length}
            onChange={onChange}
            pagination={paginationParams}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    </div>
});