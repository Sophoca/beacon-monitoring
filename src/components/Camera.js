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
                                color={CamDict[camNum].type === 264 ? 'primary' : 'secondary'}
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

// cctv 주소
// 'rtsp://admin:admin1234@218.153.209.100:500/cam/realmonitor?channel=1&subtype=1'    500부터 506
// 500 : channel = 1 - 30  : 249 11번 - 40번
// 501 : channel = 1 - 30  : 250 41번 - 70번
// 502 : channel = 1 - 30  : 251 71번 - 100번
// 503 : channel = 1 - 30  : 252 101번 - 130번
// 504 : channel = 1 - 30  : 253 #순서가 다름 :
//  132 136 135 139 137 140 138 134 131 133 142 150 143 144 148 145 146 149 147 141 157 159 152 160 156 155 154 151 158 153
//   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30
// 505 : channel = 1 - 30  : 254 161-190
// 506 : channel = 1 - 30  : 255 191-220

const CamDict = {
    11: { major: 500, minor: 1, type: 264 },
    12: { major: 500, minor: 2, type: 264 },
    13: { major: 500, minor: 3, type: 265 },
    14: { major: 500, minor: 4, type: 264 },
    15: { major: 500, minor: 5, type: 264 },
    16: { major: 500, minor: 6, type: 265 },
    //
    53: { major: 501, minor: 13, type: 264 },
    54: { major: 501, minor: 14, type: 265 },
    55: { major: 501, minor: 15, type: 264 },
    56: { major: 501, minor: 16, type: 264 },
    57: { major: 501, minor: 17, type: 265 },
    //
    65: { major: 501, minor: 25, type: 265 },
    66: { major: 501, minor: 26, type: 265 },
    67: { major: 501, minor: 27, type: 265 },
    68: { major: 501, minor: 28, type: 265 },
    //
    107: { major: 503, minor: 7 },
    108: { major: 503, minor: 8 },
    109: { major: 503, minor: 9 },
    110: { major: 503, minor: 10 },
    111: { major: 503, minor: 11, type: 265 },
    //
    119: { major: 503, minor: 19, type: 265 },
    120: { major: 503, minor: 20, type: 265 },
    121: { major: 503, minor: 21, type: 265 },
    122: { major: 503, minor: 22, type: 265 },
    123: { major: 503, minor: 23, type: 265 },
    124: { major: 503, minor: 24, type: 265 },
    //
    159: { major: 504, minor: 22, type: 265 },
    160: { major: 504, minor: 24, type: 265 },
    // 505
    161: { major: 505, minor: 1, type: 265 },
    162: { major: 505, minor: 2, type: 265 },
    //
    168: { major: 505, minor: 8, type: 264 },
    169: { major: 505, minor: 9, type: 264 },
    170: { major: 505, minor: 10, type: 264 },
    171: { major: 505, minor: 11, type: 264 },
    172: { major: 505, minor: 12, type: 264 },
    173: { major: 505, minor: 13, type: 265 },
    //
    210: { major: 506, minor: 20, type: 264 },
    212: { major: 506, minor: 22, type: 264 },
    213: { major: 506, minor: 23, type: 264 },
    214: { major: 506, minor: 24, type: 264 }
};

export default Camera;
