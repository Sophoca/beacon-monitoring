import React from 'react';
import axios from 'axios';
import useAsync from '.././useAsync';
import Map from '.././components/Map';

async function getLists(URL) {
    const response = await axios.get(URL);
    return response.data;
}

function Status({ match, location: { state } }) {
    const parkingLotInfoURL = state.parkingLotInfoURL;

    const [parkingLotInfo] = useAsync(() => getLists(parkingLotInfoURL));
    const { loading, data, error } = parkingLotInfo;

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다-Status</div>;
    if (!data) return <div>반환값 없음-Status</div>;

    console.log(data.mapInfo.imageUrl[match.params.floor]);

    return (
        <div>
            <div>
                {match.params.location}
                {match.params.floor}
            </div>
            <Map
                imageInfo={`${match.params.location} ${match.params.floor}`}
                imageUrl={data.mapInfo.imageUrl[match.params.floor]}
            />
        </div>
    );
}

export default Status;
