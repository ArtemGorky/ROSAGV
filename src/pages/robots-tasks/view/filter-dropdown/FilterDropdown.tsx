import { DropdownBar, AutoCompleteDropdown, DatePickerDropdown, ResetBtnDropdown } from "@/ui"
import { IntlProps } from "../../types";
import { robotsTasksStore } from "@/entities";
import { observer } from "mobx-react-lite";

export const FilterDropdown = observer(({ intl }: IntlProps) => {

    const dropdownTitle = intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.title' });
    const autoCompleteCommandTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.commandTitle' });
    const autoCompleteNameTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.nameTitle' });
    const autoCompleteRobotIdTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.robotIdTitle' });
    const resetBtnTitle = intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.resetBtnTitle' });
    const emptyCommandValue = intl.formatMessage({ id: 'page.robotsTasks.checkbox.emptyCommandValue' });
    const emptyNameValue = intl.formatMessage({ id: 'page.robotsTasks.checkbox.emptyNameValue' });
    const emptyRobotIdValue = intl.formatMessage({ id: 'page.robotsTasks.checkbox.emptyRobotIdValue' });

    const {
        store: {
            isTasksCommandLoading, tasksCommands, tasksNames, tasksCommand, tasksName,
            isTasksNameLoading, tasksRobotIds, isTasksRobotIdLoading, tasksRobotId,
            openingControl, setTasksCommand, getTasksCommand, setTasksName, getTasksName,
            setTasksRobotId, getTasksRobotId, setRangeDateTasks, resetTasksFilterData
        },
    } = robotsTasksStore;

    const COMMAND = "command";
    const NAME = "name";
    const ROBOT_ID = "robotId";
    const DATE_RANGE = "dateRange";

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
            label: ResetBtnDropdown(
                resetBtnTitle,
                resetTasksFilterData
            )
        },
    }

    const getBarItem = (key: string) => {

        switch (key) {

            case !key.includes(COMMAND) || key:
                return AutoCompleteDropdown(
                    tasksCommand,
                    autoCompleteCommandTitle,
                    setTasksCommand,
                    getTasksCommand,
                    tasksCommands,
                    emptyCommandValue,
                    isTasksCommandLoading
                );

            case !key.includes(NAME) || key:
                return AutoCompleteDropdown(
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
                    tasksRobotId,
                    autoCompleteRobotIdTitle,
                    setTasksRobotId,
                    getTasksRobotId,
                    tasksRobotIds,
                    emptyRobotIdValue,
                    isTasksRobotIdLoading
                );

            case !key.includes(DATE_RANGE) || key:
                return DatePickerDropdown(
                    setRangeDateTasks
                );


            default:
                return AutoCompleteDropdown(
                    tasksCommand,
                    autoCompleteCommandTitle,
                    setTasksCommand,
                    getTasksCommand,
                    tasksCommands,
                    emptyCommandValue,
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