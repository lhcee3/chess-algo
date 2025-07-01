import React, { useEffect, useRef, useState } from "react";

interface TimerProps {
  resetTrigger: number; // Change this value to reset the timer
}

const Timer: React.FC<TimerProps> = ({ resetTrigger }) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSeconds(0); // Reset timer when resetTrigger changes
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTrigger]);

  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <span
      style={{
        background: "#222",
        color: "#fff",
        borderRadius: "0.5rem",
        padding: "0.4rem 1.2rem",
        fontWeight: "bold",
        fontSize: "1rem",
        marginRight: "1rem",
        letterSpacing: "1px",
        display: "inline-block",
        minWidth: "70px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {mins}:{secs}
    </span>
  );
};

export default Timer;