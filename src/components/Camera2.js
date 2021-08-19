import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
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

const errorMsg = ['None', 'Already selected camera!', 'More than 3 cameras cannot be selected!'];

const Camera2 = ({ cameraInfo, heightRatio }) => {
    const [cams, setCams] = useState({
        0: {
            camNum: 0,
            major: 0,
            minor: 0
        },
        1: {
            camNum: 0,
            major: 0,
            minor: 0
        },
        2: {
            camNum: 0,
            major: 0,
            minor: 0
        }
    });

    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [error, setError] = useState(0);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleCurrent = () => {
        if (current < 2) setCurrent(current + 1);
    };

    const handleError = error => {
        setError(error);
        setOpen(true);
    };

    const onCreate = camInfo => {
        const values = Object.values(cams).map(cam => cam.camNum);
        const isContain = values.includes(camInfo.camNum);
        const isFull = !values.includes(0);
        if (isContain) handleError(1);
        else {
            if (isFull) handleError(2);
            setCams({ ...cams, [current]: camInfo });
            handleCurrent();
        }
    };

    const onRemove = id => {
        setCams({ ...cams, [id]: { camNum: 0, major: 0, minor: 0 } });
    };

    const toggleCurrent = id => {
        setCurrent(Number(id));
    };

    const cameraSize = 24;

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert variant="filled" severity="error">
                    {errorMsg[error]}
                </Alert>
            </Snackbar>
            <CameraLayoutDiv className="camera-layout">
                {Object.keys(cameraInfo).map(camNum => {
                    const current = cameraInfo[camNum];
                    const isActive = Object.values(cams)
                        .map(cam => cam.camNum)
                        .includes(camNum);
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
                                        onCreate({
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
                className="player-container"
                style={{
                    position: 'fixed',
                    display: 'flex',
                    width: 100 + 'wh',
                    height: 55 + '%',
                    justifyContent: 'flex-start',
                    margin: 10 + 'px',
                    gap: 10,
                    flexWrap: 'wrap',
                    overflow: 'auto',
                    minHeight: 'min-content'
                }}
            >
                {Object.keys(cams).map(id => {
                    const cam = cams[id];
                    const url =
                        cam.major === 0 && cam.minor === 0
                            ? null
                            : `rtsp://admin:admin1234@218.153.209.100:${cam.major}/cam/realmonitor?channel=${cam.minor}&subtype=1`;
                    return (
                        <Streamedian
                            key={id}
                            id={id}
                            camNum={cam.camNum}
                            url={url}
                            onRemove={onRemove}
                            toggleCurrent={toggleCurrent}
                            current={current}
                        ></Streamedian>
                    );
                })}
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
