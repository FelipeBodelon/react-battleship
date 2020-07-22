import React from 'react';

export default function Log({
    log
}) {
    const logs = log.map( (entry, index) => <p key={index}>{entry}</p>);
    return (
        <div className="log-container">
            {logs}
        </div>
    );
}