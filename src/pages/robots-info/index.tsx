import Title from 'antd/es/typography/Title';
import { useIntl } from 'react-intl';
import { RobotsInfoContent } from './view/robots-info-content/RobotsInfoContent';

const RobotsInfo = () => {
    const intl = useIntl();

    return (
        <>
            <Title>{intl.formatMessage({ id: 'page.robotsInfo.title' })}</Title>
            <RobotsInfoContent intl={intl}/>
        </>
    )
}

export default RobotsInfo;