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

const BeaconLayout = ({ allBeaconInfo, realBeaconURL, configSlot, imgHeight }) => {
    const heightRatio = imgHeight / configSlot.parkingLotSize.height;
    const beaconSize = 12;
    const { data, error, isLoading, reload } = useAsync({
        promiseFn: getLists,
        URL: realBeaconURL,
        watch: allBeaconInfo
    });

    if (isLoading) return <div> 로딩중-BeaconLayout</div>;
    if (error) return <div> 에러가 발생했습니다-BeaconLayout {error}</div>;
    if (!data) return <div> 반환값 없음-BeaconLayout</div>;

    const realBeaconInfo = Object.values(data).reduce(
        (obj, d) =>
            deepmerge(
                obj,
                Object.values(d.input || {}).reduce(
                    (obj2, d2) => ({
                        ...obj2,
                        [d2.ibeaconMajor]: {
                            ...obj2[d2.ibeaconMajor],
                            [d2.ibeaconMinor]: { ...d2 }
                        }
                    }),
                    {}
                )
            ),
        {}
    );

    console.log(realBeaconInfo);
    // console.log(data);

    // const allBeaconKeys = Object.keys(allBeaconInfo);
    // const keys = Object.keys(realBeaconInfo).filter(key => !allBeaconKeys.includes(key));
    // console.log(keys);
    console.log(allBeaconInfo);

    return (
        <BeaconLayoutDiv>
            <ReloadBtn onClick={reload}>
                reload<br></br>beacon API
            </ReloadBtn>

            {/* <RestBeaconTemplate restKeys={keys} /> */}

            {Object.values(allBeaconInfo).map((beacon, idx) => {
                const current = realBeaconInfo[beacon.major][beacon.minor];
                const isActive = current ? true : false;

                const message = isActive
                    ? `
timestamp: ${current.timestamp}
type: ${current.type}
mac: ${current.mac}
bleName: ${current.bleName}
ibeaconUuid: ${current.ibeaconUuid}
ibeaconMajor: ${current.ibeaconMajor}
ibeaconMinor: ${current.ibeaconMinor}
rssi: ${current.rssi}
ibeaconTxPower: ${current.ibeaconTxPower}
battery: ${current.battery}`
                    : '\nno signal';

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
