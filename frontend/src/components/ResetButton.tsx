import React from "react";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => (
  <button
    onClick={onReset}
    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 
               text-white font-bold py-3 px-6 rounded-lg shadow-lg 
               transform hover:scale-105 active:scale-95 transition-all duration-200
               focus:outline-none focus:ring-4 focus:ring-orange-300"
  >
    🔄 Reset Game
  </button>
);

export default ResetButton;