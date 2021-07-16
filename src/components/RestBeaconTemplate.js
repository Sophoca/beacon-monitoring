import React from 'react';
import './TodoListTemplate.css';
import RestBeacon from './RestBeacon';

const RestBeaconTemplate = ({ restKeys }) => {
    return (
        <div className="todo-list-template">
            <div className="title">Rest Beacon ID</div>
            {restKeys.map((restKey, idx) => (
                <RestBeacon key={idx} restKey={restKey}></RestBeacon>
            ))}
        </div>
    );
};

export default RestBeaconTemplate;
