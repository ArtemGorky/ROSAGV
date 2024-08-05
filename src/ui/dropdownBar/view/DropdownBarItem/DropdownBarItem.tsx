import { MouseEvent } from "react";

const containerStyle = {
    minWidth: 50,
    display: "flex",
    justifyContent: "center"
};

const clickHandler = (action: any) => (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();

    action();
}

export const DropdownBarItem = (label: string, action: any) => {
    return (
        <div
            style={containerStyle}
            onClick={clickHandler(action)}
        >
            {label}
        </div>
    );
}