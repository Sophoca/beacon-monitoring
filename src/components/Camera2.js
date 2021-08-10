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

const Camera2 = ({ cameraInfo, heightRatio }) => {
    const [cams, setCams] = useState([]);
    const cameraSize = 24;
    const create = camInfo => {
        if (!cams.map(cam => cam.camNum).includes(camInfo.camNum)) setCams(cams.concat(camInfo));
    };
    const remove = camNum => {
        setCams(cams.filter(cam => cam.camNum !== camNum));
    };

    return (
        <>
            <CameraLayoutDiv className="camera-layout">
                {Object.keys(cameraInfo).map(camNum => {
                    const current = cameraInfo[camNum];
                    const isActive = cams.map(cam => cam.camNum).includes(camNum);
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
                                    onClick={() =>
                                        create({
                                            camNum: camNum,
                                            major: current.ip.major,
                                            minor: current.ip.minor
                                        })
                                    }
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
                    width: 100 + 'wh',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: 10 + 'px',
                    gap: 10,
                    flexWrap: 'wrap',
                    overflow: 'auto',
                    minHeight: 'min-content'
                }}
            >
                {console.log(cams)}
                {cams.map(cam => (
                    <Streamedian
                        key={cam.camNum}
                        id={cam.camNum}
                        url={`rtsp://admin:admin1234@218.153.209.100:${cam.major}/cam/realmonitor?channel=${cam.minor}&subtype=1`}
                        remove={remove}
                    ></Streamedian>
                ))}
                {/* {ID && <Streamedian id={ID} url={url}></Streamedian>}
                {ID && (
                    <Streamedian
                        id={'100'}
                        url={`rtsp://admin:admin1234@218.153.209.100:${cameraInfo[100].ip.major}/cam/realmonitor?channel=${cameraInfo[100].ip.minor}&subtype=1`}
                    ></Streamedian>
                )} */}
            </div>
        </>
    );
};

export default Camera2;
