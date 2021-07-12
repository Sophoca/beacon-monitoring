import React from 'react';

const Map = ({ imageInfo, imageUrl }) => {
    return (
        <div
            className="Map"
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: '-3',
                overflow: 'scroll'
            }}
        >
            <img src={imageUrl} alt={imageInfo} height="1000px" />
        </div>
    );
};

export default Map;
