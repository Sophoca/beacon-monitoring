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
    const imgHeight = mapSize[location] || mapSize.default;
    // 주차장 지도를 resize하여 표시하기 때문에 높이 비율을 계산
    const heightRatio = imgHeight / configSlot.parkingLotSize.height;
    const [beaconToggle, setBeaconToggle] = useState(false);
    const toggleBeacon = () => {
        setBeaconToggle(!beaconToggle);
    };
    const [cameraToggle, setCameraToggle] = useState(false);
    const toggleCamera = () => {
        setCameraToggle(!cameraToggle);
    };

    return (
        <>
            <ButtonLayout>
                {/* 비콘 컴포넌트 토글 버튼 */}
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

                {/* 카메라 컴포넌트 토글 버튼 */}
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
                {/* 주차장 지도 */}
                <img src={imageUrl} alt={imageInfo} height={imgHeight} />

                {/* 주차면 좌표 반환, 주석처리해도 무방 */}
                <ParkingSpot parkingSpot={configSlot} heightRatio={heightRatio} />

                {/* 비콘 데이터 표시 */}
                {beaconToggle && (
                    <BeaconLayout
                        allBeaconInfo={allBeaconInfo}
                        realBeaconURL={realBeaconURL}
                        heightRatio={heightRatio}
                        detail={detail}
                    />
                )}

                {/* 카메라 데이터 표시 */}
                {cameraToggle && (
                    <Camera cameraInfo={cameraInfo} heightRatio={heightRatio}></Camera>
                )}
            </div>
        </>
    );
};

export default Map;
