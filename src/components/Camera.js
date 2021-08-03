import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Streamedian from '../Streamedian';
import CameraDiv from './CameraDiv';

const CameraLayoutDiv = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    width: 100%;
    height: 100%;
`;

const Camera = ({ cameraInfo, heightRatio }) => {
    const [ID, setID] = useState(null);
    const cameraSize = 30;
    const [url, setUrl] = useState(null);
    console.log(ID);
    useEffect(() => {
        ID &&
            setUrl(
                `rtsp://admin:admin1234@218.153.209.100:${CamDict[ID].major}/cam/realmonitor?channel=${CamDict[ID].minor}&subtype=1`
            );
    }, [ID]);

    return (
        <>
            <CameraLayoutDiv className="camera-layout">
                {Object.keys(cameraInfo).map(camNum => {
                    const current = cameraInfo[camNum];
                    return (
                        <CameraDiv
                            key={camNum}
                            top={current.top * heightRatio - cameraSize / 2}
                            left={current.left * heightRatio - cameraSize / 2}
                            cameraSize={cameraSize}
                        >
                            <Button
                                variant={camNum === ID ? 'contained' : 'outlined'}
                                color="primary"
                                className="beacon-toggle-btn"
                                onClick={() => setID(camNum)}
                                style={{ padding: 0, minHeight: cameraSize, minWidth: cameraSize }}
                            >
                                {camNum}
                            </Button>
                        </CameraDiv>
                    );
                })}
            </CameraLayoutDiv>
            <div
                className="player"
                style={{ position: 'fixed', width: 100 + '%', alignItems: 'center' }}
            >
                {ID && <Streamedian id={ID} url={url}></Streamedian>}
            </div>
        </>
    );
};

const CamDict = {
    11: { major: 500, minor: 1 },
    12: { major: 500, minor: 2 },
    13: { major: 500, minor: 3 },
    14: { major: 500, minor: 4 },
    15: { major: 500, minor: 5 },
    16: { major: 500, minor: 6 },
    65: { major: 501, minor: 25 },
    66: { major: 501, minor: 26 },
    67: { major: 501, minor: 27 },
    68: { major: 501, minor: 28 }
};

export default Camera;
