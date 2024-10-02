import { MouseEvent } from "react";
import { DatePicker } from 'antd';
import styles from './DatePickerDropdown.module.css';
import moment, { Moment } from "moment";

import momentGenerateConfig from 'rc-picker/lib/generate/moment';

const { RangePicker } = DatePicker.generatePicker<Moment>(momentGenerateConfig);

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

const calendarChangeHandler = (action: (val: string[]) => void) => (dateObject: any, dateString: string[]) => action(dateString);

export const DatePickerDropdown = (action: (val: string[]) => void, startDate: string, endDate: string) => {

    // console.log(moment(startDate), endDate);

    return (
        <div onClick={clickHandler}>
            <RangePicker
                // value={[moment(startDate), moment(endDate)]}
                className={styles.rangePicker}
                popupClassName={styles.popup}
                // open={true}
                value={[
                    startDate ? moment(startDate) : moment(),
                    endDate ? moment(endDate) : moment()
                ]}
                onCalendarChange={calendarChangeHandler(action)}

            />
        </div>
    );
}