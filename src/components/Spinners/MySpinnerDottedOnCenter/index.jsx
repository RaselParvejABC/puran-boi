import React from 'react';
import { SpinnerDotted } from 'spinners-react';

const MySpinnerDottedOnCenter = ({ size }) => {
  return (
    <div className="flex flex-row justify-center mt-6">
      <SpinnerDotted size={size} />
    </div>
  );
};

export default MySpinnerDottedOnCenter;
