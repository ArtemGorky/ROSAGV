import { DropdownBar, DropdownBarItem, AutoCompleteDropdown } from "@/ui"
import { IntlProps } from "../../types";
import { parksAndRobotsStore } from "@/entities";
import { observer } from "mobx-react-lite";


export const FilterDropdown = observer(({ intl }: IntlProps) => {

    const {
        store: { robotsName, filterRobotsByName },
    } = parksAndRobotsStore;

    const NAME = "name";
    const STATUS = "status";
    const TASK = "task";

    const dataObj = {
        title_01: {
            label: "Имя",
            [NAME + "_01"]: "Поле с именем",
        },
        title_02: {
            label: "Статус",
            [STATUS + "_01"]: "Поле со статусом",
        },
        title_03: {
            label: "ID задачи",
            [TASK + "_01"]: "Поле с id задачи",
        }
    }

    const action_02 = (val: any) => () => {
        // console.log("action_02", val);
        console.log(val);
    };

    const getBarItem = (label: string, key: any) => {

        switch (key) {
            case !key.includes(NAME) || key:
                return AutoCompleteDropdown(label, filterRobotsByName, robotsName);

            case !key.includes(STATUS) || key:
                return DropdownBarItem(label, action_02(label));

            case !key.includes(TASK) || key:
                return DropdownBarItem(label, action_02(label));

            default:
                return DropdownBarItem(label, action_02(label));
        }
    };

    return <DropdownBar data={dataObj} barItem={getBarItem} />
});