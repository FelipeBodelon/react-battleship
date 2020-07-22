import React from 'react';

import SelectorButton from './SelectorButton'
import PlayButton from './PlayButton'
import ActionButton from './ActionButton'
import Log from './Log'

export default function GameState({
  player,
  onShipSelection,
  shipPlacingType,
  onReset,
  onStartGame,
  started,
  finished,
  winner,
  onAction,
  action,
  ship,
  log,
  loading,
  onSurrender
}) {

  let loadingNotice = loading ? <h4>Loading...</h4> : <h4></h4>;

  if (!started) {
    return (
      <div className="action-area">
        <div className="button-container-vertical">
          <SelectorButton 
          name="Frigate"
          type='F' 
          shipsAvailable={player.shipsAvailable.F} 
          onShipSelection={onShipSelection}
          shipPlacingType={shipPlacingType}/>
          <SelectorButton 
          name="Cruiser" 
          type='C'
          shipsAvailable={player.shipsAvailable.C} 
          onShipSelection={onShipSelection}
          shipPlacingType={shipPlacingType}/>
          <SelectorButton 
          name="Destructor"
          type='D' 
          shipsAvailable={player.shipsAvailable.D} 
          onShipSelection={onShipSelection}
          shipPlacingType={shipPlacingType}/>
          <SelectorButton 
          name="Aircraft Carrier"
          type='AC' 
          shipsAvailable={player.shipsAvailable.AC} 
          onShipSelection={onShipSelection}
          shipPlacingType={shipPlacingType}/>
          <br></br>
          <div className="button-container-horizontal">
            <button onClick={onReset}>Clear All</button>
            <br/>
            <PlayButton 
            onStartGame={onStartGame} 
            shipsAvailable={player.shipsAvailable}/>
          </div>
        </div>
      </div>
    );
  }
  if (started && !finished) {
    return (
      <div className="action-area">
        <div className="button-container-horizontal">
          <ActionButton 
            type={'Move'}
            onAction={onAction} 
            action={action}/>
          <ActionButton 
            type={'Attack'}
            onAction={onAction} 
            action={action}/>
        </div>
        <ActionButton 
          type={'Cancel'}
          onAction={onAction} 
          action={action}/>
        <div className='labels'>
          <h3 className='log-label'>
            Log:
          </h3>
          {loadingNotice}
        </div>
        <Log
          log={log} />
        <button className="surrender-button" onClick={onSurrender}>Surrender</button>
      </div>
    )
  } else if (finished) {
    if (winner) {
      return (
        <div className="action-area">
          <h1>YOU WIN!</h1>
          <h3>All enemy ships have been destroyed!</h3>
          <button onClick={onReset}>New game</button>
        </div>
      )
    } else {
      return ( 
        <div className="action-area">
          <h1>YOU LOST!</h1>
          <h3>Mission Failed, we'll get em' next time!</h3>
          <button onClick={onReset}>Try again</button>
        </div> 
      )
    }
  }
}