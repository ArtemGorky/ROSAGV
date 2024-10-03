import { DropdownBar, BtnDropdown } from "@/ui"
import { IntlProps } from "../../types";
import { robotsTasksStore } from "@/entities";
import { observer } from "mobx-react-lite";

export const RefetchDropdown = observer(({ intl }: IntlProps) => {

    const refetchDropdownTitle = intl.formatMessage({ id: 'page.robotsTasks.refetchDropdown.title' });
    const refetchBtnTitle = intl.formatMessage({ id: 'page.robotsTasks.refetchDropdown.refetchBtnTitle' });
    const resetBtnTitle = intl.formatMessage({ id: 'page.robotsTasks.refetchDropdown.resetBtnTitle' });

    const {
        store: {
            setTasksRefetchData, openingControlRefetchDropdown
        },
    } = robotsTasksStore;

    const dataObj = {
        title_01: {
            label: BtnDropdown(
                1,
                `${1} ${refetchBtnTitle}`,
                setTasksRefetchData
            )
        },
        title_02: {
            label: BtnDropdown(
                2,
                `${2} ${refetchBtnTitle}`,
                setTasksRefetchData
            )
        },
        title_03: {
            label: BtnDropdown(
                3,
                `${3} ${refetchBtnTitle}`,
                setTasksRefetchData
            )
        },
        title_04: {
            label: BtnDropdown(
                5,
                `${5} ${refetchBtnTitle}`,
                setTasksRefetchData
            )
        },
        title_05: {
            label: BtnDropdown(
                10,
                `${10} ${refetchBtnTitle}`,
                setTasksRefetchData
            )
        },
        title_06: {
            label: BtnDropdown(
                null,
                resetBtnTitle,
                setTasksRefetchData
            )
        },
    }

    const getBarItem = () => <></>;

    return <DropdownBar
        data={dataObj}
        dropdownTitle={refetchDropdownTitle}
        barItem={getBarItem}
        openingControl={openingControlRefetchDropdown}
    />
});