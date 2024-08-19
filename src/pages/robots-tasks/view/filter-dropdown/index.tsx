import { DropdownBar, AutoCompleteDropdown, CheckboxDropdown } from "@/ui"
import { IntlProps } from "../../types";
import { robotsTasksStore } from "@/entities";
import { observer } from "mobx-react-lite";

export const FilterDropdown = observer(({ intl }: IntlProps) => {

    const dropdownTitle = intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.title' });
    const autoCompleteTitle = intl.formatMessage({ id: 'page.robotsTasks.autoComplete.title' });
    const checkboxTitle = intl.formatMessage({ id: 'page.robotsTasks.checkbox.title' });
    const emptyRequesterValue = intl.formatMessage({ id: 'page.robotsTasks.checkbox.emptyRequesterValue' });
    const emptyStatusValue = intl.formatMessage({ id: 'page.robotsTasks.checkbox.emptyStatusValue' });
    const emptyTaskValue = intl.formatMessage({ id: 'page.robotsTasks.checkbox.emptyCategoryValue' });

    const {
        store: {
            tasksRequester, tasksStatuses, tasksCurrentStatuses, isOpenDropdown, currentTaskCategory, taskCategory,
            filterTasksByRequester, filterTasksByStatus, openingControl, filterTasksByCategory
        },
    } = robotsTasksStore;

    const REQUESTER = "requester";
    const STATUS = "status";
    const CATEGORY = "category";

    const dataObj = {
        title_01: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.requester' }),
            [REQUESTER + "_01"]: "requester",
        },
        title_02: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.status' }),
            [STATUS + "_01"]: "status",
        },
        title_03: {
            label: intl.formatMessage({ id: 'page.robotsTasks.filterDropdown.taskCategory' }),
            [CATEGORY + "_01"]: "category",
        }
    }

    const getBarItem = (key: string) => {

        switch (key) {
            case !key.includes(REQUESTER) || key:
                return AutoCompleteDropdown(
                    autoCompleteTitle,
                    filterTasksByRequester,
                    tasksRequester,
                    emptyRequesterValue
                );

            case !key.includes(STATUS) || key:
                return CheckboxDropdown(
                    filterTasksByStatus,
                    tasksStatuses,
                    tasksCurrentStatuses,
                    checkboxTitle,
                    isOpenDropdown,
                    emptyStatusValue
                );

            case !key.includes(CATEGORY) || key:
                return CheckboxDropdown(
                    filterTasksByCategory,
                    taskCategory,
                    currentTaskCategory,
                    checkboxTitle,
                    isOpenDropdown,
                    emptyTaskValue
                );

            default:
                return CheckboxDropdown(
                    filterTasksByCategory,
                    taskCategory,
                    currentTaskCategory,
                    checkboxTitle,
                    isOpenDropdown,
                    emptyTaskValue
                );
        }
    };

    return <DropdownBar data={dataObj} dropdownTitle={dropdownTitle} barItem={getBarItem} openingControl={openingControl} />
});