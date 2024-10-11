import { IntlShape } from "react-intl";
import { Skeleton } from "antd";
import { useLocation } from 'react-router-dom';
import { Typography } from 'antd';
import { RobotsTargetTaskStore } from "@/entities";

import styles from "./TargetTaskContent.module.css"
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TargetTaskContentCollapse } from "../target-task-content-collapse/TargetTaskContentCollapse";
import { TargetTaskContentExpanded } from "../target-task-content-expanded/TargetTaskContentExpanded";
import { useDeviceDetect } from "@/hooks";

const { Title } = Typography;

type Props = {
    intl: IntlShape;
}

export const TargetTaskContent = observer(({ intl }: Props) => {

    const { isMobile } = useDeviceDetect();

    const {
        store: {
            robotsTargetTask, getRobotsTargetTaskData, getRobotsTargetTaskHistoryData
        },
    } = RobotsTargetTaskStore;

    const location = useLocation();

    console.log(location.state?.id);

    useEffect(() => {
        location.state?.id && getRobotsTargetTaskData(location.state?.id, intl.locale);
        location.state?.id && getRobotsTargetTaskHistoryData(location.state?.id, intl.locale);
    }, [intl.locale]);

    if (isMobile) {
        return (
            <>
                {
                    robotsTargetTask?.name
                        ? <Title className={styles.container} level={3}>{robotsTargetTask?.name}</Title>
                        : <Skeleton rootClassName={styles.titleSkeleton} active={true} title={false} paragraph={{ rows: 1 }} />
                }
                <TargetTaskContentCollapse intl={intl} />
            </>
        );
    }
    else {
        return (
            <>
                {
                    robotsTargetTask?.name
                        ? <Title className={styles.container} level={3}>{robotsTargetTask?.name}</Title>
                        : <Skeleton rootClassName={styles.titleSkeleton} active={true} title={false} paragraph={{ rows: 1 }} />
                }
                <TargetTaskContentExpanded intl={intl} />
            </>
        );
    }


});