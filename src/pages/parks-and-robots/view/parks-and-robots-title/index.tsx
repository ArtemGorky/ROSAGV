import Title from 'antd/es/typography/Title';
import { IntlProps } from '../../types';

export const ParksAndRobotsTitle = ({ intl }: IntlProps) => {
    return <Title>{intl.formatMessage({ id: 'page.parksAndRobots.title' })}</Title>
}