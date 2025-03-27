import { useState } from 'react';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i){
    if(squares[i]){
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

  return (
    <>
      <div className='game'>
        <div className='board'>
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
        </div>

        <div>
          <button className='reset' onClick={() => setSquares(Array(9).fill(null))}>Reset</button>
        </div>
      </div>
    </>
  );
}

function Square({ value, onSquareCLick }) {
  return <button className="square" onClick={onSquareCLick}>{value}</button>
}