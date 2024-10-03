import { BtnDropdown } from "@/ui"
import { IntlProps } from "../../types";
import { robotsTasksStore } from "@/entities";
import { observer } from "mobx-react-lite";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { MarginBottomWrapper } from "@/shared";
import { DownOutlined } from "@ant-design/icons";

import styles from "./OrderDropdown.module.css";

export const OrderDropdown = observer(({ intl }: IntlProps) => {

    const orderDropdownTitle = intl.formatMessage({ id: 'page.robotsTasks.orderDropdown.title' });

    const {
        store: {
            setTasksOrder
        },
    } = robotsTasksStore;

    const items: MenuProps['items'] = [
        {
            label: BtnDropdown("name", intl.formatMessage({ id: 'page.robotsTasks.orderDropdown.name' }), setTasksOrder),
            key: 0
        },
        {
            label: BtnDropdown("task_id", intl.formatMessage({ id: 'page.robotsTasks.orderDropdown.taskId' }), setTasksOrder),
            key: 1
        },
        {
            label: BtnDropdown("command", intl.formatMessage({ id: 'page.robotsTasks.orderDropdown.command' }), setTasksOrder),
            key: 2
        },
        {
            label: BtnDropdown(
                "taskstate_timestamp",
                intl.formatMessage({ id: 'page.robotsTasks.orderDropdown.taskState' }),
                setTasksOrder
            ),
            key: 3
        },
        {
            label: BtnDropdown(
                "first_taskstate_timestamp",
                intl.formatMessage({ id: 'page.robotsTasks.orderDropdown.firstTaskState' }),
                setTasksOrder
            ),
            key: 4
        },
        {
            label: BtnDropdown("", intl.formatMessage({ id: 'page.robotsTasks.orderDropdown.cancel' }), setTasksOrder),
            key: 5
        },
    ];

    return <div className={styles.container}>
        <Dropdown
            overlayStyle={{ minWidth: 0 }}
            menu={{ items }}
            trigger={["click"]}
        >
            <MarginBottomWrapper>
                <Button>
                    <Space>
                        {orderDropdownTitle}
                        <DownOutlined />
                    </Space>
                </Button>
            </MarginBottomWrapper>
        </Dropdown>
    </div>
});