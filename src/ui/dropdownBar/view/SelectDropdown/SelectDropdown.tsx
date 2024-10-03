import { MouseEvent, useEffect } from "react";
import { Spin } from 'antd';
import styles from './SelectDropdown.module.css';
import Select from "antd/es/select";
import { OptionsTypes } from "@/shared/types";

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

const changeHandler = (action: (option: OptionsTypes[]) => void) => (_: any, option: OptionsTypes[]) => action(option);

const clearHandler = (action: (option: OptionsTypes[]) => void) => () => action([]);

export const SelectDropdown = (tmpVal: OptionsTypes[], title: string,
    action: (val: OptionsTypes[]) => void, getOptions: () => void,
    options: OptionsTypes[], isLoading: boolean, getData?: (num: number) => string) => {

    const loadingOptions = [{
        label: <div className={styles.loadingOptions}><Spin /></div>,
        value: ""
    }];

    const targetOptions = isLoading ? loadingOptions : options;

    const localeOptions = getData ? targetOptions.map((targrtOption: OptionsTypes) =>
        ({ label: getData(Number(targrtOption.value)), value: targrtOption.value })) : targetOptions;

    useEffect(() => {
        getOptions();
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
            allowClear
            options={localeOptions}
            open={true}
            className={styles.select}
            popupClassName={styles.popup}
        />
    );
}