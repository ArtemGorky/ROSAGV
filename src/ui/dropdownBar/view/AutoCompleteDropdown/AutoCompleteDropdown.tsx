import { MouseEvent } from "react";
import { AutoComplete } from 'antd';
import styles from './AutoCompleteDropdown.module.css';
import { BaseOptionType } from "antd/es/select";
import { DefaultOptionType } from "antd/es/cascader";

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

const changeHandler = (action: (val: string) => void) => (value: string) => action(value);

const clearHandler = (action: (val: string) => void) => () => action(null);

export const AutoCompleteDropdown = (title: string, action: (val: string) => void,
    options: (BaseOptionType | DefaultOptionType)[], emptyValue: string) => {

    const emptyItem = {
        label: emptyValue,
        value: "∅"
    }

    const targetOptions = options.filter(item => item.value && ({
        label: item.value,
        value: item.value
    }));

    options.find(item => item.value === "") && targetOptions.push(emptyItem);

    return (
        <AutoComplete
            onClick={clickHandler}
            onChange={changeHandler(action)}
            onClear={clearHandler(action)}
            allowClear={true}
            style={{ width: 200 }}
            options={targetOptions}
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