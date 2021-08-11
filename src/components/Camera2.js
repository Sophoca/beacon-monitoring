import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
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

const initialState = {
    cams: [
        {
            id: 'player0',
            camsNum: 0,
            major: 0,
            minor: 0,
            active: true
        },
        {
            id: 'player1',
            camsNum: 0,
            major: 0,
            minor: 0,
            active: false
        },
        {
            id: 'player2',
            camsNum: 0,
            major: 0,
            minor: 0,
            active: false
        }
    ]
};

function reducer(state, action) {
    switch (action.type) {
        case 'SELECT':
    }
}

const Camera2 = ({ cameraInfo, heightRatio }) => {
    const [cams, setCams] = useState([
        {
            id: '0',
            camNum: 0,
            major: 0,
            minor: 0,
            active: true
        },
        {
            id: '1',
            camNum: 0,
            major: 0,
            minor: 0,
            active: false
        },
        {
            id: '2',
            camNum: 0,
            major: 0,
            minor: 0,
            active: false
        }
    ]);

    const onCreate = useCallback(
        camInfo => {
            const isContain = !cams.map(cam => cam.camNum).includes(camInfo.camNum);
            isContain ? (
                setCams(
                    cams.map(cam =>
                        cam.active
                            ? {
                                  ...cam,
                                  camNum: camInfo.camNum,
                                  major: camInfo.major,
                                  minor: camInfo.minor,
                                  active: false
                              }
                            : cam
                    )
                )
            ) : (
                <Snackbar autoHideDuration={1000}>Already selected camera!</Snackbar>
            );
        },
        [cams]
    );

    const onRemove = useCallback(id => {
        setCams(cams.map(cam => (cam.id === id ? { ...cam, camNum: 0, major: 0, minor: 0 } : cam)));
    });

    const cameraSize = 24;
    const create = camInfo => {
        let flag = true;
        if (cams.length === 3) {
            flag = false;
            alert("Can't select more than 3 players");
        }
        if (!cams.map(cam => cam.camNum).includes(camInfo.camNum) && flag)
            setCams(cams.concat(camInfo));
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
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: 10 + 'px',
                    flexWrap: 'wrap',
                    overflow: 'auto',
                    minHeight: 'min-content'
                }}
            >
                {console.log('cams', cams)}
                {cams.map(cam => {
                    const url =
                        cam.major === 0 && cam.minor === 0
                            ? null
                            : `rtsp://admin:admin1234@218.153.209.100:${cam.major}/cam/realmonitor?channel=${cam.minor}&subtype=1`;
                    // return (
                    //     <Streamedian
                    //         key={cam.camNum}
                    //         id={cam.camNum}
                    //         url={url}
                    //         // url={`rtsp://admin:admin1234@218.153.209.100:${cam.major}/cam/realmonitor?channel=${cam.minor}&subtype=1`}
                    //         remove={remove}
                    //     ></Streamedian>
                    // );
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
