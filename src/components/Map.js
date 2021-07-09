import React from 'react';

const Map = ({ imageInfo, imageUrl }) => {
    return (
        <div>
            <img src={imageUrl} alt={imageInfo} />
        </div>
    );
};

export default Map;
