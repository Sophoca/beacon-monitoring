import React from 'react';

const Widget = ({ title, description }) => {
    return (
        <div
            style={{
                padding: 10,
                border: '1px solid rgb(245,245,245)',
                background: 'white',
                width: 100 + '%'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ fontSize: 'small' }}>{title}</div>
                <div style={{ fontSize: 'medium', fontWeight: 'bold' }}>{description}</div>
            </div>
        </div>
    );
};

export default Widget;
