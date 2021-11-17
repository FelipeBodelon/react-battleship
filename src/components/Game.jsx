import React, { useState, useEffect, useCallback } from 'react';

import Player from '../game/Player';
import Board from './Board';
import Gameboard from './Gameboard';
import GameState from './GameState';
import { EMAIL, STUDENT_NUMBER, TOKEN } from '../constants/Authentication';

let player = Player();

export default function Game() {
  const [gameboard, setGameboard] = useState([]);
  const [ships, setShips] = useState([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState('');
  const [shipPlacingType, setShipPlacingType] = useState(null);
  const [action, setAction] = useState(null);
  const [ship, setShip] = useState(null);
  const [log, setLog] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const init = () => {
    player = Player();

    fetchGameId();
    setGameboard(player.getGameboard());
    setShipPlacingType(null);
    setAction(null);
    setStarted(false);
    setShip(null);
    setFinished(false);
    setWinner('');
    setLog([]);
  };
  
  useEffect(() => init(), []);

  const updateLog = (entry) => setLog(state => [entry, ...state]);
  
  const handleShipSelection = (type) => {
    if(type === shipPlacingType) {
      setShipPlacingType(null);
    } else {
      if(player.shipsAvailable[type] > 0) {
        setShipPlacingType(type);
      }
    }
  };
  

  const fetchGameId = useCallback(async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': TOKEN }
    };
    setLoading(true);
    try {
      const response = await fetch('https://battleship.iic2513.phobos.cl/games', requestOptions)
      const data = response.json();
      let gameId = data.gameId
      setGameId(gameId);
      setLoading(false);
    } catch (e) {
      console.log(e)
    }    
  }, []);

  const fetchTurn = useCallback(async (body) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': TOKEN },
      body: JSON.stringify( body )
    };
      setLoading(true);
      try {
        const response = await fetch(`https://battleship.iic2513.phobos.cl/games/${gameId}/action`, requestOptions)
        const data = response.json();
        console.log(data);
        handleComputerTurn(data);
        setLoading(false);
      } catch (e) {
        console.log(e)
      }
    }, []);

  const handleCellClick = (row, col) => {
    if (!started && shipPlacingType !== null) {
      if (player.canPlaceShip(row, col)) {
        const id = shipPlacingType + parseInt(player.shipsCounter[shipPlacingType] + 1);
        player.shipsAvailable[shipPlacingType]--;
        player.shipsCounter[shipPlacingType]++;
        player.newShip(id, shipPlacingType, row, col);
        setShipPlacingType(null);
      }
    }
    else if (started && action !== null) {
      if (ship !== null) {
        if (action === "attack") {
          let attack = player.attackTile(ship, row, col);
          if (attack !== null) {
            let message = '[USER]: FIRE' + ' - ' + ship + ' - ' + 'ABCDEFGHIJ'[col] + (row + 1)
            updateLog(message);
            setAction(null);
            setShip(null);
            let body = { action: {type: "FIRE",
                       ship: ship,
                       row: row,
                       column: col,
                      }
            };
            fetchTurn(body);
          }
        } else if (action === "move" || false) {
          let movement = player.moveShip(ship, row, col);
          if (movement !== null) {
            let message = '[USER]: MOVE' + ' - ' + ship + ' - ' + movement.direction + ' - ' + movement.quantity;
            updateLog(message);
            setAction(null);
            setShip(null);
            let body = { action: {type: "MOVE",
                       ship: ship,
                       direction: movement.direction,
                       quantity: movement.quantity,
                      }
                    };
            fetchTurn(body);
          }
        }
      } else if (ship === null) {
        let target = player.selectTile(row, col);
        setShip(target);
      }
    }
  }; 
  
  const handleStartGame = () => {
    setStarted(true);
  };

  const handleSurrender = () => {
    setFinished(true);
    setWinner(false);
  }

  const handleAction = (action) => {
    setAction(action);
    if (action === null) {
      setShip(null);
    }
  };

  const handleComputerTurn = (response) => {
    player.hasLost();
    const action = response.action;
    const events = response.events;
    // const action = {type: 'FIRE', ship:'C1', row: 9, column: 9};
    // const events = [{type: 'ALL_SHIPS_DESTROYED'}];
    for (let event of events) {
      if (event.type === 'HIT_SHIP') {
        let message = '[COMPUTER]: [HIT] Ship ' + event.ship;
        updateLog(message);
      } else if (event.type === 'SHIP_DESTROYED') {
        let message = '[COMPUTER]: [DESTROYED] Ship ' + event.ship;
        updateLog(message);
      } else if (event.type === 'ALL_SHIPS_DESTROYED') {
        setFinished(true);
        setWinner(true);
      }
    }
    if (action.type === 'FIRE') {
      let hit = player.processHit(action.row, action.column);
      let message = '[COMPUTER]: FIRE' + ' - ' + action.ship + ' - ' + 'ABCDEFGHIJ'[action.column] + (action.row + 1)
      updateLog(message);
      if (hit) {
        let message1 = '[USER]: [HIT] Ship ' + hit;
        updateLog(message1);
        let message2 = '[USER]: [DESTROYED] Ship ' + hit;
        updateLog(message2);
        if (player.hasLost()) {
          setFinished(true);
          setWinner(false);
        }
      }
    } else if (action.type === 'MOVE') {
      let message = '[COMPUTER]: MOVE' + ' - ' + action.ship + ' - ' + action.direction + ' - ' + action.quantity;
      updateLog(message);
    }
  }

  const handleNewGame = () => {
    init();
  };

  return (
    <div className='game-container'>
      
      <Board>
        <Gameboard
          board={gameboard}
          ships={ships}
          shipPlacingType={shipPlacingType}
          onCellClick={handleCellClick}
          onReset={handleNewGame}
          onStartGame={handleStartGame}
          started={started}
          action={action}
          ship={ship}
        />
      </Board>
      <GameState
        ships={ships}
        player={player}
        onShipSelection={handleShipSelection}
        shipPlacingType={shipPlacingType}
        onReset={handleNewGame}
        onStartGame={handleStartGame}
        started={started}
        finished={finished}
        winner={winner}
        action={action}
        onAction={handleAction}
        ship={ship}
        log={log}
        loading={loading}
        onSurrender={handleSurrender}
        />
    </div> 
  );
}