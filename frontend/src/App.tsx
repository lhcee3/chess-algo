import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useRef, useState } from "react";

function App() {
  const chessRef = useRef(new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());
  const [pgn, setPgn] = useState(chessRef.current.pgn());

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

  return (
    <div
      style={{
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
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>AlgoChess</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardWidth={Math.min(window.innerWidth * 0.9, 500)}
        />
      </div>

      <div style={{ marginTop: "1.5rem", fontSize: "1.2rem", textAlign: "center" }}>
        <p>Status: {chessRef.current.isGameOver() ? "Game Over" : "In Progress"}</p>
      </div>
    </div>
  );
}

export default App;
