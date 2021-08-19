import React from 'react';
import styled from 'styled-components';

const WidgetContainer1 = styled.div`
    padding: 10px;
    border: 1px solid rgb(245, 245, 245);
    border-radius: 10px;
    background: white;
    width: 100%;
`;
const WidgetContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const Widget = ({ title, description }) => {
    return (
        <WidgetContainer1>
            <WidgetContainer2>
                <div style={{ fontSize: 'small' }}>{title}</div>
                <div style={{ fontSize: 'medium', fontWeight: 'bold' }}>{description}</div>
            </WidgetContainer2>
        </WidgetContainer1>
    );
};

export default Widget;
