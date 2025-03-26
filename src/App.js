import { useState } from 'react';

export default function Board() {
  const [click, setClick] = useState(0);
  return (
    <>
      <div className="board-row">
        <Square click={click} setClick={setClick} />
        <Square click={click} setClick={setClick} />
        <Square click={click} setClick={setClick} />  
      </div>
      <div className="board-row">
        <Square click={click} setClick={setClick} />  
        <Square click={click} setClick={setClick} />  
        <Square click={click} setClick={setClick} />  
      </div>
      <div className="board-row">
        <Square click={click} setClick={setClick} />  
        <Square click={click} setClick={setClick} />  
        <Square click={click} setClick={setClick} />
      </div>
    </>
  );
}

function Square({click, setClick}) {
  const [value, setValue] = useState(null);

  function handleCLick() {
    if(click % 2 === 0) {
      setValue('X');
    }
    else
    {
      setValue('O');
    }
    setClick(click + 1);
  }
  return <button className="square" onClick = {handleCLick}>{value}</button>
}