import { MouseEvent } from "react";
import { Divider } from "antd";
import { CheckboxGroupDropdown } from "./CheckboxGroupDropdown/CheckboxGroupDropdown";
import { MainCheckbox } from "./MainCheckbox/MainCheckbox";

import styles from './CheckboxDropdown.module.css'

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

export const CheckboxDropdown = (
    action: (items: string[]) => void,
    state: { value: string }[],
    currentState: string[],
    title: string,
    isOpenDropdown: boolean,
    emptyValue: string,
) => {

    return (
        <div className={!isOpenDropdown ? styles.hideCheckbox : styles.showCheckbox} onClick={clickHandler}>
            <MainCheckbox
                clickHandler={clickHandler}
                action={action}
                currentState={currentState}
                robotsState={state}
                title={title}
            />

            <Divider />

            <CheckboxGroupDropdown
                currentState={currentState}
                state={state}
                action={action}
                emptyValue={emptyValue}
            />
        </div>
    );
}