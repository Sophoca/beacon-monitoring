import React from 'react';
import BeaconLayout from './BeaconLayout';

const Map = ({ location, detail, imageUrl, allBeaconInfo, configSlot, realBeaconURL }) => {
    const imageInfo = `${location} ${detail}`;
    const imgHeight = location === 'Kintex' ? 900 : location === 'Cheonho' ? 500 : 800;
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
            <img src={imageUrl} alt={imageInfo} height={imgHeight} />
            {allBeaconInfo && (
                <BeaconLayout
                    allBeaconInfo={allBeaconInfo}
                    realBeaconURL={realBeaconURL}
                    configSlot={configSlot}
                    imgHeight={imgHeight}
                />
            )}
        </div>
    );
};

export default Map;
