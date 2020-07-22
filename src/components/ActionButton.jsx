import React from 'react';

export default function ActionButton({
    action,
    onAction,
    type
}) {
    let className = type.toLowerCase() + '-button';
    let disabled = true;
    if (action === null) {
        if (type !== 'Cancel') {
            disabled = false;
        }
    } else if (action !== null) {
        if (type === 'Cancel') {
            disabled = false;
        } else {
            if (type.toLowerCase() === action) {
                disabled = false;
                className = 'active-' + className;
            }
        }
    } 

    return (
        <button disabled={disabled} className={className} onClick={() => onAction(action !== null ? null : type.toLowerCase())}>
        {type}
        </button>
    );
}