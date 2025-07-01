import React, { useEffect, useRef, useState } from "react";

interface TimerProps {
  resetTrigger: number;
}

const Timer: React.FC<TimerProps> = ({ resetTrigger }) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTrigger]);

  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="timer-container">
      <div className="timer-content">
        <div className="timer-indicator"></div>
        <span className="timer-text">{mins}:{secs}</span>
      </div>
    </div>
  );
};

export default Timer;