import React from 'react';
import { Modal } from 'react-daisyui';
import MySpinnerRoundFilled from '../../Spinners/MySpinnerRoundFilled';

const WaitDialog = () => {
  return (
    <div>
      <Modal open={true}>
        <Modal.Header className="font-bold">Wait!</Modal.Header>

        <Modal.Body>
          <MySpinnerRoundFilled size={50} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WaitDialog;
