import { useIntl } from 'react-intl';
import Title from 'antd/es/typography/Title';
import { TargetTaskContent } from './view/target-task-content/TargetTaskContent';

const RobotsTargetTask = () => {

  const intl = useIntl();

  return (
    <>
      <Title>{intl.formatMessage({ id: 'page.robotsTargetTask.title' })}</Title>
      <TargetTaskContent intl={intl} />
    </>
  );
};

export default RobotsTargetTask;
