import { MouseEvent } from "react";
import { DatePicker } from 'antd';
import styles from './DatePickerDropdown.module.css';
import moment, { Moment } from "moment";
import { useDeviceDetect } from "@/hooks";
import momentGenerateConfig from 'rc-picker/lib/generate/moment';

const { RangePicker } = DatePicker.generatePicker<Moment>(momentGenerateConfig);

const clickHandler = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();

const calendarChangeHandler = (action: (val: string[]) => void) => (_: any, dateString: string[]) => action(dateString);

export const DatePickerDropdown = (action: (val: string[]) => void, startDate: string, endDate: string) => {

    const { isMobile } = useDeviceDetect();

    return (
        <div className={styles.rangePickerContainer} onClick={clickHandler}>
            {isMobile
                ? <RangePicker
                    className={styles.rangePickerMobile}
                    popupClassName={styles.popupMobile}
                    value={[
                        startDate ? moment(startDate) : moment(),
                        endDate ? moment(endDate) : moment()
                    ]}
                    onCalendarChange={calendarChangeHandler(action)}
                />
                : <RangePicker
                    className={styles.rangePicker}
                    popupClassName={styles.popup}
                    open={isMobile ? null : true}
                    value={[
                        startDate ? moment(startDate) : moment(),
                        endDate ? moment(endDate) : moment()
                    ]}
                    onCalendarChange={calendarChangeHandler(action)}
                />}
        </div>
    );
}