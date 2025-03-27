import { useState } from 'react';

export default function Game()
{
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState(Array(9).fill(null));
  const currentSquares = history[history.length - 1];

  return (
    <div className='game'>
      <div className='game-board'>
        <Board/>
      </div>
    </div>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    //можна зробити й без створення нового масиву, але так краще (immutability
    //наприклад задля історії ходів
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = 'X';
    }
    else{
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: " + winner;
  }
  else{
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className='status'>{status}</div>

      <div className="board-row">
        <Square value = {squares[0]} onSquareCLick = {() => handleClick(0)}/>
        <Square value = {squares[1]} onSquareCLick = {() => handleClick(1)}/>
        <Square value = {squares[2]} onSquareCLick = {() => handleClick(2)}/>  
      </div>

      <div className="board-row">
        <Square value = {squares[3]} onSquareCLick = {() => handleClick(3)}/>  
        <Square value = {squares[4]} onSquareCLick = {() => handleClick(4)}/>  
        <Square value = {squares[5]} onSquareCLick = {() => handleClick(5)}/>  
      </div>

      <div className="board-row">
        <Square value = {squares[6]} onSquareCLick = {() => handleClick(6)}/>  
        <Square value = {squares[7]} onSquareCLick = {() => handleClick(7)}/>  
        <Square value = {squares[8]} onSquareCLick = {() => handleClick(8)}/>
      </div>

      <button className='reset' onClick={() => setSquares(Array(9).fill(null))}>Reset</button>
    </>
  );
}

function Square({ value, onSquareCLick }) {
  return <button className="square" onClick={onSquareCLick}>{value}</button>
}