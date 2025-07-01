import React from "react";

interface PlayerInfoProps {
  name: string;
  color: "white" | "black";
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ name, color }) => (
  <div
    style={{
      width: Math.min(window.innerWidth * 0.9, 500),
      textAlign: "center",
      margin: color === "black" ? "0 0 0.5rem 0" : "0.5rem 0 0 0",
      fontWeight: "bold",
      fontSize: "1.1rem",
      color: color === "white" ? "#fff" : "#222",
      background: color === "white" ? "#b58863" : "#f0d9b5",
      borderRadius: "0.5rem",
      padding: "0.3rem 0",
    }}
  >
    {name}
  </div>
);

export default PlayerInfo;