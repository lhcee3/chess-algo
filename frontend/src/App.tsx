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
      ? `Checkmate! ${turn === 'w' ? 'Black' : 'White'} wins!`
      : chessRef.current.isDraw() 
        ? "Draw!"
        : "Game Over"
    : chessRef.current.inCheck()
      ? `${turn === 'w' ? 'White' : 'Black'} is in Check!`
      : "Game in Progress";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="relative bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">♚</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AlgoChess
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Timer resetTrigger={resetCount} />
              <ResetButton onReset={handleReset} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Status */}
          <div className="text-center mb-8">
            <div className={`inline-block px-6 py-3 rounded-full font-semibold text-lg ${
              chessRef.current.isGameOver()
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                : chessRef.current.inCheck()
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                  : "bg-gradient-to-r from-green-500 to-blue-500 text-white"
            } shadow-lg`}>
              {gameStatus}
            </div>
          </div>

          {/* Players and Board */}
          <div className="space-y-6">
            {/* Black Player */}
            <PlayerInfo name="Black Player" color="black" active={turn === "b"} />
            
            {/* Chess Board */}
            <div className="flex justify-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
                <Chessboard
                  position={fen}
                  onPieceDrop={onDrop}
                  boardWidth={Math.min(typeof window !== 'undefined' ? window.innerWidth * 0.8 : 500, 500)}
                  customBoardStyle={{
                    borderRadius: "12px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                />
              </div>
            </div>
            
            {/* White Player */}
            <PlayerInfo name="White Player" color="white" active={turn === "w"} />
          </div>

          {/* Game Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Game Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Moves:</span>
                  <span className="font-mono">{Math.ceil(chessRef.current.history().length / 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Current Turn:</span>
                  <span className={`font-semibold ${turn === 'w' ? 'text-amber-300' : 'text-slate-300'}`}>
                    {turn === 'w' ? 'White' : 'Black'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className={`font-semibold ${
                    chessRef.current.isGameOver() ? 'text-red-300' : 'text-green-300'
                  }`}>
                    {chessRef.current.isGameOver() ? 'Finished' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">About AlgoChess</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                A decentralized chess application built on Algorand blockchain. 
                Play chess with provable moves and transparent game state.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                  Algorand
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                  DApp
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                  Chess
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-4">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          <p>Powered by Algorand • Built with React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
}

export default App;