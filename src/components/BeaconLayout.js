import React from 'react';
import Beacon from './Beacon';

const BeaconLayout = ({ beaconInfo }) => {
    console.log('상단', typeof beaconInfo);
    const beacons = (
        <div style={{ top: '0', position: 'absoloute', zIndex: '1' }}>
            {Object.keys(beaconInfo).map((beaconName, i) => (
                <a key={i}>{beaconInfo[beaconName].minor}</a>
            ))}
        </div>
    );

    return beacons;
};

export default BeaconLayout;
