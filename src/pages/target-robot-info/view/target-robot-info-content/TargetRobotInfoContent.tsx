import { observer } from "mobx-react-lite";
import { Descriptions, Progress, Typography, DescriptionsProps, Button, Skeleton, Card, Layout, Space } from 'antd';

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
import { ActiveIcon, ArrowUpIcon, BarrierIcon, ChargeIcon, ConnectIcon, HandIcon, PedalIcon, TrafficLightsIcon } from "@/shared";

const { Title } = Typography;

type Props = {
    intl: IntlShape;
    robotsTargetTask: RobotsTargetTask;
    currentRobotInfo: RobotsInfo;
    progressState: "success" | "exception" | "normal";
    setIsTasksDisabled: (val: boolean) => void;
    isMobile: boolean;
}

export const TargetRobotInfoContent = observer((
    { intl, robotsTargetTask, currentRobotInfo, progressState, isMobile = false, setIsTasksDisabled }: Props
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
                        currentRobotInfo?.latest_status.current_mission !== "[None, None]" &&
                            currentRobotInfo?.latest_status.current_mission
                            ? currentRobotInfo?.latest_status.current_mission
                            : "_____"
                    }
                </div>
                : <Skeleton rootClassName={styles.descriptionSkeleton} active={true} title={false} paragraph={{ rows: 1 }} />,
        },
    ];


    return (

        isMobile
            ? <>
                {
                    currentRobotInfo?.robot.robot_id
                        ? <Title className={styles.title} level={2} >
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
                        </Title >
                        : <Skeleton rootClassName={styles.titleSkeleton} active={true} title={false} paragraph={{ rows: 1 }} />

                }


                <Title className={styles.title} level={3}>{intl.formatMessage({ id: 'page.targetRobotInfo.stateTitle' })}</Title>

                <div className={styles.stateBlock}>
                    <Card className={styles.card}>
                        {currentRobotInfo?.latest_status.connected &&
                            <ConnectIcon title={"Подключен к сети"} iconClass={styles.iconContainer} size={"42"} />}
                        {currentRobotInfo?.latest_status.battery_charging &&
                            <ChargeIcon title={"Зарядка"} iconClass={styles.iconContainer} size={"42"} />}
                        {currentRobotInfo?.latest_status.manual &&
                            <HandIcon title={"Ручное управление"} iconClass={styles.iconContainer} size={"42"} />}
                        {currentRobotInfo?.latest_status.obstacle &&
                            <BarrierIcon title={"Препятствие"} iconClass={styles.iconContainer} size={"42"} />}
                        {currentRobotInfo?.latest_status.forks_up &&
                            <ArrowUpIcon title={"Вилы подняты"} iconClass={styles.iconContainer} size={"42"} />}
                        {currentRobotInfo?.latest_status.pedal_pressed &&
                            <PedalIcon title={"Педаль зажата"} iconClass={styles.iconContainer} size={"42"} />}
                        {currentRobotInfo?.latest_status.traffic &&
                            <TrafficLightsIcon title={"Остановлен траффик контролем"} iconClass={styles.iconContainer} size={"42"} />}
                        {currentRobotInfo?.latest_status.active_task &&
                            <ActiveIcon title={"Имеет активную задачу"} iconClass={styles.iconContainer} size={"42"} />}
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
            : <>
                {
                    currentRobotInfo?.robot.robot_id
                        ? <Title className={styles.title} level={2} >
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
                        </Title >
                        : <Skeleton rootClassName={styles.titleSkeleton} active={true} title={false} paragraph={{ rows: 1 }} />

                }
                <Space className={styles.mainSpace}>
                    <div>



                        <Title className={styles.title} level={3}>{intl.formatMessage({ id: 'page.targetRobotInfo.stateTitle' })}</Title>

                        <div className={styles.stateBlock}>
                            <Card className={styles.cardDesktop}>
                                {currentRobotInfo?.latest_status.connected &&
                                    <ConnectIcon title={"Подключен к сети"} iconClass={styles.iconContainer} size={"42"} />}
                                {currentRobotInfo?.latest_status.battery_charging &&
                                    <ChargeIcon title={"Зарядка"} iconClass={styles.iconContainer} size={"42"} />}
                                {currentRobotInfo?.latest_status.manual &&
                                    <HandIcon title={"Ручное управление"} iconClass={styles.iconContainer} size={"42"} />}
                                {currentRobotInfo?.latest_status.obstacle &&
                                    <BarrierIcon title={"Препятствие"} iconClass={styles.iconContainer} size={"42"} />}
                                {currentRobotInfo?.latest_status.forks_up &&
                                    <ArrowUpIcon title={"Вилы подняты"} iconClass={styles.iconContainer} size={"42"} />}
                                {currentRobotInfo?.latest_status.pedal_pressed &&
                                    <PedalIcon title={"Педаль зажата"} iconClass={styles.iconContainer} size={"42"} />}
                                {currentRobotInfo?.latest_status.traffic &&
                                    <TrafficLightsIcon title={"Остановлен траффик контролем"} iconClass={styles.iconContainer} size={"42"} />}
                                {currentRobotInfo?.latest_status.active_task &&
                                    <ActiveIcon title={"Имеет активную задачу"} iconClass={styles.iconContainer} size={"42"} />}
                            </Card>
                        </div>

                        <Title className={styles.title} level={3}>{intl.formatMessage({ id: 'page.targetRobotInfo.batteryLevelTitle' })}</Title>

                        <div className={styles.batteryLevelBlock}>
                            <div title={`${currentRobotInfo?.latest_status.battery_level}%`}>
                                <Card className={styles.cardDesktop}>
                                    <Progress
                                        strokeColor={"#fff"}
                                        className={
                                            progressState === "exception"
                                                ? styles.exceptionProgress
                                                : styles.normalProgress
                                        }
                                        type={"circle"}
                                        percent={currentRobotInfo?.latest_status.battery_level}
                                        size={110}
                                        status={progressState}
                                    />
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Title className={styles.title} level={3}>{intl.formatMessage({ id: 'page.targetRobotInfo.currentTaskTitle' })}</Title>

                        <div className={styles.descriptionsBlock}>
                            <Card className={styles.cardDesktop}>
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
                    </div>
                </Space>
            </>
    );
});