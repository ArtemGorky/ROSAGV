import { DropdownBar, AutoCompleteDropdown, DatePickerDropdown, ResetBtnDropdown } from "@/ui"
import { IntlProps } from "../../types";
import { robotsTasksStore } from "@/entities";
import { observer } from "mobx-react-lite";
import { SelectDropdown } from "@/ui/dropdownBar/view/SelectDropdown/SelectDropdown";

export const FilterDropdown = observer(({ intl }: IntlProps) => {

    const dropdownTitle = intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.title' });
    const selectCommandTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.commandTitle' });
    const autoCompleteNameTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.nameTitle' });
    const autoCompleteRobotIdTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.robotIdTitle' });
    const selectStatusTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.statusTitle' });
    const resetBtnTitle = intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.resetBtnTitle' });
    const emptyNameValue = intl.formatMessage({ id: 'page.robotsTasks.checkbox.emptyNameValue' });
    const emptyRobotIdValue = intl.formatMessage({ id: 'page.robotsTasks.checkbox.emptyRobotIdValue' });

    const {
        store: {
            isTasksCommandLoading, tasksCommands, tasksNames, tasksName, tasksEndDate,
            isTasksNameLoading, tasksRobotIds, isTasksRobotIdLoading, tasksRobotId, tasksStartDate, tasksStatuses,
            isTasksStatusLoading, tempTasksCommand, tempTasksName, tempTasksRobotId, tempTasksStatus,
            openingControl, setTasksCommand, getTasksCommand, setTasksName, getTasksName, setTasksStatus,
            setTasksRobotId, getTasksRobotId, setRangeDateTasks, resetTasksFilterData, getTasksStatus
        },
    } = robotsTasksStore;

    const COMMAND = "command";
    const NAME = "name";
    const ROBOT_ID = "robotId";
    const DATE_RANGE = "dateRange";
    const STATUS = "status";

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
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.status' }),
            [STATUS + "_05"]: "status",
        },
        title_06: {
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
                    getTasksCommand,
                    tasksCommands,
                    isTasksCommandLoading
                );

            case !key.includes(NAME) || key:
                return AutoCompleteDropdown(
                    tempTasksName,
                    tasksName,
                    autoCompleteNameTitle,
                    setTasksName,
                    getTasksName,
                    tasksNames,
                    emptyNameValue,
                    isTasksNameLoading
                );

            case !key.includes(ROBOT_ID) || key:
                return AutoCompleteDropdown(
                    tempTasksRobotId,
                    tasksRobotId,
                    autoCompleteRobotIdTitle,
                    setTasksRobotId,
                    getTasksRobotId,
                    tasksRobotIds,
                    emptyRobotIdValue,
                    isTasksRobotIdLoading
                );

            case !key.includes(STATUS) || key:
                return SelectDropdown(
                    tempTasksStatus,
                    selectStatusTitle,
                    setTasksStatus,
                    getTasksStatus,
                    tasksStatuses,
                    isTasksStatusLoading
                );

            case !key.includes(DATE_RANGE) || key:
                return DatePickerDropdown(
                    setRangeDateTasks,
                    tasksStartDate,
                    tasksEndDate
                );


            default:
                return SelectDropdown(
                    tempTasksCommand,
                    selectCommandTitle,
                    setTasksCommand,
                    getTasksCommand,
                    tasksCommands,
                    isTasksCommandLoading
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