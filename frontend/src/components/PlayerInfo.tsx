import React from "react";

interface PlayerInfoProps {
  name: string;
  color: "white" | "black";
  active?: boolean;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ name, color, active }) => (
  <div
    className={
      `player-info ` +
      (color === "white" ? "player-white" : "player-black") +
      (active ? " player-active" : " player-inactive")
    }
  >
    <div className="player-content">
      <div className="player-color-indicator"></div>
      <span>{name}</span>
      {active && <div className="player-active-indicator"></div>}
    </div>
  </div>
);

export default PlayerInfo;