import { DropdownBar, AutoCompleteDropdown, CheckboxDropdown } from "@/ui"
import { IntlProps } from "../../types";
import { parksAndRobotsStore } from "@/entities";
import { observer } from "mobx-react-lite";

export const FilterDropdown = observer(({ intl }: IntlProps) => {

    const dropdownTitle = intl.formatMessage({ id: 'page.parksAndRobots.filterDropdown.title' });
    const autoCompleteTitle = intl.formatMessage({ id: 'page.parksAndRobots.autoComplete.title' });
    const checkboxTitle = intl.formatMessage({ id: 'page.parksAndRobots.checkbox.title' });
    const emptyNameValue = intl.formatMessage({ id: 'page.parksAndRobots.checkbox.emptyNameValue' });
    const emptyStatusValue = intl.formatMessage({ id: 'page.parksAndRobots.checkbox.emptyStatusValue' });
    const emptyTaskValue = intl.formatMessage({ id: 'page.parksAndRobots.checkbox.emptyTaskValue' });

    const {
        store: {
            robotsName, robotsStatuses, robotsCurrentStatuses, robotsTaskIds, robotsCurrentTaskIds,
            isOpenDropdown, filterRobotsByName, filterRobotsByStatus, filterRobotsByTaskId,
            openingControl
        },
    } = parksAndRobotsStore;

    const NAME = "name";
    const STATUS = "status";
    const TASK = "task";

    const dataObj = {
        title_01: {
            label: intl.formatMessage({ id: 'page.parksAndRobots.filterDropdown.name' }),
            [NAME + "_01"]: "name",
        },
        title_02: {
            label: intl.formatMessage({ id: 'page.parksAndRobots.filterDropdown.status' }),
            [STATUS + "_01"]: "status",
        },
        title_03: {
            label: intl.formatMessage({ id: 'page.parksAndRobots.filterDropdown.taskId' }),
            [TASK + "_01"]: "task",
        }
    }

    const getBarItem = (key: string) => {

        switch (key) {
            // case !key.includes(NAME) || key:
            //     return AutoCompleteDropdown(
            //         tempTasksName,
            //         tasksName,
            //         autoCompleteNameTitle,
            //         setTasksName,
            //         getTasksName,
            //         tasksNames,
            //         isTasksNameLoading
            //     );
            //     // return AutoCompleteDropdown(
            //     //     autoCompleteTitle,
            //     //     filterRobotsByName,
            //     //     robotsName,
            //     //     emptyNameValue
            //     // );

            case !key.includes(STATUS) || key:
                return CheckboxDropdown(
                    filterRobotsByStatus,
                    robotsStatuses,
                    robotsCurrentStatuses,
                    checkboxTitle,
                    isOpenDropdown,
                    emptyStatusValue
                );

            case !key.includes(TASK) || key:
                return CheckboxDropdown(
                    filterRobotsByTaskId,
                    robotsTaskIds,
                    robotsCurrentTaskIds,
                    checkboxTitle,
                    isOpenDropdown,
                    emptyTaskValue
                );

            default:
                return CheckboxDropdown(
                    filterRobotsByTaskId,
                    robotsTaskIds,
                    robotsCurrentTaskIds,
                    checkboxTitle,
                    isOpenDropdown,
                    emptyTaskValue
                );
        }
    };

    return <DropdownBar data={dataObj} dropdownTitle={dropdownTitle} barItem={getBarItem} openingControl={openingControl} />
});