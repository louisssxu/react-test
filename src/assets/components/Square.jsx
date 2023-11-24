import React, { useState } from "react";

export default function Square({
  index,
  isTarget,
  isRevealed,
  addClickedSquare,
  clickedSquares,
  loseAttempt,
}) {
  const handleClick = () => {
    addClickedSquare(index);
    if (!isTarget) {
      loseAttempt();
    }
  };

  if (isRevealed) {
    return <div className={isTarget ? "square highlighted" : "square"}></div>;
  }

  if (clickedSquares.includes(index)) {
    return (
      <div
        className={isTarget ? "square highlighted" : "square wrong-square"}
      ></div>
    );
  }

  return <div className="square" onClick={handleClick}></div>;
}
