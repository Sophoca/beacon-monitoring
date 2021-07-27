import React, { useState } from 'react';
import './TodoListTemplate.css';
import RestBeacon from './RestBeacon';
import Button from '@material-ui/core/Button';
import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';

const RestBeaconTemplate = ({ restKeys, beaconSize, ShowGatewayMac }) => {
    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                className="parking-spot-toggle-btn"
                startIcon={<HelpOutlineSharpIcon />}
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    margin: 20 + 'px'
                }}
                onClick={null}
            >
                Rest Keys
            </Button>
            <div className="todo-list-template">
                {Object.keys(restKeys).map(restKeysIdx =>
                    restKeys[restKeysIdx].map(restKey => {
                        const msg = ShowGatewayMac(restKeysIdx, restKey);
                        return (
                            <RestBeacon
                                key={restKey}
                                major={restKeysIdx}
                                minor={restKey}
                                beaconSize={beaconSize}
                                msg={msg}
                            ></RestBeacon>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default RestBeaconTemplate;
