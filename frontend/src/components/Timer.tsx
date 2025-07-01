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
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg px-4 py-2 font-mono text-lg font-bold shadow-lg border border-slate-600">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="tracking-wider">{mins}:{secs}</span>
      </div>
    </div>
  );
};

export default Timer;