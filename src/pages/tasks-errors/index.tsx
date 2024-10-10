import Title from 'antd/es/typography/Title';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';


const TasksErrors = () => {
    const intl = useIntl();

    const location = useLocation();

    return (
        <>
            <Title>{intl.formatMessage({ id: 'page.tasksErrors.title' })}</Title>
            <h2 style={{ color: 'white', textAlign: 'center' }}>{location.state?.id ?? "_____"}</h2>
        </>
    )
}

export default TasksErrors;