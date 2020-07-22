import React from 'react';

export default function Cell({ type, onCellClick, action, ship, started }) {
  const renderCell = type => {
    if (type === '') {
      if (started && ship === null) {
        return <div className="cell"><span>{type}</span></div>;
      }
      return <div className="cell" onClick={onCellClick}><span>{type}</span></div>;
    } else if (['F', 'C', 'D', 'AC'].includes(type.substring(0, type.length - 1))) {
      if (ship === null && action !== null) {
        return <div className="cell-ship-highlighted" onClick={onCellClick}><span>{type}</span></div>;
      } else if (ship !== null && action !== null) {
        if (type === ship) {
          return <div className="cell-ship-marked" onClick={onCellClick}><span>{type}</span></div>;
        }
      }
      return <div className="cell-ship" onClick={onCellClick}><span>{type}</span></div>;
    } else if (type === 'X') {
      if (action === 'attack' && ship !== null) {
        return <div className="cell-destroyed" onClick={onCellClick}></div>;
      }
    return <div className="cell-destroyed"></div>;
    }
  }

  return <>{renderCell(type)}</>;
}
