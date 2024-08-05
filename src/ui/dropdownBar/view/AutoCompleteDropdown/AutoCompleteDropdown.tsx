import { MouseEvent, useState } from "react";
import { AutoComplete } from 'antd';
import styles from './AutoCompleteDropdown.module.css';

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

const changeHandler = (action: any) => (name: any) => {

    action(name);

}

export const AutoCompleteDropdown = (label: string, action: (val: any) => void, options: any) => {

    return (
        <AutoComplete
            allowClear={true}
            onClick={clickHandler}
            onChange={changeHandler(action)}
            style={{ width: 200 }}
            options={options}
            placeholder="Пожалуйста, введите имя!"
            filterOption={(inputValue, option) =>
                (option!.value as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            open={true}
            className={styles.autoComplete}
            popupClassName={styles.popup}
        />
    );
}