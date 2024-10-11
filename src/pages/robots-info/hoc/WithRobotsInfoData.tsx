import { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { RobotsInfoTable } from '../view/robots-info-table/RobotsInfoTable';
import { RobotsInfoStore } from '@/entities';
import { IntlShape } from 'react-intl';
import { closeConnectionDelay } from '@/shared';

type Props = {
    intl: IntlShape;
    isMobile: boolean;
}

export const WithRobotsInfoData = observer(({ intl, isMobile }: Props) => {

    const {
        store: {
            currentRobotsInfo, targetRobotInfoSocket, robotsInfoStartSocketConnection
        },
    } = RobotsInfoStore;

    const closeConnection = () => {
        targetRobotInfoSocket?.close();
    }

    useEffect(() => {
        robotsInfoStartSocketConnection();
    }, []);

    useEffect(() => {
        return (() => {
            setTimeout(() => {
                !document.location.pathname.includes("robots-info") && closeConnection();
            }, closeConnectionDelay);
        });
    }, [targetRobotInfoSocket]);


    return <RobotsInfoTable
        intl={intl}
        isMobile={isMobile}
        currentInfo={currentRobotsInfo}
    // isLoading={readyState !== ReadyState.OPEN}
    />;

});
