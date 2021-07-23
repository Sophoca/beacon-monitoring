import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import deepmerge from 'deepmerge';
import styled from 'styled-components';
import RestBeaconTemplate from './RestBeaconTemplate';
import Beacon from './Beacon';
import ParkingSpotDiv from './ParkingSpotDiv';

async function getLists({ URL }) {
    const response = await axios.get(URL);
    return response.data;
}

const BeaconLayoutDiv = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 11;
    width: 100%;
    height: 100%;
`;

const ReloadBtn = styled.button`
    color: white;
    background-color: black;
    width: 100px;
    height: 40px;
    position: fixed;
    z-index: 250;
    left: 270px;
    top: 40px;
`;

const StyledP = styled.p`
    margin: 6px;
    width: 100%;
`;

const StyledDiv = styled.div`
    display: flex;
    width: 100vh;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const BeaconLayout = ({ allBeaconInfo, realBeaconURL, configSlot, imgHeight, detail }) => {
    const heightRatio = imgHeight / configSlot.parkingLotSize.height;
    const beaconSize = 12;

    //----------------------------------------------------------------
    const [parkingSpace, setParkingSpace] = useState(false);
    const toggleParkingSpace = () => {
        setParkingSpace(!parkingSpace);
    };
    //----------------------------------------------------------------

    const { data, error, isLoading, reload } = useAsync({
        promiseFn: getLists,
        URL: realBeaconURL,
        watch: realBeaconURL
    });

    if (isLoading)
        return (
            <BeaconLayoutDiv>
                <StyledDiv>
                    <p>로딩중-BeaconLayout</p>
                </StyledDiv>
            </BeaconLayoutDiv>
        );
    if (error)
        return (
            <BeaconLayoutDiv>
                <StyledDiv>
                    <p>에러가 발생했습니다-BeaconLayout {error}</p>
                </StyledDiv>
            </BeaconLayoutDiv>
        );
    if (!data)
        return (
            <BeaconLayoutDiv>
                <StyledDiv>
                    <p>반환값 없음-BeaconLayout</p>
                </StyledDiv>
            </BeaconLayoutDiv>
        );

    const realBeaconInfo = Object.values(data).reduce(
        (obj, d) =>
            deepmerge(
                obj,
                Object.values(d.input || {}).reduce(
                    (obj2, d2) => ({
                        ...obj2,
                        [d2.ibeaconMajor]: {
                            ...obj2[d2.ibeaconMajor],
                            [d2.ibeaconMinor]: { ...d2, gatewayMac: { [d.gateway.mac]: 0 } }
                        }
                    }),
                    {}
                )
            ),
        {}
    );

    const allBeaconKeys = Object.values(allBeaconInfo).reduce(
        (obj, d) =>
            deepmerge(
                obj,
                Object.values(d).reduce(
                    (obj2, d2) => deepmerge(obj2, { [d2.major]: [d2.minor] }),
                    {}
                )
            ),
        {}
    );

    const restKeys = Object.keys(realBeaconInfo).reduce(
        (obj, d) => ({
            ...obj,
            [d]: Object.keys(realBeaconInfo[d]).filter(key =>
                allBeaconKeys[d] ? !allBeaconKeys[d].includes(Number(key)) : !null
            )
        }),
        {}
    );

    function GetMessage(major, minor) {
        const current = realBeaconInfo[major][minor];
        const msg = (
            <>
                <StyledP>{`timestamp: ${current.timestamp}`}</StyledP>
                <StyledP>{`type: ${current.type}`}</StyledP>
                <StyledP>{`mac: ${current.mac}`}</StyledP>
                <StyledP>{`bleName: ${current.bleName}`}</StyledP>
                <StyledP>{`ibeaconUuid: ${current.ibeaconUuid}`}</StyledP>
                <StyledP>{`ibeaconMajor: ${current.ibeaconMajor}`}</StyledP>
                <StyledP>{`ibeaconMinor: ${current.ibeaconMinor}`}</StyledP>
                <StyledP>{`rssi: ${current.rssi}`}</StyledP>
                <StyledP>{`ibeaconTxPower: ${current.ibeaconTxPower}`}</StyledP>
                <StyledP>{`battery: ${current.battery}`}</StyledP>
            </>
        );
        return msg;
    }

    function ShowGatewayMac(major, minor) {
        const defaultMsg = GetMessage(major, minor);
        const gatewayMac = Object.keys(realBeaconInfo[major][minor].gatewayMac).join(', ');
        const msg = (
            <>
                <StyledP>{`gateway mac: ${gatewayMac}`}</StyledP>
                {defaultMsg}
            </>
        );
        return msg;
    }

    //----------------------------------------------
    console.log(configSlot);
    //----------------------------------------------

    return (
        <BeaconLayoutDiv>
            <ReloadBtn className="beacon-reload-btn" onClick={reload}>
                Beacon API
            </ReloadBtn>

            {/*  */}
            <ReloadBtn
                className="parking-spot-toggle-btn"
                onClick={toggleParkingSpace}
                style={{ left: 370 }}
            >
                Parking Space{console.log(parkingSpace)}
            </ReloadBtn>
            {parkingSpace && (
                <div className="parking-spots">
                    {Object.keys(configSlot.parkingSpotPosition).map(spotKey => {
                        const top = configSlot.parkingSpotPosition[spotKey].top;
                        const left = configSlot.parkingSpotPosition[spotKey].left;
                        const rotate = configSlot.parkingSpotPosition[spotKey].rotate;
                        const size = configSlot.parkingSpotSize;
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

            {/*  */}

            <RestBeaconTemplate
                restKeys={restKeys}
                beaconSize={beaconSize}
                ShowGatewayMac={ShowGatewayMac}
            />
            <div className="beacons">
                {Object.values(allBeaconInfo[detail]).map((beacon, idx) => {
                    const current = realBeaconInfo[beacon.major][beacon.minor];
                    const isActive = current ? true : false;
                    const message = isActive ? GetMessage(beacon.major, beacon.minor) : 'no signal';
                    // battery 상태 isAbnormal로 넘겨주는거 고민
                    return (
                        <Beacon
                            key={idx}
                            top={beacon.top * heightRatio - beaconSize / 2}
                            left={beacon.left * heightRatio - beaconSize / 2}
                            beaconSize={beaconSize}
                            isActive={isActive}
                            major={beacon.major}
                            minor={beacon.minor}
                            message={message}
                        ></Beacon>
                    );
                })}
            </div>
        </BeaconLayoutDiv>
    );
};

export default BeaconLayout;
