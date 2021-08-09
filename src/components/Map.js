import React, { useState } from 'react';
import BeaconLayout from './BeaconLayout';
import ParkingSpot from './ParkingSpot';
import Camera from './Camera';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

const mapSize = { Kintex: 800, Cheonho: 300, PyeongchonUrvineFirst: 800, default: 600 };

const ButtonLayout = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    margin: 20px;
    z-index: 1;
`;

const Map = ({
    location,
    detail,
    imageUrl,
    allBeaconInfo,
    cameraInfo,
    configSlot,
    realBeaconURL
}) => {
    const imageInfo = `${location} ${detail}`;
    const imgHeight = mapSize[location] ? mapSize[location] : mapSize.default;
    const heightRatio = imgHeight / configSlot.parkingLotSize.height;
    const [isLoading, setIsLoading] = useState(false);
    const [beaconToggle, setBeaconToggle] = useState(false);
    const toggleBeacon = () => {
        setBeaconToggle(!beaconToggle);
    };
    const [cameraToggle, setCameraToggle] = useState(false);
    const toggleCamera = () => {
        setCameraToggle(!cameraToggle);
    };

    console.log(isLoading);

    return (
        <>
            <ButtonLayout>
                {!cameraToggle && allBeaconInfo ? (
                    <Button
                        variant={beaconToggle ? 'outlined' : 'contained'}
                        color="primary"
                        className="beacon-toggle-btn"
                        onClick={toggleBeacon}
                        style={{ marginRight: 20 }}
                    >
                        Beacon
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        disabled
                        className="beacon-toggle-btn disabled"
                        style={{ marginRight: 20 }}
                    >
                        Beacon
                    </Button>
                )}
                {!beaconToggle && cameraInfo ? (
                    <Button
                        variant={cameraToggle ? 'outlined' : 'contained'}
                        color="primary"
                        className="camera-toggle-btn"
                        onClick={toggleCamera}
                        style={{ marginRight: 20 }}
                    >
                        Camera
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        disabled
                        className="camera-toggle-btn disabled"
                        style={{ marginRight: 20 }}
                    >
                        Camera
                    </Button>
                )}
            </ButtonLayout>

            <div
                className="Map"
                style={{
                    position: 'absolute',
                    overflow: 'scroll',
                    top: 75 + 'px'
                }}
            >
                <img
                    src={imageUrl}
                    alt={imageInfo}
                    height={imgHeight}
                    onLoad={() => setIsLoading(true)}
                />
                <ParkingSpot parkingSpot={configSlot} heightRatio={heightRatio} />

                {beaconToggle && (
                    <BeaconLayout
                        allBeaconInfo={allBeaconInfo}
                        realBeaconURL={realBeaconURL}
                        heightRatio={heightRatio}
                        detail={detail}
                    />
                )}

                {cameraToggle && (
                    <Camera cameraInfo={cameraInfo} heightRatio={heightRatio}></Camera>
                )}
            </div>
        </>
    );
};

export default Map;
