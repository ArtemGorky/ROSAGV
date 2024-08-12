import { MouseEvent, useState } from "react";
import { AutoComplete } from 'antd';
import styles from './AutoCompleteDropdown.module.css';
import { BaseOptionType } from "antd/es/select";
import { DefaultOptionType } from "antd/es/cascader";

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

const changeHandler = (action: (val: string) => void) => (name: string) => action(name);

const clearHandler = (action: (val: string) => void) => () => action(null);

export const AutoCompleteDropdown = (title: string, action: (val: string) =>
    void, options: (BaseOptionType | DefaultOptionType)[]) => {

    return (
        <AutoComplete
            onClick={clickHandler}
            onChange={changeHandler(action)}
            onClear={clearHandler(action)}
            allowClear={true}
            style={{ width: 200 }}
            options={options}
            placeholder={title}
            filterOption={(inputValue, option) =>
                (option!.value as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            open={true}
            className={styles.autoComplete}
            popupClassName={styles.popup}
        />
    );
}