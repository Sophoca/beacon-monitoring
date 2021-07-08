import React from 'react';
import Map from '.././components/Map';

function Status({ match, location: { state } }) {
    const URL = state.parkingLotInfo;
    return (
        <div>
            <div>
                {match.params.location}
                {match.params.floor}
            </div>
            <Map imageURL={URL} />
        </div>
    );
}

export default Status;
