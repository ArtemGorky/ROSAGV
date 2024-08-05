import { Button, Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { MarginBottomWrapper } from '@/shared';

type DropdownBarProps = {
    data: any;
    barItem: any;
}

export const DropdownBar = ({ data, barItem }: DropdownBarProps) => {

    function loopThroughObjRecurs(obj: any, propExec: any, count: any) {
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
                return propExec(obj[currentKey], currentKey, index + count);
            }
        })
    }

    const callbackLoop = (label: any, key: any, index: any) => {
        return { label: barItem(label, key), key: index + key }
    }

    const items: MenuProps['items'] = loopThroughObjRecurs(data, callbackLoop, 0);

    return <Dropdown
        overlayStyle={{ minWidth: 0 }}
        menu={{ items }}
    >
        <MarginBottomWrapper>
            <Button>
                <Space>
                    Фильтровать
                    <DownOutlined />
                </Space>
            </Button>
        </MarginBottomWrapper>
    </Dropdown>
}