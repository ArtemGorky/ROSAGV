import { DropdownBar, AutoCompleteDropdown, CheckboxDropdown } from "@/ui"
import { IntlProps } from "../../types";
import { parksAndRobotsStore } from "@/entities";
import { observer } from "mobx-react-lite";


export const FilterDropdown = observer(({ intl }: IntlProps) => {

    const dropdownTitle = intl.formatMessage({ id: 'page.parksAndRobots.filterDropdown.title' });
    const autoCompleteTitle = intl.formatMessage({ id: 'page.parksAndRobots.autoComplete.title' });
    const checkboxTitle = intl.formatMessage({ id: 'page.parksAndRobots.checkbox.title' });

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
            case !key.includes(NAME) || key:
                return AutoCompleteDropdown(autoCompleteTitle, filterRobotsByName, robotsName);

            case !key.includes(STATUS) || key:
                return CheckboxDropdown(filterRobotsByStatus, robotsStatuses, robotsCurrentStatuses, checkboxTitle, isOpenDropdown);

            case !key.includes(TASK) || key:
                return CheckboxDropdown(filterRobotsByTaskId, robotsTaskIds, robotsCurrentTaskIds, checkboxTitle, isOpenDropdown);

            default:
                return CheckboxDropdown(filterRobotsByTaskId, robotsTaskIds, robotsCurrentTaskIds, checkboxTitle, isOpenDropdown);
        }
    };

    return <DropdownBar data={dataObj} dropdownTitle={dropdownTitle} barItem={getBarItem} openingControl={openingControl} />
});