import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import Map from '.././components/Map';

async function getLists({ URL }) {
    const response = await axios.get(URL);
    return response.data;
}

function Status({ match, location: { state } }) {
    const URL = state.parkingLotInfoURL;

    const { data, error, isLoading } = useAsync({
        promiseFn: getLists,
        URL,
        watch: match.params.location
    });

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다-Status</div>;
    if (!data) return <div>반환값 없음-Status</div>;

    console.log(data.mapInfo.imageUrl);

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
