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

const CameraDegreeDiv = styled.div.attrs(props => ({
    style: {
        width: props.cameraSize / 2 + 'px',
        marginTop: -props.cameraSize - 2 + 'px'
    }
}))`
    position: absolute;
    margin-left: 0px;

    border-top: 4px solid rgba(63, 81, 181, 1);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    height: 0;
    z-index: -1;
`;

const CameraName = styled.div.attrs(props => ({
    style: {
        color: props.isActive ? 'white' : 'rgba(63, 81, 181, 1)',
        transform: `rotate(${props.degree}deg)`
    }
}))`
    font-size: 12px;
    text-align: center;
    position: absolute;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
`;

const Camera = ({ cameraInfo, heightRatio }) => {
    const [ID, setID] = useState(null);
    const cameraSize = 24;

    const [url, setUrl] = useState(null);
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
                    const isActive = camNum === ID;
                    return (
                        <CameraDiv
                            key={camNum}
                            top={current.top * heightRatio}
                            left={current.left * heightRatio}
                            degree={0}
                            cameraSize={cameraSize}
                        >
                            <CameraDiv degree={cameraInfo[camNum].degree}>
                                <Button
                                    variant={isActive ? 'contained' : 'outlined'}
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
                                    <CameraName
                                        degree={-cameraInfo[camNum].degree}
                                        isActive={isActive}
                                    >
                                        {camNum}
                                    </CameraName>
                                </Button>
                                <CameraDegreeDiv cameraSize={cameraSize} />
                            </CameraDiv>
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
