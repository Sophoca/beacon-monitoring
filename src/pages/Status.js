import React from 'react';

const Status = ({ match }) => {
    return (
        <div>
            {match.params.status} {match.params.floor}
        </div>
    );
};

export default Status;
