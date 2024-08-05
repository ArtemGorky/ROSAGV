import { parksAndRobotsStore } from "@/entities";
import { Checkbox } from "antd";
import { observer } from "mobx-react-lite";

const checkboxGroupStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column"
}

type CheckboxGroupDropdownProps = {
    currentState: string[];
    robotsState: { value: string }[];
    action: (items: string[]) => void;
}

export const CheckboxGroupDropdown = observer(({ currentState, robotsState, action }: CheckboxGroupDropdownProps) => {

    const options = robotsState.map((item) => item.value);

    const onChange = (list: string[]) => {
        action(list);
    };

    const CheckboxGroup = Checkbox.Group;

    return <CheckboxGroup style={checkboxGroupStyles} options={options} value={currentState} onChange={onChange} />
});