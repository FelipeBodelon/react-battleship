import Gameboard from './Gameboard';

export default function Player() {
  const gameboard = Gameboard();
  const shipsAvailable = {F: 4, C: 3, D: 2, AC: 1};
  const shipsCounter = {F: 0, C:0, D: 0, AC: 0};

  const {
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
  } = gameboard;

  return {
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
    shipsAvailable,
    shipsCounter,
    hasLost
  };
}
