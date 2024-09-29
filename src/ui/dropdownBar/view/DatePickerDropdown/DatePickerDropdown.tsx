import { MouseEvent } from "react";
import { DatePicker } from 'antd';
import styles from './DatePickerDropdown.module.css';

const { RangePicker } = DatePicker;

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

const calendarChangeHandler = (action: (val: string[]) => void) => (dateObject: any, dateString: string[]) => action(dateString);

export const DatePickerDropdown = (action: (val: string[]) => void) => {

    return (
        <div onClick={clickHandler}>
            <RangePicker
                className={styles.rangePicker}
                popupClassName={styles.popup}
                open={true}
                onCalendarChange={calendarChangeHandler(action)}
            />
        </div>
    );
}