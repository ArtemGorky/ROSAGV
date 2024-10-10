import { Modal } from "antd"
import { ReactNode } from "react";

type Props = {
    title: string;
    content: string | ReactNode;
    isOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

export const BasicModal = ({ title, content, isOpen, handleOk, handleCancel }: Props) => {
    return <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>{content}</div>
    </Modal>
}