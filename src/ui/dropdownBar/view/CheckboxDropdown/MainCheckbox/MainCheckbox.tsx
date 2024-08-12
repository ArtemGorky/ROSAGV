import { Checkbox, CheckboxProps } from "antd";
import { observer } from "mobx-react-lite";
import { MouseEvent } from "react";

type MainCheckboxProps = {
    clickHandler: (evt: MouseEvent<HTMLDivElement>) => void;
    action: (items: string[]) => void;
    currentState: string[];
    robotsState: { value: string }[];
    title: string;
}

export const MainCheckbox = observer(({ clickHandler, action, currentState, robotsState, title }: MainCheckboxProps) => {

    const plainOptions = robotsState.map(items => items.value);

    const indeterminate = currentState.length > 0 && currentState.length < plainOptions.length;

    const checkAll = plainOptions.length === currentState.length;

    const onChange: CheckboxProps['onChange'] = (evt) => {
        action(evt.target.checked ? plainOptions : []);
    };

    return (
        <Checkbox onClick={clickHandler} indeterminate={indeterminate} onChange={onChange} checked={checkAll}>
            {title}
        </Checkbox>
    );

});