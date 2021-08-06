import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Streamedian from '../Streamedian';
import CameraDiv from './CameraDiv';
import CamDict from './CamDict';

const CameraLayoutDiv = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    width: 100%;
    height: 100%;
`;

const CameraDegreeDiv = styled.div.attrs(props => ({
    style: {
        width: props.cameraSize / 2
        // transform: `rotate(${props.degree}deg)`
    }
}))`
    position: absolute
    border-top: 10px solid red;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    height: 0;
    // transform-origin: top left;
    z-index: -1;
`;

const Camera = ({ cameraInfo, heightRatio }) => {
    const [ID, setID] = useState(null);
    const cameraSize = 26;
    const [url, setUrl] = useState(null);
    console.log(ID);
    useEffect(() => {
        ID &&
            setUrl(
                `rtsp://admin:admin1234@218.153.209.100:${cameraInfo[ID].ip.major}/cam/realmonitor?channel=${cameraInfo[ID].ip.minor}&subtype=1`
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
                                size="small"
                                className="beacon-toggle-btn"
                                onClick={() => setID(camNum)}
                                style={{
                                    padding: 0,
                                    minHeight: cameraSize,
                                    minWidth: cameraSize,
                                    maxHeight: cameraSize,
                                    maxWidth: cameraSize
                                }}
                            >
                                {camNum}
                            </Button>
                            <CameraDegreeDiv
                                cameraSize={cameraSize}
                                degree={cameraInfo[camNum].degree}
                            ></CameraDegreeDiv>
                        </CameraDiv>
                    );
                })}
            </CameraLayoutDiv>
            <div
                className="player"
                style={{
                    position: 'fixed',
                    display: 'flex',
                    width: 75 + '%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {ID && <Streamedian id={ID} url={url}></Streamedian>}
            </div>
        </>
    );
};

export default Camera;
