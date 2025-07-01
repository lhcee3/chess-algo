import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useRef, useState } from "react";
import PlayerInfo from "./components/PlayerInfo";
import ResetButton from "./components/ResetButton";
import Timer from "./components/Timer";

function App() {
  const chessRef = useRef(new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());
  const [pgn, setPgn] = useState(chessRef.current.pgn());
  const [resetCount, setResetCount] = useState(0);

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

  function handleReset() {
    chessRef.current.reset();
    setFen(chessRef.current.fen());
    setPgn(chessRef.current.pgn());
    setResetCount((c) => c + 1);
  }

  const turn = chessRef.current.turn();
  const gameStatus = chessRef.current.isGameOver()
    ? chessRef.current.isCheckmate()
      ? `Checkmate! ${turn === "w" ? "Black" : "White"} wins!`
      : chessRef.current.isDraw()
      ? "Draw!"
      : "Game Over"
    : chessRef.current.inCheck()
    ? `${turn === "w" ? "White" : "Black"} is in Check!`
    : "Game in Progress";

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <span style={{ fontSize: "2rem", margin: "auto" }}>♚</span>
              </div>
              <h1 className="app-title">AlgoChess</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Timer resetTrigger={resetCount} />
              <ResetButton onReset={handleReset} />
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="game-status">{gameStatus}</div>
        <div className="players-board">
          <PlayerInfo name="Black Player" color="black" active={turn === "b"} />
          <div className="board-container">
            <Chessboard
              position={fen}
              onPieceDrop={onDrop}
              boardWidth={Math.min(
                typeof window !== "undefined" ? window.innerWidth * 0.8 : 500,
                500
              )}
              customBoardStyle={{
                borderRadius: "12px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
            />
          </div>
          <PlayerInfo name="White Player" color="white" active={turn === "w"} />
        </div>
        <div className="game-info">
          <div>
            <h3>Game Statistics</h3>
            <div>
              <div>
                <span>Moves:</span>
                <span>{Math.ceil(chessRef.current.history().length / 2)}</span>
              </div>
              <div>
                <span>Current Turn:</span>
                <span>{turn === "w" ? "White" : "Black"}</span>
              </div>
              <div>
                <span>Status:</span>
                <span>
                  {chessRef.current.isGameOver() ? "Finished" : "Active"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3>About AlgoChess</h3>
            <p>
              A decentralized chess application built on Algorand blockchain.
              Play chess with provable moves and transparent game state.
            </p>
            <div>
              <span>Algorand</span>
              <span>DApp</span>
              <span>Chess</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div>
          <p>Powered by Algorand • Built with React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
}

export default App;