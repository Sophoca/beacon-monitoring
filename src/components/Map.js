import React from 'react';

const Map = ({ imageInfo, imageUrl }) => {
    return (
        <div>
            <img src={imageUrl} alt={imageInfo} width="100%" />
        </div>
    );
};

export default Map;
