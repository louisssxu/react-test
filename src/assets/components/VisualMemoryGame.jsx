import React, { useEffect, useState } from "react";
import Square from "./Square";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function visualMemoryGame({ endGame, setLevelReached }) {
  const [level, setLevel] = useState(1);
  const [squareCount, setSquareCount] = useState(3);
  const [boxRoot, setBoxRoot] = useState(3);
  const [isRevealed, setIsRevealed] = useState(true);
  const [targetIndexes, setTargetIndexes] = useState(new Set());
  const [clickedSquares, setClickedSquares] = useState([]);
  const [attempts, setAttempts] = useState(3);
  const [lives, setLives] = useState(3);

  let squaresArr = [];

  const style = {
    gridTemplateColumns: `repeat(${boxRoot} , 1fr)`,
    gridTemplateRows: `repeat(${boxRoot} , 1fr)`,
  };

  function addClickedSquare(i) {
    const newClickedSquares = [...clickedSquares];
    newClickedSquares.push(i);
    setClickedSquares(newClickedSquares);
  }

  function clearClickedSquares() {
    setClickedSquares([]);
  }

  function hasNoAttempts() {
    return attempts <= 0;
  }

  function loseLife() {
    setLives(() => lives - 1);
  }

  function hasNoLives() {
    return lives <= 0;
  }

  function resetAttempts() {
    setAttempts(3);
  }

  function loseAttempt() {
    setAttempts(() => attempts - 1);
  }

  function levelIsComplete() {
    if (targetIndexes.size == 0) return false;
    let ret = true;
    targetIndexes.forEach((indexe) => {
      if (!clickedSquares.includes(indexe)) {
        ret = false;
      }
    });
    return ret;
  }

  function nextLevel() {
    setTimeout(() => {
      setLevel(() => level + 1);
      setSquareCount(() => squareCount + 1);
    }, 100);
  }

  function startLife() {
    generateRandomTargets();
    clearClickedSquares();
    preview(2000);
  }

  function generateRandomTargets() {
    const nums = new Set();
    while (nums.size < squareCount) {
      nums.add(Math.floor(Math.random() * boxRoot * boxRoot));
    }
    console.log(nums);
    setTargetIndexes(nums);
  }

  function updateRoot() {
    if (level % 3 == 0) {
      setBoxRoot((boxRoot) => boxRoot + 1);
    }
  }

  function populate() {
    for (let i = 0; i < boxRoot * boxRoot; i++) {
      squaresArr.push(
        <Square
          key={i}
          index={i}
          isTarget={targetIndexes.has(i) ? true : false}
          isRevealed={isRevealed}
          addClickedSquare={addClickedSquare}
          clickedSquares={clickedSquares}
          loseAttempt={loseAttempt}
        ></Square>
      );
    }
  }

  function lose() {
    console.log("You Lose");
    // call loss function
    setLevelReached(level);
    endGame();
  }

  function preview(time) {
    setIsRevealed(true);
    setTimeout(() => {
      setIsRevealed(false);
    }, time);
  }

  function startLevel() {
    resetAttempts();
    startLife();
  }

  useEffect(() => {
    updateRoot();
  }, [squareCount]);

  useEffect(() => {
    console.log(clickedSquares);
    if (levelIsComplete()) {
      nextLevel();
    }
    if (hasNoAttempts()) {
      console.log("failed");
      resetAttempts();
      loseLife();
      startLife();
    }
    if (hasNoLives()) {
      lose();
    }
  }, [clickedSquares]);

  useEffect(() => {
    startLevel();
  }, [level]);

  useEffect(() => {
    populate();
  }, [targetIndexes]);

  populate();
  return (
    <>
      <div className="game-box" style={style}>
        <h1 className="game-info-center"> level {level}</h1>
        <h1 className="game-info-right ">
          {Array.from(Array(lives)).map(() => {
            return <FontAwesomeIcon className="icon" icon={faHeart} />;
          })}
        </h1>
        {squaresArr}
      </div>
    </>
  );
}
