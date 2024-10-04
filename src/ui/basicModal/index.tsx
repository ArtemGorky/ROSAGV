import { Modal } from "antd"

type Props = {
    title: string;
    content: string;
    isOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

export const BasicModal = ({ title, content, isOpen, handleOk, handleCancel }: Props) => {
    return <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{content}</p>
    </Modal>
}