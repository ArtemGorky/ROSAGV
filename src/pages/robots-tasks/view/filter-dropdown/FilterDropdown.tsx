import { DropdownBar, AutoCompleteDropdown, DatePickerDropdown, ResetBtnDropdown } from "@/ui"
import { IntlProps } from "../../types";
import { robotsTasksStore } from "@/entities";
import { observer } from "mobx-react-lite";
import { SelectDropdown } from "@/ui/dropdownBar/view/SelectDropdown/SelectDropdown";
import { getTasksStatusLocale } from "@/shared/helpers";

export const FilterDropdown = observer(({ intl }: IntlProps) => {

    const getCurrentTasksStatus = (num: number) => {
        return getTasksStatusLocale(intl, num);
    }

    const dropdownTitle = intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.title' });
    const selectCommandTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.commandTitle' });
    const autoCompleteNameTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.nameTitle' });
    const selectStatusTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.statusTitle' });
    const selectRangeStatusTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.rangeStatusTitle' });
    const selectRobotIdTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.robotIdTitle' });
    const resetBtnTitle = intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.resetBtnTitle' });

    const {
        store: {
            isTasksCommandLoading, tasksCommands, tasksNames, tasksName, tasksEndDate, statusRangeMaxCount,
            isTasksNameLoading, tasksRobotIds, isTasksRobotIdLoading, tasksStartDate, tasksStatuses, tasksMinStartTimeAfter,
            isTasksStatusLoading, tempTasksCommand, tempTasksName, tempTasksRobotId, tempTasksStatus, tempTasksRangeStatus,
            tasksMinStartTimeBefore,
            openingControl, setTasksCommand, getTasksCommand, setTasksName, getTasksName, setTasksStatus, setTasksRangeStatus,
            setTasksRobotId, getTasksRobotId, setRangeDateTasks, resetTasksFilterData, getTasksStatus, setMinStartTimeTasks
        },
    } = robotsTasksStore;

    const COMMAND = "command";
    const NAME = "name";
    const ROBOT_ID = "robotId";
    const DATE_RANGE = "dateRange";
    const MIN_START_TIME = "minStartTime";
    const STATUSES = "statuses";
    const STATUS_RANGE = "statusRange";

    const dataObj = {
        title_01: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.command' }),
            [COMMAND + "_01"]: "command",
        },
        title_02: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.name' }),
            [NAME + "_02"]: "name",
        },
        title_03: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.robotId' }),
            [ROBOT_ID + "_03"]: "robotId",
        },
        title_04: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.dateRange' }),
            [DATE_RANGE + "_04"]: "dateRange",
        },
        title_05: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.minStartTime' }),
            [MIN_START_TIME + "_05"]: "minStartTime",
        },
        title_06: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.statuses' }),
            [STATUSES + "_06"]: "statuses",
        },
        title_07: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.statusRange' }),
            [STATUS_RANGE + "_07"]: "statusRange",
        },
        title_08: {
            label: ResetBtnDropdown(
                resetBtnTitle,
                resetTasksFilterData
            )
        },
    }

    const getBarItem = (key: string) => {

        switch (key) {

            case !key.includes(COMMAND) || key:
                return SelectDropdown(
                    tempTasksCommand,
                    selectCommandTitle,
                    setTasksCommand,
                    tasksCommands,
                    isTasksCommandLoading,
                    getTasksCommand
                );

            case !key.includes(NAME) || key:
                return AutoCompleteDropdown(
                    tempTasksName,
                    tasksName,
                    autoCompleteNameTitle,
                    setTasksName,
                    getTasksName,
                    tasksNames,
                    isTasksNameLoading
                );

            case !key.includes(ROBOT_ID) || key:
                return SelectDropdown(
                    tempTasksRobotId,
                    selectRobotIdTitle,
                    setTasksRobotId,
                    tasksRobotIds,
                    isTasksRobotIdLoading,
                    getTasksRobotId,
                );

            case !key.includes(STATUSES) || key:
                return SelectDropdown(
                    tempTasksStatus,
                    selectStatusTitle,
                    setTasksStatus,
                    tasksStatuses,
                    isTasksStatusLoading,
                    getTasksStatus,
                    getCurrentTasksStatus
                );

            case !key.includes(STATUS_RANGE) || key:
                return SelectDropdown(
                    tempTasksRangeStatus,
                    selectRangeStatusTitle,
                    setTasksRangeStatus,
                    tasksStatuses,
                    isTasksStatusLoading,
                    null,
                    getCurrentTasksStatus,
                    statusRangeMaxCount
                );

            case !key.includes(DATE_RANGE) || key:
                return DatePickerDropdown(
                    setRangeDateTasks,
                    tasksStartDate,
                    tasksEndDate
                );

            case !key.includes(MIN_START_TIME) || key:
                return DatePickerDropdown(
                    setMinStartTimeTasks,
                    tasksMinStartTimeAfter,
                    tasksMinStartTimeBefore
                );


            default:
                return SelectDropdown(
                    tempTasksCommand,
                    selectCommandTitle,
                    setTasksCommand,
                    tasksCommands,
                    isTasksCommandLoading,
                    getTasksCommand,
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