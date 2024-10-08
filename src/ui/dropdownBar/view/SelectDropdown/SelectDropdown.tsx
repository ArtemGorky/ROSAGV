import { KeyboardEvent, MouseEvent, useEffect } from "react";
import { Spin } from 'antd';
import styles from './SelectDropdown.module.css';
import Select from "antd/es/select";
import { OptionsTypes } from "@/shared/types";
import { useDeviceDetect } from "@/hooks";

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();
const keyDownHandler = (evt: KeyboardEvent<HTMLDivElement>) => evt.stopPropagation();

const changeHandler = (action: (option: OptionsTypes[]) => void) => (_: any, option: OptionsTypes[]) => action(option);

const clearHandler = (action: (option: OptionsTypes[]) => void) => () => action([]);

export const SelectDropdown = (
    tmpVal: OptionsTypes[], title: string, action: (val: OptionsTypes[]) => void,
    options: OptionsTypes[], isLoading: boolean, getOptions?: () => void, getData?: (num: string) => string, maxCount?: number
) => {

    const { isMobile } = useDeviceDetect();

    const loadingOptions = [{
        label: <div className={styles.loadingOptions}><Spin /></div>,
        value: "",
        id: 0
    }];

    const targetOptions = isLoading ? loadingOptions : options;

    const localeOptions = getData ? targetOptions.map((targrtOption: OptionsTypes) =>
        ({ label: getData(targrtOption.value), value: targrtOption.value, id: targrtOption.id })) : targetOptions;

    useEffect(() => {
        getOptions && getOptions();
    }, []);

    return (
        <Select
            mode="multiple"
            style={{ width: 240, marginLeft: isMobile ? "-100px" : "0" }}
            onChange={changeHandler(action)}
            onClear={clearHandler(action)}
            onKeyDown={keyDownHandler}
            onClick={clickHandler}
            value={tmpVal}
            placeholder={title}
            maxCount={maxCount}
            allowClear
            options={localeOptions}
            open={true}
            className={isMobile ? styles.selectMobile : styles.select}
            popupClassName={isMobile ? styles.popupMobile : styles.popup}
        />
    );
}