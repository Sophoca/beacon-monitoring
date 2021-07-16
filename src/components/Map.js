import React from 'react';
import BeaconLayout from './BeaconLayout';

const Map = ({ imageInfo, imageUrl, allBeaconInfo, configSlot, realBeaconURL }) => {
    return (
        <div
            className="Map"
            style={{
                position: 'absolute',
                top: '0px',
                left: '100px',
                zIndex: '-3',
                overflow: 'scroll'
            }}
        >
            <img src={imageUrl} alt={imageInfo} height="1000px" />
            {allBeaconInfo && (
                <BeaconLayout
                    allBeaconInfo={allBeaconInfo}
                    realBeaconURL={realBeaconURL}
                    configSlot={configSlot}
                />
            )}
        </div>
    );
};

export default Map;
