import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useRef, useState } from "react";
import PlayerInfo from "./components/PlayerInfo";
import ResetButton from "./components/ResetButton";
import Timer from "./components/Timer"; // <-- Import

function App() {
  const chessRef = useRef(new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());
  const [pgn, setPgn] = useState(chessRef.current.pgn());
  const [resetCount, setResetCount] = useState(0); // For timer reset

  function onDrop(source: string, target: string) {
    const game = chessRef.current;
    const move = game.move({
      from: source,
      to: target,
      promotion: "q",
    });

    if (move === null) return false;

    setFen(game.fen());
    setPgn(game.pgn());
    return true;
  }

  // Reset game handler
  function handleReset() {
    chessRef.current.reset();
    setFen(chessRef.current.fen());
    setPgn(chessRef.current.pgn());
    setResetCount((c) => c + 1); // Reset timer
  }

  // Determine whose turn it is
  const turn = chessRef.current.turn(); // 'w' or 'b'

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#1e1e1e",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Top right controls */}
      <div style={{ position: "absolute", top: 24, right: 32, zIndex: 10, display: "flex", alignItems: "center" }}>
        <Timer resetTrigger={resetCount} />
        <ResetButton onReset={handleReset} />
      </div>

      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>AlgoChess</h1>

      <PlayerInfo name="Black" color="black" active={turn === "b"} />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardWidth={Math.min(window.innerWidth * 0.9, 500)}
        />
      </div>

      <PlayerInfo name="White" color="white" active={turn === "w"} />

      <div style={{ marginTop: "1.5rem", fontSize: "1.2rem", textAlign: "center" }}>
        <p>Status: {chessRef.current.isGameOver() ? "Game Over" : "In Progress"}</p>
      </div>
    </div>
  );
}

export default App;
