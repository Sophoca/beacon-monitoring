import React from 'react';

const Map = ({ imageInfo, imageUrl }) => {
    return (
        <div>
            <img src={imageUrl} alt={imageInfo} height="900px" />
        </div>
    );
};

export default Map;
