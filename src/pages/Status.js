import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import Map from '../components/Map';

async function getLists({ parkingLotURL }) {
    const response = await axios.get(parkingLotURL);
    return response.data;
}

// const StyledNav = styled.div`
//     display: flex;
//     position: fixed;
//     top: 0;
//     left: 270;
//     width: 100%;
//     height: 74px;
//     align-items: center;
//     justify-content: flex-start;
//     box-shadow: 0px 0px 5px;
// `;

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

    if (isLoading || !data.mapInfo.imageUrl[detail]) return <div>로딩중-Status</div>;
    if (error) return <div>에러가 발생했습니다-Status {error}</div>;
    if (!data) return <div>반환값 없음-Status</div>;

    console.log(data.mapInfo);
    const imageUrl = data.mapInfo.imageUrl[detail];
    const configSlot = data.mapInfo.configSlot[detail];
    const allBeaconInfo = data.mapInfo.allBeaconInfo;

    return (
        <div className="Status" style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <Button
                variant="contained"
                color="primary"
                className="mainAPI-reload-btn"
                startIcon={<RefreshIcon />}
                onClick={mainReload}
                style={{ position: 'fixed', margin: 20 + 'px' }}
            >
                Main
            </Button>
            <Map
                location={location}
                detail={detail}
                imageUrl={imageUrl}
                allBeaconInfo={allBeaconInfo}
                configSlot={configSlot}
                realBeaconURL={realBeaconURL}
            />
        </div>
    );
}

export default Status;
