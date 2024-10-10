import { Space, Typography } from 'antd';
import { BasicTaskData } from '../basic-task-data/BasicTaskData';
import styles from "./TargetTaskContentExpanded.module.css";
import { HistoryTaskData } from '../history-task-data/HistoryTaskData';
import { IntlShape } from 'react-intl';

const { Title } = Typography;


type Props = {
    intl: IntlShape;
}

export const TargetTaskContentExpanded = ({ intl }: Props) => {


    return (
        <Space className={styles.content}>
            <div style={{ display: "inline-block" }}>
                <Title className={styles.title} level={4}>{intl.formatMessage({ id: 'page.robotsTargetTask.baseTitle' })}</Title>
                <BasicTaskData intl={intl} />
            </div>
            <div style={{ display: "inline-block" }}>
                <Title className={styles.title} level={4}>{intl.formatMessage({ id: 'page.robotsTargetTask.historyTitle' })}</Title>
                <HistoryTaskData intl={intl} />
            </div>
        </Space>
    );
}