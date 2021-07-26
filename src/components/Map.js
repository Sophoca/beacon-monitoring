import React from 'react';
import BeaconLayout from './BeaconLayout';

const mapSize = { Kintex: 900, Cheonho: 500, PyeongchonUrvineFirst: 900, default: 800 };

const Map = ({ location, detail, imageUrl, allBeaconInfo, configSlot, realBeaconURL }) => {
    const imageInfo = `${location} ${detail}`;
    const imgHeight = mapSize[location] ? mapSize[location] : mapSize.default;
    return (
        <div
            className="Map"
            style={{
                position: 'absolute',
                overflow: 'scroll',
                top: 75 + 'px',
                zIndex: -1
            }}
        >
            <img src={imageUrl} alt={imageInfo} height={imgHeight} />
            {allBeaconInfo && (
                <BeaconLayout
                    allBeaconInfo={allBeaconInfo}
                    realBeaconURL={realBeaconURL}
                    configSlot={configSlot}
                    imgHeight={imgHeight}
                    detail={detail}
                />
            )}
        </div>
    );
};

export default Map;
