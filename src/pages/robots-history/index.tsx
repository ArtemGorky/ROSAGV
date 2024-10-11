import { useIntl } from 'react-intl';
import Title from 'antd/es/typography/Title';

const RobotsHistory = () => {
    const intl = useIntl();
    return (
        <>
            <Title>{intl.formatMessage({ id: 'page.robotsHistory.title' })}</Title>
        </>
    );
};

export default RobotsHistory;
