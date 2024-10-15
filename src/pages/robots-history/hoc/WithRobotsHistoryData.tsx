import { RobotsHistoryTable } from "../view/robots-history-table/RobotsHistoryTable";
import { useEffect } from "react";
import { RobotsHistoryStore } from "@/entities";
import { TableProps } from "antd";
import { RobotsHistory } from "../types";
import { observer } from "mobx-react-lite";
import { IntlShape } from "react-intl";

type Props = {
    intl: IntlShape;
    isMobile: boolean;
}

export const WithRobotsHistoryData = observer(({ intl, isMobile }: Props) => {

    const {
        store: {
            robotsHistory, isLoadingRobotsHistory, robotsHistoryPageSize, robotsHistoryCurrentPage,
            currentRobotHistoryIds, historyStartDate, historyEndDate,
            getRobotsHistoryData, setRobotsHistoryPageSize
        }
    } = RobotsHistoryStore;

    useEffect(() => {
        getRobotsHistoryData("", intl.locale);
    }, [
        robotsHistoryCurrentPage,
        robotsHistoryPageSize,
        currentRobotHistoryIds,
        historyStartDate,
        historyEndDate,
        intl.locale
    ]);

    const onChange: TableProps<RobotsHistory>['onChange'] = (pagination) => {
        pagination.pageSize !== robotsHistoryPageSize && setRobotsHistoryPageSize(pagination.pageSize);
    };

    return <RobotsHistoryTable
        robotsHistory={robotsHistory}
        intl={intl} onChange={onChange}
        isLoading={isLoadingRobotsHistory}
        isMobile={isMobile}
    />
});