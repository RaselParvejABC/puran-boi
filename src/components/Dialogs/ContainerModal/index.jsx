import React from 'react';
import { Modal, Button } from 'react-daisyui';

const ContainerModal = ({ onClose, isOpen, children }) => {
  return (
    <Modal open={isOpen}>
      <Modal.Header className="flex justify-end">
        <Button color="warning" onClick={() => onClose()}>
          Close
        </Button>
      </Modal.Header>

      {children(onClose)}
    </Modal>
  );
};

export default ContainerModal;
