import { observer } from "mobx-react-lite";
import { Descriptions, Progress, Typography, DescriptionsProps, Button, Skeleton, Card } from 'antd';

import styles from "./TargetRobotInfoContent.module.css";

import {
    AlertOutlined,
    ApiOutlined,
    ArrowUpOutlined,
    ExclamationCircleOutlined,
    HeatMapOutlined,
    ToolOutlined,
    WarningOutlined,
    WifiOutlined
} from "@ant-design/icons";

import { Link } from 'react-router-dom';
import { IntlShape } from "react-intl";
import { RobotsTargetTask } from "@/shared/types";
import { RobotsInfo } from "@/pages/robots-info/types";

const { Title } = Typography;

type Props = {
    intl: IntlShape;
    robotsTargetTask: RobotsTargetTask;
    currentRobotInfo: RobotsInfo;
    progressState: "success" | "exception" | "normal";
    setIsTasksDisabled: (val: boolean) => void;
}

export const TargetRobotInfoContent = observer((
    { intl, robotsTargetTask, currentRobotInfo, progressState, setIsTasksDisabled }: Props
) => {

    const openingModalHandler = () => setIsTasksDisabled(true);

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: intl.formatMessage({ id: 'page.targetRobotInfo.currentTaskName' }),
            children: currentRobotInfo?.latest_status
                ? <div className={styles.descriptionName}>{robotsTargetTask?.name ?? "_____"}</div>
                : <Skeleton rootClassName={styles.descriptionSkeleton} active={true} title={false} paragraph={{ rows: 1 }} />,
        },
        {
            key: '2',
            label: intl.formatMessage({ id: 'page.targetRobotInfo.currentActionName' }),
            children: currentRobotInfo?.latest_status
                ? <div className={styles.descriptionName}>
                    {
                        currentRobotInfo?.latest_status.current_mission !== "[None, None]"
                            ? currentRobotInfo?.latest_status.current_mission
                            : "_____"
                    }
                </div>
                : <Skeleton rootClassName={styles.descriptionSkeleton} active={true} title={false} paragraph={{ rows: 1 }} />,
        },
    ];


    return (
        <>
            {
                currentRobotInfo?.robot.robot_id
                    ? <Title className={styles.title} level={2}>
                        <div className={styles.titleIdicator}>
                            <span
                                style={{ backgroundColor: currentRobotInfo?.latest_status.connected ? "#4f0" : "#f40" }}
                                className={styles.roundIndicator}
                            >
                            </span>
                        </div>
                        <div className={styles.titleBlock}>

                            <div>ID -&nbsp;</div>
                            <div>{currentRobotInfo?.robot.robot_id ?? "_____"}</div>
                        </div>
                    </Title>
                    : <Skeleton rootClassName={styles.titleSkeleton} active={true} title={false} paragraph={{ rows: 1 }} />

            }


            <Title className={styles.title} level={3}>{intl.formatMessage({ id: 'page.targetRobotInfo.stateTitle' })}</Title>

            <div className={styles.stateBlock}>
                <Card className={styles.card}>

                    {currentRobotInfo?.latest_status.connected &&
                        <WifiOutlined title={"Подключен к сети"} className={styles.stateIcon} />}
                    {currentRobotInfo?.latest_status.battery_charging &&
                        <ApiOutlined title={"Зарядка"} className={styles.stateIcon} />}
                    {currentRobotInfo?.latest_status.manual &&
                        <ToolOutlined title={"Ручное управление"} className={styles.stateIcon} />}
                    {currentRobotInfo?.latest_status.obstacle &&
                        <ExclamationCircleOutlined title={"Препятствие"} className={styles.stateIcon} />}
                    {currentRobotInfo?.latest_status.forks_up &&
                        <ArrowUpOutlined title={"Вилы подняты"} className={styles.stateIcon} />}
                    {currentRobotInfo?.latest_status.pedal_pressed &&
                        <WarningOutlined title={"Педаль зажата"} className={styles.stateIcon} />}
                    {currentRobotInfo?.latest_status.traffic &&
                        <HeatMapOutlined title={"Остановлен траффик контролем"} className={styles.stateIcon} />}
                    {currentRobotInfo?.latest_status.active_task &&
                        <AlertOutlined title={"Имеет активную задачу"} className={styles.stateIcon} />}
                </Card>
            </div>

            <Title className={styles.title} level={3}>{intl.formatMessage({ id: 'page.targetRobotInfo.batteryLevelTitle' })}</Title>

            <div className={styles.batteryLevelBlock}>
                <div title={`${currentRobotInfo?.latest_status.battery_level}%`}>
                    <Card className={styles.card}>
                        <Progress
                            strokeColor={"#fff"}
                            className={
                                progressState === "exception"
                                    ? styles.exceptionProgress
                                    : styles.normalProgress
                            }
                            type={"circle"}
                            percent={currentRobotInfo?.latest_status.battery_level}
                            size={64}
                            status={progressState}
                        />
                    </Card>
                </div>
            </div>

            <Title className={styles.title} level={3}>{intl.formatMessage({ id: 'page.targetRobotInfo.currentTaskTitle' })}</Title>

            <div className={styles.descriptionsBlock}>
                <Card className={styles.card}>
                    <Descriptions className={styles.descriptions} column={1} items={items} />
                </Card>
            </div>

            <Title className={styles.title} level={3}>{intl.formatMessage({ id: 'page.targetRobotInfo.actionsTitle' })}</Title>

            <div className={styles.btnsBlock}>
                <div className={styles.btnsWrapper}>
                    <Button onClick={openingModalHandler}>{intl.formatMessage({ id: 'page.targetRobotInfo.disableTasksBtn' })}</Button>
                    <Button>
                        <Link to={"/scenes/robots-history"}>{intl.formatMessage({ id: 'page.targetRobotInfo.historyRobotBtn' })}</Link>
                    </Button>
                </div>
            </div>
        </>
    );
});