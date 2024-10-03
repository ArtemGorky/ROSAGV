import { Button } from "antd";
import { MouseEvent } from "react";

import styles from "./BtnDropdown.module.css"

const clickHandler = (action: (val: string | number | null) => void, value: string | number | null) =>
    (evt: MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        action(value);
    };

export const BtnDropdown = (value: string | number | null, title: string, action: (val: string | number | null) => void) =>
    <Button className={styles.btn} onClick={clickHandler(action, value)}>{title}</Button>