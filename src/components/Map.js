import React from 'react';
import BeaconLayout from '../components/BeaconLayout';

const Map = ({ imageInfo, imageUrl, allBeaconInfo, configSlot, realBeaconURL }) => {
    return (
        <div
            className="Map"
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: '-3',
                overflow: 'scroll'
            }}
        >
            <img src={imageUrl} alt={imageInfo} height="1000px" />
            {allBeaconInfo ? (
                <BeaconLayout allBeaconInfo={allBeaconInfo} configSlot={configSlot} />
            ) : null}
        </div>
    );
};

export default Map;
