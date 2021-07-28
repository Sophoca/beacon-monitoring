import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import deepmerge from 'deepmerge';
import styled from 'styled-components';
import RestBeaconTemplate from './RestBeaconTemplate';
import Beacon from './Beacon';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';
import StyledBackground from './StyledBackground';

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

const StyledP = styled.p`
    margin: 6px;
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

    const { data, error, isLoading, reload } = useAsync({
        promiseFn: getLists,
        URL: realBeaconURL,
        watch: realBeaconURL
    });

    if (isLoading)
        return (
            <StyledBackground>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress color="inherit" />
                    <p>Beacon</p>
                </div>
            </StyledBackground>
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

    // console.log(data);
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
                {/* <StyledP>{`ibeaconMajor: ${current.ibeaconMajor}`}</StyledP>
                <StyledP>{`ibeaconMinor: ${current.ibeaconMinor}`}</StyledP> */}
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

    return (
        <BeaconLayoutDiv>
            <Button
                variant="contained"
                color="primary"
                className="beaconAPI-reload-btn"
                startIcon={<RefreshIcon />}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 385 + 'px',
                    margin: 20 + 'px'
                }}
                onClick={reload}
            >
                Beacon
            </Button>

            <RestBeaconTemplate
                restKeys={restKeys}
                beaconSize={beaconSize}
                ShowGatewayMac={ShowGatewayMac}
            />
            <div className="beacons">
                {Object.values(allBeaconInfo[detail]).map((beacon, idx) => {
                    const current = realBeaconInfo[beacon.major][beacon.minor];
                    const isActive = current ? true : false;
                    const message = isActive ? (
                        GetMessage(beacon.major, beacon.minor)
                    ) : (
                        <>
                            <StyledP style={{ textAlign: 'center' }}>No Signal</StyledP>
                        </>
                    );
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
