import { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { RobotsInfoTable } from '../view/robots-info-table/RobotsInfoTable';
import { RobotsInfoStore } from '@/entities';
import { IntlShape } from 'react-intl';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { RobotsInfo } from '../types';

import { getRobotsInfoStructuredData, robotsInfo } from "@/shared";

type Props = {
    intl: IntlShape;
    isMobile: boolean;
}

const wsUrl = `${import.meta.env.VITE_AGV_ROBOTS_INFO_SOCKET}/robot_state/`;

export const WithRobotsInfoData = observer(({ intl, isMobile }: Props) => {

    const {
        store: {
            currentRobotsInfo, setRobotsInfo
        },
    } = RobotsInfoStore;

    const { lastMessage, readyState } = useWebSocket<RobotsInfo[]>(wsUrl);

    useEffect(() => {

        // if (lastMessage !== null) {
        //     const structuredData = getRobotsInfoStructuredData(lastMessage.data)
        //     setRobotsInfo(structuredData);
        // }

        lastMessage !== null && setRobotsInfo(robotsInfo);


    }, [lastMessage]);

    return <RobotsInfoTable
        intl={intl}
        isMobile={isMobile}
        currentInfo={currentRobotsInfo}
        isLoading={readyState !== ReadyState.OPEN}
    />;

});
