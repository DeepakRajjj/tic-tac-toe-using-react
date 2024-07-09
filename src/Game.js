import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squaresCopy) || squaresCopy[index]) {
      return;
    }
    squaresCopy[index] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(squaresCopy);
    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleReset = () => {
    handleRestart();
    setScore({ X: 0, O: 0 });
  };

  const winner = calculateWinner(squares);
  let status = winner ? `Winner is ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div>{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <div>
        <button onClick={handleRestart}>Restart Game</button>
        <button onClick={handleReset}>Reset Game</button>
      </div>
      <div>
        <h2>Score</h2>
        <p>X: {score.X}</p>
        <p>O: {score.O}</p>
      </div>
    </div>
  );
};

// Utility function to calculate the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
