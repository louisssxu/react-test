import React, { useState } from "react";
import VisualMemoryGame from "../components/VisualMemoryGame";

export default function VisualMemoryPage() {
  const [started, setStarted] = useState(false);
  const [levelReached, setLevelReached] = useState(0);

  function startGame() {
    setStarted(true);
  }

  function endGame() {
    setStarted(false);
  }

  return (
    <div className="page">
      <h1>Visual Memory Test</h1>

      {started ? (
        <VisualMemoryGame
          endGame={endGame}
          setLevelReached={setLevelReached}
        ></VisualMemoryGame>
      ) : (
        <button onClick={startGame}>start</button>
      )}
    </div>
  );
}
