import React, { useState } from 'react';
import ParkingSpotDiv from './ParkingSpotDiv';
import Button from '@material-ui/core/Button';
import DriveEtaSharpIcon from '@material-ui/icons/DriveEtaSharp';

const ParkingSpot = ({ parkingSpot, heightRatio }) => {
    const [parkingSpace, setParkingSpace] = useState(false);
    const toggleParkingSpace = () => {
        setParkingSpace(!parkingSpace);
    };
    const temp = Object.keys(parkingSpot.parkingSpotPosition).reduce(
        (obj, d) => ({
            ...obj,
            [d]: {
                top: parkingSpot.parkingSpotPosition[d].top,
                left: parkingSpot.parkingSpotPosition[d].left
            }
        }),
        {}
    );

    console.log('parking spot top-left', temp);
    return (
        <>
            <Button
                variant={parkingSpace ? 'outlined' : 'contained'}
                color="default"
                className="parking-spot-toggle-btn"
                startIcon={<DriveEtaSharpIcon />}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 525 + 'px',
                    margin: 20 + 'px'
                }}
                onClick={toggleParkingSpace}
            >
                Parking Spot
            </Button>
            {parkingSpace && (
                <div className="parking-spots">
                    {Object.keys(parkingSpot.parkingSpotPosition).map(spotKey => {
                        const top = parkingSpot.parkingSpotPosition[spotKey].top;
                        const left = parkingSpot.parkingSpotPosition[spotKey].left;
                        const rotate = parkingSpot.parkingSpotPosition[spotKey].rotate;
                        const size = parkingSpot.parkingSpotSize;
                        const msg = `# ${spotKey}

[${left}, ${top}] [${left + size.width}, ${top}]
[${left}, ${top + size.height}] [${left + size.width}, ${top + size.height}]
`;
                        return (
                            <ParkingSpotDiv
                                key={spotKey}
                                className={spotKey}
                                top={top}
                                left={left}
                                rotate={rotate}
                                size={size}
                                heightRatio={heightRatio}
                                onClick={() => alert(msg)}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default ParkingSpot;
