import React from 'react';
import { Modal } from 'antd';

const PointInfoWindow = ({ open, onClose, point }) => {
  if (!point) return null;

  return (
    <Modal
      title="Point Information"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <p><strong>Name:</strong> {point.properties.name}</p>
      <p><strong>Coordinates:</strong> [{point.geometry.coordinates[1]}, {point.geometry.coordinates[0]}]</p>
      <pre><strong>Properties:</strong> {JSON.stringify(point.properties, null, 2)}</pre>
    </Modal>
  );
};

export default PointInfoWindow;
