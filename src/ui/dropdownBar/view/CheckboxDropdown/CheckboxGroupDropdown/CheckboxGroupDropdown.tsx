import { Checkbox } from "antd";
import { observer } from "mobx-react-lite";

const checkboxGroupStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column"
}

type CheckboxGroupDropdownProps = {
    currentState: string[];
    state: { value: string }[];
    emptyValue: string;
    action: (items: string[]) => void;
}

export const CheckboxGroupDropdown = observer(({ currentState, state, emptyValue, action }: CheckboxGroupDropdownProps) => {

    const options = state.map((item) => ({ label: item.value === "" ? emptyValue : item.value, value: item.value }));

    const onChange = (list: string[]) => {
        action(list);
    };

    const CheckboxGroup = Checkbox.Group;

    return <CheckboxGroup style={checkboxGroupStyles} options={options} value={currentState} onChange={onChange} />
});