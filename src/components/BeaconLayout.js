import React from 'react';
import Beacon from './Beacon';

const BeaconLayout = ({ beaconInfo }) => {
    console.log(beaconInfo);
    return (
        <div style={{ position: 'absoloute', zIndex: '1' }}>
            {beaconInfo.map(beacon => {
                // <div>{beacon.minor}</div>;
                {
                    console.log(beacon);
                }
            })}
        </div>
    );
};

export default BeaconLayout;
