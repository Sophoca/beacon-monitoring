import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import styled from 'styled-components';

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

const BeaconLayout = ({ allBeaconInfo, realBeaconURL, configSlot }) => {
    const heightRatio = 1000.0 / configSlot.parkingLotSize.height;
    const beaconSize = 15;
    const { data, error, isLoading, reload } = useAsync({
        promiseFn: getLists,
        URL: realBeaconURL,
        watch: allBeaconInfo
    });

    if (isLoading) return <div> 로딩중-BeaconLayout</div>;
    if (error) return <div> 에러가 발생했습니다-BeaconLayout {error}</div>;
    if (!data) return <div> 반환값 없음-BeaconLayout</div>;

    const realBeaconInfo = Object.values(data).reduce(
        (obj, d) => ({
            ...obj,
            ...Object.values(d.input || {}).reduce(
                (obj2, d2) => ({
                    ...obj2,
                    [d2.ibeaconMinor]: { ...d2 }
                }),
                {}
            )
        }),
        {}
    );

    // console.log(allBeaconInfo);
    // console.log(realBeaconInfo);

    return (
        <div
            className="BeaconLayout"
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: '1',
                overflow: 'scroll',
                width: '100%',
                height: '100%'
            }}
        >
            <button
                style={{
                    color: 'white',
                    backgroundColor: 'black',
                    width: '100px',
                    height: '40px',
                    position: 'fixed',
                    zIndex: '250',
                    left: '370px'
                }}
                onClick={reload}
            >
                reload<br></br>beacon API
            </button>
            {Object.keys(allBeaconInfo).map(beaconName => {
                const current = realBeaconInfo[beaconName];
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
                        key={beaconName}
                        top={allBeaconInfo[beaconName].top * heightRatio - beaconSize / 2}
                        left={allBeaconInfo[beaconName].left * heightRatio - beaconSize / 2}
                        beaconSize={beaconSize}
                        isActive={isActive}
                        onClick={() => alert('#' + beaconName + message)}
                    ></Beacon>
                );
            })}
        </div>
    );
};

export default BeaconLayout;
