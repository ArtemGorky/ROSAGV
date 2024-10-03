import { MouseEvent, useEffect } from "react";
import { Spin } from 'antd';
import styles from './SelectDropdown.module.css';
import Select from "antd/es/select";
import { OptionsTypes } from "@/shared/types";

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

const changeHandler = (action: (option: OptionsTypes[]) => void) => (_: any, option: OptionsTypes[]) => action(option);

const clearHandler = (action: (option: OptionsTypes[]) => void) => () => action([]);

export const SelectDropdown = (
    tmpVal: OptionsTypes[], title: string, action: (val: OptionsTypes[]) => void,
    options: OptionsTypes[], isLoading: boolean, getOptions?: () => void, getData?: (num: number) => string, maxCount?: number
) => {

    const loadingOptions = [{
        label: <div className={styles.loadingOptions}><Spin /></div>,
        value: ""
    }];

    const targetOptions = isLoading ? loadingOptions : options;

    const localeOptions = getData ? targetOptions.map((targrtOption: OptionsTypes) =>
        ({ label: getData(Number(targrtOption.value)), value: targrtOption.value })) : targetOptions;

    useEffect(() => {
        getOptions && getOptions();
    }, []);

    return (
        <Select
            mode="multiple"
            style={{ width: 250 }}
            onChange={changeHandler(action)}
            onClear={clearHandler(action)}
            onClick={clickHandler}
            value={tmpVal}
            placeholder={title}
            maxCount={maxCount}
            allowClear
            options={localeOptions}
            open={true}
            className={styles.select}
            popupClassName={styles.popup}
        />
    );
}