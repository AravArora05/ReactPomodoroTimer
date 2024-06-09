import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const TimerDisplay = ({ timeRemaining, currentSessionType, handleStartStop, startStopButtonLabel }) => {
  const formattedTime = moment.duration(timeRemaining, 's').format('mm:ss', { trim: false });

  return (
    <div className="text-center">
      <p id="timer-label">{currentSessionType}</p>
      <p id="time-left">{formattedTime}</p>
      <button id="start_stop" className="btn btn-primary" onClick={handleStartStop}>
        {startStopButtonLabel}
      </button>
    </div>
  );
};

export default TimerDisplay;
