import React from 'react';
import './TodoListTemplate.css';
import RestBeacon from './RestBeacon';

const RestBeaconTemplate = ({ restKeys, ShowGatewayMac }) => {
    return (
        <div className="todo-list-template">
            <div className="title">Rest Beacon</div>
            {Object.keys(restKeys).map(restKeysIdx =>
                restKeys[restKeysIdx].map(restKey => {
                    const msg = ShowGatewayMac(restKeysIdx, restKey);
                    return (
                        <RestBeacon
                            key={restKey}
                            restKey={`${restKeysIdx}-${restKey}`}
                            msg={msg}
                        ></RestBeacon>
                    );
                })
            )}
        </div>
    );
};

export default RestBeaconTemplate;
