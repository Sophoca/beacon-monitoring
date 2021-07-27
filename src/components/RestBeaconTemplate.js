import React, { useState } from 'react';
import './TodoListTemplate.css';
import RestBeacon from './RestBeacon';
import Button from '@material-ui/core/Button';
import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';

const RestBeaconTemplate = ({ restKeys, beaconSize, ShowGatewayMac }) => {
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    return (
        <>
            <Button
                variant={isActive ? 'outlined' : 'contained'}
                color="secondary"
                className="parking-spot-toggle-btn"
                startIcon={<HelpOutlineSharpIcon />}
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    margin: 20 + 'px'
                }}
                onClick={onClick}
            >
                Rest Keys
            </Button>
            <div className={`menu ${isActive && 'active'}`}>
                <div className="title">
                    <div className="title-content">Major</div>
                    <div className="title-content">Minor</div>
                </div>
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
