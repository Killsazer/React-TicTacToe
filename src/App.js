import { useState } from 'react';
import { useEffect } from 'react';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares)?.win;
  const winningLine = calculateWinner(squares)?.line || [];
  const isDraw = calculateWinner(squares);

  const [status, setStatus] = useState('');
  useEffect(() => {
    if(isDraw === 1){
      setResetTrigger(prev => prev + 1);
      setStatus(() => "Нічия!")
    }
    else{
      setStatus (() => winner ? "Переможець: " + winner : "Зараз ходять: " + (xIsNext ? "X" : "O") ); 
    }
  }, [winner, xIsNext, isDraw, setStatus]);

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
        return {
          win: squares[a],
          line: [a, b, c]
        };
      }
    }

    if(squares.every(square => square !== null)){
      return 1;
    }

    return null;
  }
  function reset(){
    setSquares(Array(9).fill(null));
    setResetTrigger(prev => prev + 1);
  }

  return (
    <>
      <div className='game'>
        <div className={`status ${winner ? 'status--win': ''}`} key={`-${resetTrigger}`}>
          {status}
        </div>

        <div className='board-row'>
          <Square value = {squares[0]} onSquareClick = {() => handleClick(0)} isWining={winningLine.includes(0)}/>
          <Square value = {squares[1]} onSquareClick = {() => handleClick(1)} isWining={winningLine.includes(1)}/>
          <Square value = {squares[2]} onSquareClick = {() => handleClick(2)} isWining={winningLine.includes(2)}/>  
        </div>

        <div className='board-row'>
          <Square value = {squares[3]} onSquareClick = {() => handleClick(3)} isWining={winningLine.includes(3)}/>  
          <Square value = {squares[4]} onSquareClick = {() => handleClick(4)} isWining={winningLine.includes(4)}/>  
          <Square value = {squares[5]} onSquareClick = {() => handleClick(5)} isWining={winningLine.includes(5)}/>  
        </div>

        <div className='board-row'>
          <Square value = {squares[6]} onSquareClick = {() => handleClick(6)} isWining={winningLine.includes(6)}/>  
          <Square value = {squares[7]} onSquareClick = {() => handleClick(7)} isWining={winningLine.includes(7)}/>  
          <Square value = {squares[8]} onSquareClick = {() => handleClick(8)} isWining={winningLine.includes(8)}/>
        </div>

        <button className='reset' onClick={reset}>
          Reset
        </button>

      </div>
    </>
  );
}

function Square({ value, onSquareClick, isWining}) {
  return <button className={`square ${isWining ? 'square--win' : ''}`} onClick={onSquareClick}>{value}</button>
}