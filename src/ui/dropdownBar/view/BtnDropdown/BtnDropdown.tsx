import { Button } from "antd";
import { MouseEvent } from "react";

const clickHandler = (action: (val: number | null) => void, value: number | null) => (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    action(value);
};

export const BtnDropdown = (value: number | null, title: string, action: (val: number | null) => void) =>
    <Button onClick={clickHandler(action, value)}>{title}</Button>