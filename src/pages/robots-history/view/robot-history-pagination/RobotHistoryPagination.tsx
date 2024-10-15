import { Pagination } from "antd";

import styles from "./RobotHistoryPagination.module.css";
import { RobotsHistoryStore } from "@/entities";
import { observer } from "mobx-react-lite";
import { useDeviceDetect } from "@/hooks";
import { IntlProps } from "@/shared/types";

export const RobotHistoryPagination = observer(({ intl }: IntlProps) => {

    const { isMobile } = useDeviceDetect();

    const {
        store: {
            robotsHistoryCurrentPage, robotsHistoryPageSize, robotsHistoryTotalPages,
            setRobotsHistoryPageSize, setHistoryCurrentPage
        }
    } = RobotsHistoryStore;

    const titleTotal = intl.formatMessage({ id: 'page.robotsTasks.pagination.total' });
    const titlePage = intl.formatMessage({ id: 'page.robotsTasks.pagination.page' });

    const sizeChangeHandler = (_: number, size: number) => {
        setRobotsHistoryPageSize(size);
    }

    const changeHandler = (val: number) => {
        if (robotsHistoryCurrentPage !== val) {
            setHistoryCurrentPage(val);
        }
    }

    return (
        <div style={{ justifyContent: isMobile ? 'center' : 'right' }} className={styles.container}>
            <Pagination
                total={robotsHistoryTotalPages * robotsHistoryPageSize}
                showSizeChanger={!isMobile}
                showQuickJumper={!isMobile}
                showTotal={!isMobile ? () => `${titleTotal} ${robotsHistoryTotalPages} ${titlePage}` : null}
                current={robotsHistoryCurrentPage}
                pageSize={robotsHistoryPageSize}
                onShowSizeChange={sizeChangeHandler}
                onChange={changeHandler}
            />
        </div>
    );
});