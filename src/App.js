import { useState, useEffect, useRef } from 'react';
import './App.css';
import BreakControl from './BreakControl';
import SessionControl from './SessionControl';
import TimerDisplay from './TimerDisplay';

function App() {
  const audioRef = useRef(null);
  const [breakDuration, setBreakDuration] = useState(300);
  const [sessionDuration, setSessionDuration] = useState(1500);
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  const [timeRemaining, setTimeRemaining] = useState(sessionDuration);
  const [intervalId, setIntervalId] = useState(null);

  const handleDecreaseBreak = () => {
    setBreakDuration(prevDuration => Math.max(60, prevDuration - 60));
  };

  const handleIncreaseBreak = () => {
    setBreakDuration(prevDuration => {
      const newDuration = prevDuration + 60;
      return newDuration > 3600 ? 3600 : newDuration;
    });
  };

  const handleDecreaseSession = () => {
    setSessionDuration(prevDuration => Math.max(60, prevDuration - 60));
  };

  const handleIncreaseSession = () => {
    setSessionDuration(prevDuration => Math.min(3600, prevDuration + 60));
  };

  const handleReset = () => {
    audioRef.current.load();
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setBreakDuration(300);
    setSessionDuration(1500);
    setCurrentSessionType("Session");
    setTimeRemaining(1500);
  };

  useEffect(() => {
    setTimeRemaining(currentSessionType === "Session" ? sessionDuration : breakDuration);
  }, [sessionDuration, breakDuration, currentSessionType]);

  const isTimerRunning = intervalId !== null;

  const handleStartStop = () => {
    if (isTimerRunning) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeRemaining(prevTime => {
          const newTime = prevTime - 1;
          if (newTime >= 0) {
            return newTime;
          } else {
            audioRef.current.play();
            setCurrentSessionType(prevType => {
              if (prevType === 'Session') {
                setTimeRemaining(breakDuration);
                return 'Break';
              } else {
                setTimeRemaining(sessionDuration);
                return 'Session';
              }
            });
            return 0;
          }
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  return (
    <div className="App">
      <BreakControl
        breakDuration={breakDuration}
        handleDecreaseBreak={handleDecreaseBreak}
        handleIncreaseBreak={handleIncreaseBreak}
      />
      <SessionControl
        sessionDuration={sessionDuration}
        handleDecreaseSession={handleDecreaseSession}
        handleIncreaseSession={handleIncreaseSession}
      />
      <TimerDisplay
        timeRemaining={timeRemaining}
        currentSessionType={currentSessionType}
        handleStartStop={handleStartStop}
        startStopButtonLabel={isTimerRunning ? "Stop" : "Start"}
      />
      <button id="reset" onClick={handleReset}>Reset</button>
      <audio id="beep" ref={audioRef}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg"></source>
      </audio>
    </div>
  );
}

export default App;
