import { IntlProps } from "../../types";
import { observer } from "mobx-react-lite";
import { Switch } from "antd";

import styles from "./ToggleSwitch.module.css";
import { robotsTasksStore } from "@/entities";

export const ToggleSwitch = observer(({ intl }: IntlProps) => {

    const {
        store: {
            setTasksContent
        },
    } = robotsTasksStore;

    const onChangeHandler = (checked: boolean) => {
        setTasksContent(checked);
    }

    return <div className={styles.container}>
        <Switch
            onChange={onChangeHandler}
            className={styles.switch}
            checkedChildren="Таблица"
            unCheckedChildren="Карточки" defaultChecked
        />
    </div>
});