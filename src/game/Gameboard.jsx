import Ship from './Ship';
import { SHIP_STATS } from '../constants/ShipStats';

function createBoard() {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push([]);
    for (let j = 0; j < 10; j++) {
      arr[i].push('');
    }
  }
  return arr;
};

export const validCoords = coords =>
  !!(
    coords.row >= 0 &&
    coords.col >= 0 &&
    coords.row < 10 &&
    coords.col < 10
  );

export const colToLetter = col => {
  const letters = ['ABCDEFGHIJ'];
  return letters[col];
}

export default function Gameboard() {
  let board = createBoard();
  let ships = [];

  const hasLost = () => {
    for (let ship of ships) {
      if (ship.currentImpacts === 0) {
        return false
      }
    }
    return true;
  };

  const getGameboard = () => board;

  const getShips = () => ships;

  const getShip = ship => {
    return ships.find( ({ id }) => id === ship );
  }

  const placeShip = ship => {
    board[ship.position.row][ship.position.col] = ship.id;
  };

  const clearTile = (row, col) => {
    board[row][col] = '';
  }
  
  const canPlaceShip = (row, col) => {
    if (board[row][col] === '') {
      return true;
    }
    return false;
  };

  const attackTile = (shipID, row, col) => {
    let ship = getShip(shipID);
    let range = inRange(ship.position, row, col, ship.fireRange);
    if (range !== 'INVALID') {
      return {row: row, col: col};
    }
    return null
  }

  const processHit = (row, col) => {
    let tile = board[row][col];
    if (tile !== '' && tile !== 'X') {
      let ship = getShip(tile);
      ship.currentImpacts++;
      board[row][col] = 'X';
      return ship.id;
    }
    return false;
  };

  const moveShip = (shipID, row, col) => {
    let ship = getShip(shipID);
    let direction = movementDirection(ship.position, row, col);
    let range = inRange(ship.position, row, col, ship.maxMovement)
    if (direction !== 'INVALID') {
      if (range !== 'INVALID') {
        if (canPlaceShip(row, col)) {
            clearTile(ship.position.row, ship.position.col);
            ship.position = {row: row, col: col};
            placeShip(ship);
            return {direction: direction, quantity: range}
        }
      }  
    }
    return null
  }

  const inRange = (position, row, col, range) => {
    let vMovement = Math.abs(row - position.row);
    let hMovement = Math.abs(col - position.col);

    if (vMovement === 0 && hMovement <= range) {
      return hMovement;
    } else if (vMovement <= range && hMovement === 0) {
      return vMovement;
    } else {
      return 'INVALID';
    }
  }

  const selectTile = (row, col) => {
    return board[row][col];
  }

  const newShip = (id, shipPlacingType, row, col) => {
    const shipStats = SHIP_STATS[shipPlacingType];
    const position = {row: row, col: col}
    const ship = Ship({name: shipStats.name, 
                      type: shipPlacingType, 
                      maxImpacts: shipStats.maxImpacts, 
                      maxMovement: shipStats.maxMovement, 
                      fireRange: shipStats.fireRange,
                      id: id,
                      position: position
                      })
    ships.push(ship);
    placeShip(ship);
  };

  return ({
    newShip,
    canPlaceShip,
    placeShip,
    getShips,
    getShip,
    selectTile,
    getGameboard,
    moveShip,
    attackTile,
    processHit,
    hasLost
  });
}

function movementDirection(position, row, col) {
  let vMovement = row - position.row;
  let hMovement = col - position.col;

  if (vMovement === 0) {
    if (hMovement > 0) {
      return 'EAST'
    } else if (hMovement < 0) {
      return 'WEST'
    }
  } else if (hMovement === 0) {
    if (vMovement > 0) {
      return 'SOUTH'
    } else if (vMovement < 0) {
      return 'NORTH'
    }
  } else {
    return 'INVALID'
  }
}