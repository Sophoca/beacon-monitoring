import React from 'react';
import BeaconLayout from './BeaconLayout';
import ParkingSpot from './ParkingSpot';
import Camera from './Camera';

const mapSize = { Kintex: 900, Cheonho: 500, PyeongchonUrvineFirst: 900, default: 800 };

const Map = ({ location, detail, imageUrl, allBeaconInfo, configSlot, realBeaconURL }) => {
    const imageInfo = `${location} ${detail}`;
    const imgHeight = mapSize[location] ? mapSize[location] : mapSize.default;
    const heightRatio = imgHeight / configSlot.parkingLotSize.height;
    return (
        <div
            className="Map"
            style={{
                position: 'absolute',
                overflow: 'scroll',
                top: 75 + 'px'
            }}
        >
            <img src={imageUrl} alt={imageInfo} height={imgHeight} />
            <ParkingSpot parkingSpot={configSlot} heightRatio={heightRatio} />
            <Camera></Camera>
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
