import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from '../components/Map';
import StyledBackground from '../components/StyledBackground';

async function getLists({ parkingLotURL }) {
    const response = await axios.get(parkingLotURL);
    return response.data;
}

function Status({ match, location: { state }, mainReload }) {
    const parkingLotURL = state.parkingLotInfoURL;
    const realBeaconURL = state.realBeaconURL;
    const { location, floor } = match.params;
    const detail = floor || state.imageSource;

    const { data, error, isLoading } = useAsync({
        promiseFn: getLists,
        parkingLotURL,
        watch: parkingLotURL
    });

    if (isLoading || !data.mapInfo.imageUrl[detail])
        return (
            <StyledBackground>
                <CircularProgress color="inherit" />
                <p>Status</p>
            </StyledBackground>
        );
    if (error) return <div>에러가 발생했습니다-Status {error}</div>;
    if (!data) return <div>반환값 없음-Status</div>;

    // console.log(data.mapInfo);
    const imageUrl = data.mapInfo.imageUrl[detail];
    const configSlot = data.mapInfo.configSlot[detail];
    const allBeaconInfo = data.mapInfo.allBeaconInfo;
    const cameraInfo = data.mapInfo.cameraInfo ? data.mapInfo.cameraInfo[detail] : null;
    console.log('cam', cameraInfo);

    return (
        <div
            className="Status"
            style={{ position: 'absolute', width: 'content-fit', height: '100%' }}
        >
            <Map
                location={location}
                detail={detail}
                imageUrl={imageUrl}
                allBeaconInfo={allBeaconInfo}
                cameraInfo={cameraInfo}
                configSlot={configSlot}
                realBeaconURL={realBeaconURL}
            />
        </div>
    );
}

export default Status;
