import React from 'react';
import './TodoListTemplate.css';
import RestBeacon from './RestBeacon';

const RestBeaconTemplate = ({ restKeys }) => {
    return (
        <div className="todo-list-template">
            <div className="title">Rest Beacon</div>
            {Object.keys(restKeys).map(restKeysIdx =>
                restKeys[restKeysIdx].map(restKey => (
                    <RestBeacon key={restKey} restKey={`${restKeysIdx}-${restKey}`}></RestBeacon>
                ))
            )}
        </div>
    );
};

export default RestBeaconTemplate;
