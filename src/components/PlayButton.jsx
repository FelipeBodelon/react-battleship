import React from 'react';

export default function PlayButton({
    onStartGame,
    shipsAvailable,
}) {
    let buttonClass = 'neutral-button';
    ['F', 'C', 'D', 'AC'].forEach(type => { 
        if (shipsAvailable[type] > 0) {
            buttonClass = 'disabled-button';
        };
    });
    
    return (
        <button className={buttonClass} onClick={onStartGame}>
        Start Game!
        </button>
    );
}