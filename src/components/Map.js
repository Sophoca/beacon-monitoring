import React from 'react';

const Map = ({ imageInfo, imageUrl }) => {
    return (
        <div style={{ position: 'absoloute', zIndex: '0' }}>
            <img src={imageUrl} alt={imageInfo} height="1000px" />
        </div>
    );
};

export default Map;
