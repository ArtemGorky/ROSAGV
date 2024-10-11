import { observer } from "mobx-react-lite";
import { useIntl } from 'react-intl';
import Title from 'antd/es/typography/Title';
import { TargetRobotInfoData } from "./view/target-robot-info-data/TargetRobotInfoData";

const TargetRobotInfo = observer(() => {

    const intl = useIntl();

    return (
        <>
            <Title>{intl.formatMessage({ id: 'page.targetRobotInfo.title' })}</Title>
            <TargetRobotInfoData intl={intl} />
        </>
    );
});

export default TargetRobotInfo;
