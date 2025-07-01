import React from "react";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => (
  <button
    onClick={onReset}
    style={{
      marginTop: "1rem",
      padding: "0.5rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "bold",
      background: "#ff9800",
      color: "#fff",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      transition: "background 0.2s",
    }}
  >
    Reset Game
  </button>
);

export default ResetButton;
