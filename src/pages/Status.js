import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import Map from '.././components/Map';
import ParkingSpaceLayout from '.././components/ParkingSpaceLayout';

async function getLists({ URL }) {
    const response = await axios.get(URL);
    return response.data;
}

function Status({ match, location: { state } }) {
    const URL = state.parkingLotInfoURL;
    const { location, floor } = match.params;
    const { data, error, isLoading } = useAsync({
        promiseFn: getLists,
        URL,
        watch: location
    });
    const detail = floor ? floor : state.imageSource;

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다-Status</div>;
    if (!data) return <div>반환값 없음-Status</div>;

    const imageUrl = data.mapInfo.imageUrl[detail];
    const beaconInfo =
        location === 'Cheonho' || location === 'Kintex' ? data.mapInfo.allBeaconInfo[detail] : null;

    return (
        <div>
            <div>{`${match.params.location} ${detail}`}</div>
            <Map
                className="parkingSpaceImage"
                imageInfo={`${match.params.location} ${detail}`}
                imageUrl={imageUrl}
            />
            <ParkingSpaceLayout className="parkingSpaceLayout" beaconInfo={beaconInfo} />
        </div>
    );
}

export default Status;
