import type { CSSProperties } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme, Typography } from 'antd';

import styles from "./TargetTaskContentCollapse.module.css"
import { BasicTaskData } from '../basic-task-data/BasicTaskData';
import { IntlShape } from 'react-intl';
import { HistoryTaskData } from '../history-task-data/HistoryTaskData';

const { Title } = Typography;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties, intl: IntlShape) => CollapseProps['items'] = (panelStyle, intl) => [
    {
        key: '1',
        label: <Title className={styles.title} level={4}>Основная информация</Title>,
        children: <BasicTaskData intl={intl} isMobile={true} />,
        style: panelStyle,
    },
    {
        key: '2',
        label: <Title className={styles.title} level={4}>История выполнения</Title>,
        children: <HistoryTaskData intl={intl} />,
        style: panelStyle,
    }
];

type Props = {
    intl: IntlShape;
}

export const TargetTaskContentCollapse = ({ intl }: Props) => {
    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    return (
        <Collapse
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{ background: token.colorBgContainer }}
            items={getItems(panelStyle, intl)}
            className={styles.collapse}
        />
    );
}