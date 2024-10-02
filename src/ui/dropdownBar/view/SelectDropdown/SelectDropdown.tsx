import { MouseEvent, useEffect } from "react";
import { Spin } from 'antd';
import styles from './SelectDropdown.module.css';
import Select from "antd/es/select";
import { OptionsTypes } from "@/shared/types";

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

const changeHandler = (action: (option: OptionsTypes) => void) => (_: any, option: OptionsTypes) => action(option);

const clearHandler = (action: (option: OptionsTypes) => void) => () => action({ value: "0", label: null });

export const SelectDropdown = (tmpVal: string, title: string,
    action: (val: OptionsTypes) => void, getOptions: () => void,
    options: OptionsTypes[], isLoading: boolean) => {

    const loadingOptions = [{
        label: <div className={styles.loadingOptions}><Spin /></div>,
        value: ""
    }];

    const targetOptions = isLoading ? loadingOptions : options;

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <Select
            style={{ width: 120 }}
            onChange={changeHandler(action)}
            onClear={clearHandler(action)}
            onClick={clickHandler}
            value={tmpVal}
            placeholder={title}
            allowClear
            options={targetOptions}
            open={true}
            className={styles.select}
            popupClassName={styles.popup}
        />
    );
}