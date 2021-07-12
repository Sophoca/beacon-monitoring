import React from 'react';
import Beacon from './Beacon';

const BeaconLayout = ({ allBeaconInfo, heightRatio }) => {
    const beacons = (
        <div
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: '-1',
                overflow: 'scroll'
            }}
        >
            {Object.keys(allBeaconInfo).map((beaconName, i) => (
                <Beacon
                    key={i}
                    className={beaconName}
                    top={allBeaconInfo[beaconName].top / heightRatio}
                    left={allBeaconInfo[beaconName].left / heightRatio}
                ></Beacon>
            ))}
        </div>
    );

    return beacons;
};

export default BeaconLayout;
