import { IntlShape } from "react-intl";

export type IntlProps = {
    intl: IntlShape;
};

export type IssueTypes = {
    category: string;
    detail: { message: string }
}

export type ParksAndRobotsTypes = {
    name: string,
    status: string,
    task_id: string,
    unix_millis_time: number,
    battery: number,
    issues: IssueTypes[]
}