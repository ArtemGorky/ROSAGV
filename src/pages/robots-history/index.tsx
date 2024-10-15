import { useIntl } from 'react-intl';
import Title from 'antd/es/typography/Title';
import { RobotsHistoryContent } from './view/RobotsHistoryContent/RobotsHistoryContent';

const RobotsHistory = () => {
    const intl = useIntl();
    return (
        <>
            <Title>{intl.formatMessage({ id: 'page.robotsHistory.title' })}</Title>
            <RobotsHistoryContent intl={intl} />
        </>
    );
};

export default RobotsHistory;
