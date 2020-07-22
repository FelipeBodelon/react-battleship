import React from 'react';
import './App.scss';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <h1>IIC2513 - Battleship <span role='img' className='icon'>🚢</span></h1>
      <Game />
    </div>
  );
}

export default App;
