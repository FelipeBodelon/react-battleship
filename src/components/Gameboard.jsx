import React from 'react';
import Cell from './Cell';

export default function Gameboard({ 
  board, 
  ships, 
  onCellClick,
  action,
  ship,
  started
 }) {
  const renderCells = () =>
    board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          type={cell}
          key={`g${rowIndex}${colIndex}`}
          action={action}
          ship={ship}
          started={started}
          onCellClick={() => onCellClick(rowIndex, colIndex)}
        />
      ))
    );

  return (
    <div className="board">
      {renderCells()}
    </div>
  );
  }