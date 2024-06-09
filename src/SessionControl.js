import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const SessionControl = ({ sessionDuration, handleDecreaseSession, handleIncreaseSession }) => {
  const sessionLengthInMinutes = Math.floor(sessionDuration / 60);

  return (
    <>
      <p id="session-label">Session Length</p>
      <p id="session-length">{sessionLengthInMinutes}</p>
      <div>
        <button id="session-decrement" onClick={handleDecreaseSession}>
          <FontAwesomeIcon icon={faMinusSquare} />
        </button>
        <button id="session-increment" onClick={handleIncreaseSession}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      </div>
    </>
  );
};

export default SessionControl;
