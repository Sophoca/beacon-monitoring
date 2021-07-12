import React from 'react';
import Beacon from './Beacon';

const BeaconLayout = ({ allBeaconInfo, configSlot }) => {
    const heightRatio = 1000.0 / configSlot.parkingLotSize.height;
    const beaconSize = 10;
    const beacons = (
        <div
            className="BeaconLayout"
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: '3',
                overflow: 'scroll',
                width: '100%',
                height: '1000px'
            }}
        >
            {Object.keys(allBeaconInfo).map((beaconName, i) => (
                <Beacon
                    key={i}
                    className={beaconName}
                    top={allBeaconInfo[beaconName].top * heightRatio - beaconSize / 2}
                    left={allBeaconInfo[beaconName].left * heightRatio - beaconSize / 2}
                    beaconSize={beaconSize}
                ></Beacon>
            ))}
        </div>
    );

    return beacons;
};

export default BeaconLayout;
