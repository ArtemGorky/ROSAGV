import { ChangeEvent, MouseEvent } from "react";
import { Input } from 'antd';
import { BaseOptionType } from "antd/es/select";
import { DefaultOptionType } from "antd/es/cascader";

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

// const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {

// }

const changeHandler = (action: (val: string) => void) => (evt: ChangeEvent<HTMLInputElement>) => action(evt.target.value);

// const changeHandler = (action: (val: string) => void) => (value: string) => action(value);


// const clearHandler = (action: (val: string) => void) => () => action(null);

export const InputNumDropdown = (total: number, num: string, action: (val: string) => void) => {

    // const targetOptions = options.filter(item => item.value && ({
    //     label: item.value,
    //     value: item.value
    // }));

    return (

        <Input
            style={{ width: "100px" }}
            type={"number"}
            onClick={clickHandler}
            min={0}
            max={total}
            onChange={changeHandler(action)}  // select
            value={num}
        />

        // <AutoComplete
        //     onClick={clickHandler}
        //     onChange={changeHandler(action)}
        //     onClear={clearHandler(action)}
        //     allowClear={true}
        //     style={{ width: 200 }}
        //     options={targetOptions}
        //     placeholder={title}
        //     filterOption={(inputValue, option) =>
        //         (option!.value as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        //     }
        //     open={true}
        //     className={styles.autoComplete}
        //     popupClassName={styles.popup}
        // />
    );
}