import { Pagination, PaginationProps } from "antd";
import { IntlProps } from "../../types";

import styles from "./RobotTasksPagination.module.css";
import { robotsTasksStore } from "@/entities";
import { observer } from "mobx-react-lite";

export const RobotTasksPagination = observer(({ intl }: IntlProps) => {

    const {
        store: {
            tasksPageSize, tasksTotalPages, tasksCurrentPage, setTasksPageSize, setTasksCurrentPage
        },
    } = robotsTasksStore;

    const titleTotal = intl.formatMessage({ id: 'page.robotsTasks.pagination.total' });
    const titlePage = intl.formatMessage({ id: 'page.robotsTasks.pagination.page' });

    const sizeChangeHandler = (_: number, size: number) => {
        setTasksPageSize(size);
    }

    const changeHandler = (val: number) => {
        if (tasksCurrentPage !== val) {
            setTasksCurrentPage(val);
        }
    }

    return (
        <div className={styles.container}>
            <Pagination
                total={tasksTotalPages * tasksPageSize}
                showSizeChanger
                showQuickJumper
                showTotal={() => `${titleTotal} ${tasksTotalPages} ${titlePage}`}
                current={tasksCurrentPage}
                pageSize={tasksPageSize}
                onShowSizeChange={sizeChangeHandler}
                onChange={changeHandler}
            />
        </div>
    );
});