import { Button, Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { MarginBottomWrapper } from '@/shared';

import styles from "./index.module.css";

type DropdownBarProps = {
    data: any;
    barItem: (key: string) => JSX.Element;
    dropdownTitle: string;
    openingControl: (val: boolean) => void;
}

type PropExecType = (key: string, index: number) => { label: JSX.Element, key: string };

export const DropdownBar = ({ data, dropdownTitle, barItem, openingControl }: DropdownBarProps) => {

    const loopThroughObjRecurs = (obj: any, propExec: PropExecType, count: number) => {
        return Object.keys(obj).map((currentKey, index) => {
            if (typeof obj[currentKey] === 'object' && obj[currentKey] !== null) {
                const label = obj[currentKey]["label"];
                delete obj[currentKey]["label"];
                return {
                    label,
                    key: index + count,
                    children: [...loopThroughObjRecurs(obj[currentKey], propExec, ++count + index)]
                };
            } else if (obj.hasOwnProperty(currentKey)) {
                return propExec(currentKey, index + count);
            }
        })
    }

    const callbackLoop = (key: string, index: number) => {
        return { label: barItem(key), key: index + key }
    }

    const items: MenuProps['items'] = loopThroughObjRecurs(data, callbackLoop, 0).map((item: any) =>
        item.children.length ? { ...item } : { label: item.label, key: item.key })

    return <div className={styles.container}>
        <Dropdown
            overlayStyle={{ minWidth: 0 }}
            menu={{ items }}
            onOpenChange={openingControl}
        >
            <MarginBottomWrapper>
                <Button>
                    <Space>
                        {dropdownTitle}
                        <DownOutlined />
                    </Space>
                </Button>
            </MarginBottomWrapper>
        </Dropdown>
    </div>
}