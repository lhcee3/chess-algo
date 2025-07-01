import React from "react";

interface PlayerInfoProps {
  name: string;
  color: "white" | "black";
  active?: boolean;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ name, color, active }) => (
  <div className={`
    w-full max-w-md mx-auto text-center py-4 px-6 rounded-xl font-semibold text-lg
    transition-all duration-300 transform
    ${color === "white" 
      ? "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900 border-2 border-amber-200" 
      : "bg-gradient-to-r from-slate-700 to-slate-800 text-white border-2 border-slate-600"
    }
    ${active 
      ? "ring-4 ring-blue-400 ring-opacity-75 shadow-lg scale-105 animate-pulse" 
      : "shadow-md hover:shadow-lg"
    }
  `}>
    <div className="flex items-center justify-center gap-3">
      <div className={`w-3 h-3 rounded-full ${
        color === "white" ? "bg-white border-2 border-amber-800" : "bg-slate-900 border-2 border-white"
      }`}></div>
      <span>{name}</span>
      {active && (
        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
      )}
    </div>
  </div>
);

export default PlayerInfo;