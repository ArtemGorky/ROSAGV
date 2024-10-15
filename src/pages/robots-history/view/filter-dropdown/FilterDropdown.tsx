import { DropdownBar, DatePickerDropdown, ResetBtnDropdown } from "@/ui"
import { RobotsHistoryStore } from "@/entities";
import { observer } from "mobx-react-lite";
import { SelectDropdown } from "@/ui/dropdownBar/view/SelectDropdown/SelectDropdown";
import { IntlProps } from "@/shared/types";

export const FilterDropdown = observer(({ intl }: IntlProps) => {

    const dropdownTitle = intl.formatMessage({ id: 'page.robotsHistory.filterDropdown.title' });
    const selectHistoryIdTitle = intl.formatMessage({ id: 'page.robotsHistory.autoComplete.robotIdTitle' });
    const resetBtnTitle = intl.formatMessage({ id: 'page.robotsHistory.filterDropdown.resetBtnTitle' });

    const {
        store: {
            tempRobotHistoryIds, robotHistoryIds, historyStartDate, historyEndDate, isRobotHistoryIdsLoading,
            setRobotHistoryId, getRobotHistoryIdsData, openingControl, setRangeDateHistory, resetRobotHistoryFilterData
        }
    } = RobotsHistoryStore;

    const getRobotHistoryIdsLocale = () => {
        getRobotHistoryIdsData(intl.locale);
    }

    const ROBOT_ID = "robotId";
    const DATE_RANGE = "dateRange";
    const ERROR = "error";

    const dataObj = {
        title_01: {
            label: intl.formatMessage({ id: 'page.robotsHistory.filterDropdown.robotId' }),
            [ROBOT_ID + "_01"]: "robotId",
        },

        title_02: {
            label: intl.formatMessage({ id: 'page.robotsHistory.filterDropdown.dateRange' }),
            [DATE_RANGE + "_02"]: "dateRange",
        },

        title_03: {
            label: intl.formatMessage({ id: 'page.robotsHistory.filterDropdown.error' }),
            [ERROR + "_03"]: "error",
        },

        title_04: {
            label: ResetBtnDropdown(
                resetBtnTitle,
                resetRobotHistoryFilterData
            )
        },
    }

    const getBarItem = (key: string) => {

        switch (key) {

            case !key.includes(ROBOT_ID) || key:
                return SelectDropdown(
                    tempRobotHistoryIds,
                    selectHistoryIdTitle,
                    setRobotHistoryId,
                    robotHistoryIds,
                    isRobotHistoryIdsLoading,
                    intl.locale,
                    getRobotHistoryIdsLocale,
                );

            case !key.includes(ERROR) || key:
                return SelectDropdown(
                    tempRobotHistoryIds,
                    selectHistoryIdTitle,
                    setRobotHistoryId,
                    robotHistoryIds,
                    isRobotHistoryIdsLoading,
                    intl.locale,
                    getRobotHistoryIdsLocale,
                );

            case !key.includes(DATE_RANGE) || key:
                return DatePickerDropdown(
                    setRangeDateHistory,
                    historyStartDate,
                    historyEndDate
                );


            default:
                return SelectDropdown(
                    tempRobotHistoryIds,
                    selectHistoryIdTitle,
                    setRobotHistoryId,
                    robotHistoryIds,
                    isRobotHistoryIdsLoading,
                    intl.locale,
                    getRobotHistoryIdsLocale,
                );
        }
    };

    return <DropdownBar
        data={dataObj}
        dropdownTitle={dropdownTitle}
        barItem={getBarItem}
        openingControl={openingControl}
    />
});