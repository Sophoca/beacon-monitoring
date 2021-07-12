import React from 'react';

const Map = ({ imageInfo, imageUrl }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: '-1',
                overflow: 'scroll'
            }}
        >
            <img src={imageUrl} alt={imageInfo} height="1000px" />
        </div>
    );
};

export default Map;
