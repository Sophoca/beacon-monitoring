import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import deepmerge from 'deepmerge';
import styled from 'styled-components';
import RestBeaconTemplate from './RestBeaconTemplate';

async function getLists({ URL }) {
    const response = await axios.get(URL);
    return response.data;
}

const Beacon = styled.div.attrs(props => ({
    style: {
        top: props.top,
        left: props.left,
        width: props.beaconSize,
        height: props.beaconSize,
        background: props.isActive ? 'green' : 'red'
    }
}))`
    position: absolute;
    border-radius: 50%;
    z-index: 10;
`;

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
            <BeaconLayoutDiv style={{ left: '40px', top: '40px' }}>
                로딩중-BeaconLayout
            </BeaconLayoutDiv>
        );
    if (error)
        return (
            <BeaconLayoutDiv style={{ left: '40px', top: '40px' }}>
                에러가 발생했습니다-BeaconLayout {error}
            </BeaconLayoutDiv>
        );
    if (!data)
        return (
            <BeaconLayoutDiv style={{ left: '40px', top: '40px' }}>
                반환값 없음-BeaconLayout
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
        const msg = `
timestamp: ${current.timestamp}
type: ${current.type}
mac: ${current.mac}
bleName: ${current.bleName}
ibeaconUuid: ${current.ibeaconUuid}
ibeaconMajor: ${current.ibeaconMajor}
ibeaconMinor: ${current.ibeaconMinor}
rssi: ${current.rssi}
ibeaconTxPower: ${current.ibeaconTxPower}
battery: ${current.battery}`;
        return msg;
    }

    function ShowGatewayMac(major, minor) {
        const defaultMsg = GetMessage(major, minor);
        const gatewayMac = Object.keys(realBeaconInfo[major][minor].gatewayMac).toString();
        const msg = `# ${major}-${minor}
gateway mac: ${gatewayMac}
${defaultMsg}
`;
        return msg;
    }

    // console.log('allBeacon', allBeaconKeys);
    // console.log('realBeacon', realBeaconInfo);
    // console.log('restKeys', restKeys);

    return (
        <BeaconLayoutDiv>
            <ReloadBtn onClick={reload}>
                reload<br></br>beacon API
            </ReloadBtn>

            <RestBeaconTemplate restKeys={restKeys} ShowGatewayMac={ShowGatewayMac} />

            {Object.values(allBeaconInfo[detail]).map((beacon, idx) => {
                const current = realBeaconInfo[beacon.major][beacon.minor];
                const isActive = current ? true : false;
                const message = isActive ? GetMessage(beacon.major, beacon.minor) : '\nno signal';

                return (
                    <Beacon
                        key={idx}
                        top={beacon.top * heightRatio - beaconSize / 2}
                        left={beacon.left * heightRatio - beaconSize / 2}
                        beaconSize={beaconSize}
                        isActive={isActive}
                        onClick={() => alert(`# ${beacon.major}-${beacon.minor}${message}`)}
                    ></Beacon>
                );
            })}
        </BeaconLayoutDiv>
    );
};

export default BeaconLayout;
