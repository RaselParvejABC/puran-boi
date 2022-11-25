import React from 'react';
import { Modal, Button } from 'react-daisyui';

const InformDialog = ({ title, message, onClose, isOpen }) => {
  return (
    <Modal open={isOpen}>
      <Modal.Header className="font-bold">{title}</Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Actions>
        <Button onClick={() => onClose()}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default InformDialog;
