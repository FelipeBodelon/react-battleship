import React from 'react';

export default function SelectorButton({
    type, 
    name,
    shipsAvailable, 
    onShipSelection,
    shipPlacingType
}) {
    var buttonClass = 'neutral-button';

    if (shipsAvailable === 0) {
        buttonClass = 'disabled-button'
    } else if (shipPlacingType === null) {
        buttonClass = 'neutral-button'
    } else if (shipPlacingType === type) {
        buttonClass = 'active-button'
    }

    return (
        <button className={buttonClass} onClick={() => onShipSelection(type)}>
        {name} ({shipsAvailable})
        </button>
    );
}