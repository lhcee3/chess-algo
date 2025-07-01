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
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#1e1e1e",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>AlgoChess</h1>

      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        boardWidth={Math.min(window.innerWidth * 0.9, 500)}
      />

      <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        <p>Status: {chessRef.current.isGameOver() ? "Game Over" : "In Progress"}</p>
      </div>
    </div>
  );
}

export default App;
