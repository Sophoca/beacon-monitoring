import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import BeaconLayout from './BeaconLayout';

async function getLists({ URL }) {
    const response = await axios.get(URL);
    return response.data;
}

const Map = ({ imageInfo, imageUrl, allBeaconInfo, configSlot, realBeaconURL }) => {
    const { data, error, isLoading, reload } = useAsync({
        promiseFn: getLists,
        URL: realBeaconURL,
        watch: allBeaconInfo
    });

    if (isLoading) return <div> 로딩중..</div>;
    if (error) return <div> 에러가 발생했습니다-Status {error}</div>;
    if (!data) return <div> 반환값 없음-Status</div>;

    console.log(allBeaconInfo);
    console.log(data);

    return (
        <div
            className="Map"
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: '-3',
                overflow: 'scroll'
            }}
        >
            <img src={imageUrl} alt={imageInfo} height="1000px" />
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
            {allBeaconInfo ? (
                <BeaconLayout allBeaconInfo={allBeaconInfo} configSlot={configSlot} />
            ) : null}
        </div>
    );
};

export default Map;
