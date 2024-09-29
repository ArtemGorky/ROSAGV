import { Button } from "antd";
import { MouseEvent } from "react";

const clickHandler = (action: () => void) => (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    action();
};

export const ResetBtnDropdown = (title: string, action: () => void) => <Button onClick={clickHandler(action)}>{title}</Button>
