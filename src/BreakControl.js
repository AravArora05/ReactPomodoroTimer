import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const BreakControl = ({ breakDuration, handleDecreaseBreak, handleIncreaseBreak }) => {
  const breakLengthInMinutes = Math.floor(breakDuration / 60);

  return (
    <>
      <p id="break-label">Break Length</p>
      <p id="break-length">{breakLengthInMinutes}</p>
      <div>
        <button id="break-decrement" onClick={handleDecreaseBreak}>
          <FontAwesomeIcon icon={faMinusSquare} />
        </button>
        <button id="break-increment" onClick={handleIncreaseBreak}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      </div>
    </>
  );
};

export default BreakControl;
