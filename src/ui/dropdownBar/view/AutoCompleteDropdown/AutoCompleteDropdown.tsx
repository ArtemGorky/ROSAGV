import { KeyboardEvent, MouseEvent, useEffect } from "react";
import { AutoComplete, Spin } from 'antd';
import styles from './AutoCompleteDropdown.module.css';
import { OptionsTypes } from "@/shared/types";

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();
const keyDownHandler = (evt: KeyboardEvent<HTMLDivElement>) => evt.stopPropagation();

const changeHandler = (action: (val: string) => void) => (value: string) => action(value);

const clearHandler = (action: (val: string) => void) => () => action(null);

export const AutoCompleteDropdown = (tmpVal: string, value: string, title: string,
    action: (val: string) => void, getOptions: () => void,
    options: OptionsTypes[], isLoading: boolean) => {

    const loadingOptions = [{
        label: <div className={styles.loadingOptions}><Spin /></div>,
        value: ""
    }];

    const targetOptions = isLoading ? loadingOptions : options;

    const uniqueOptions = targetOptions.reduce((accum: OptionsTypes[], option: OptionsTypes) => {

        !accum.find(obj => obj.value === option.value) && accum.push(option);

        return accum;
    }, []);

    useEffect(() => {
        getOptions();
    }, [value]);

    return (
        <AutoComplete
            onClick={clickHandler}
            onChange={changeHandler(action)}
            onClear={clearHandler(action)}
            onKeyDown={keyDownHandler}
            value={tmpVal}
            allowClear={true}
            style={{ width: 200 }}
            options={uniqueOptions}
            placeholder={title}
            filterOption={(inputValue, option) =>
                (option!.value as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            // open={true}
            className={styles.autoComplete}
            popupClassName={styles.popup}
        />
    );
}