import { IntlShape } from "react-intl";

import { Button, Descriptions, DescriptionsProps, message, Skeleton, Space, Tooltip } from 'antd';

import styles from "./BasicTaskData.module.css"
import { RobotsTargetTaskStore } from "@/entities";
import { colors } from "@/shared/constants";
import { getTasksStatusLocale } from "@/shared/helpers";
import { BasicModal } from "@/ui";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";


type Props = {
    intl: IntlShape;
    isMobile?: boolean;
}

export const BasicTaskData = observer(({ intl, isMobile }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();

    const {
        store: {
            isOpenRetryTaskModal, robotsTargetTask, robotTaskResponseMessage, isOpenCancelTaskModal, robotTargetTaskRetry,
            setIsOpenRetryTaskModal, setRobotTaskResponseMessage, setIsOpenCancelTaskModal, robotTargetTaskCancel
        },
    } = RobotsTargetTaskStore;

    const success = () => {
        messageApi.open({
            type: 'success',
            content: robotTaskResponseMessage,
        }).then(() => setRobotTaskResponseMessage(""));
    };

    useEffect(() => {
        robotTaskResponseMessage && success();
    }, [robotTaskResponseMessage]);

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'ID задачи',
            children: robotsTargetTask?.task_id
                ? <Tooltip color={"rgb(43, 52, 66)"} title={robotsTargetTask?.task_id} >
                    <div className={styles.taskIdTitle}>{robotsTargetTask?.task_id}</div>
                </Tooltip>
                : "_____",
        },
        {
            key: '2',
            label: 'Команда',
            children: robotsTargetTask?.command ?? "_____",
        },
        {
            key: '3',
            label: 'Начальная точка',
            children: robotsTargetTask?.targets[0] ?? "_____",
        },
        {
            key: '4',
            label: 'Конечная точка',
            children: robotsTargetTask?.targets[1] ?? "_____",
        },
        {
            key: '5',
            label: 'Время начала',
            children: robotsTargetTask?.min_start_time ?? "_____",
        },
        {
            key: '6',
            label: 'Требуется упаковка',
            children: robotsTargetTask?.wrapping_required ? "Да" : "Нет",
        },
        {
            key: '7',
            label: 'Текущий статус',
            children: <div>
                <span
                    style={{ backgroundColor: `#${colors[robotsTargetTask?.task_state.state ?? 6]}` }}
                    className={styles.roundIndicator}
                ></span>
                <span>{getTasksStatusLocale(intl, robotsTargetTask?.task_state.state ?? 6) ?? "_____"}</span>
            </div>,
        },
    ];



    const clickRetryHandler = () => {
        setIsOpenRetryTaskModal(true);
    }
    const clickOkBasicModalHandler = () => {
        robotsTargetTask?.task_id && robotTargetTaskRetry(robotsTargetTask?.task_id);
        setIsOpenRetryTaskModal(false);
    }
    const clickCancelBasicModalHandler = () => {
        setIsOpenRetryTaskModal(false);
    }



    const clickTaskCancelHandler = () => {
        setIsOpenCancelTaskModal(true);
    }
    const clickOkCancelModalHandler = () => {
        robotsTargetTask?.task_id && robotTargetTaskCancel(robotsTargetTask?.task_id);
        setIsOpenCancelTaskModal(false);
    }
    const clickCancelModalHandler = () => {
        setIsOpenCancelTaskModal(false);
    }

    return (
        <>
            {contextHolder}

            <div className={
                isMobile
                    ? `${styles.descriptionsContainer} ${styles.descriptionsContainerMobile}`
                    : styles.descriptionsContainer
            }>
                {
                    robotsTargetTask
                        ? <Descriptions className={styles.descriptions} column={1} items={items} />
                        : <Skeleton.Node
                            rootClassName={styles.skeletonNode}
                            style={{ width: "485px", height: "35vh" }}
                            active={true}
                        />
                }
            </div>


            <Space className={isMobile ? `${styles.space} ${styles.spaceMobile}` : styles.space}>
                <Button
                    disabled={Number(robotsTargetTask?.task_state.state) !== 6 && Number(robotsTargetTask?.task_state.state) !== 7}
                    onClick={clickRetryHandler}
                >
                    Перевыполнить
                </Button>
                <Button onClick={clickTaskCancelHandler}>Отменить</Button>
                <Button>Продолжить</Button>
            </Space>


            <BasicModal
                title={robotsTargetTask?.name ?? ""}
                content={"Первыполнить задачу?"}
                isOpen={isOpenRetryTaskModal}
                handleOk={clickOkBasicModalHandler}
                handleCancel={clickCancelBasicModalHandler}
            />
            <BasicModal
                title={robotsTargetTask?.name ?? ""}
                content={"Отменить задачу?"}
                isOpen={isOpenCancelTaskModal}
                handleOk={clickOkCancelModalHandler}
                handleCancel={clickCancelModalHandler}
            />
        </>
    );
});