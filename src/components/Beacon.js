import React from 'react';
import styled from 'styled-components';

const Beacon = styled.div.attrs(props => ({
    style: {
        top: props.top,
        left: props.left,
        width: props.beaconSize,
        height: props.beaconSize
    }
}))`
    position: absolute;
    background-color: green;
    border-radius: 50%;
    z-index: 10;
    &:hover {
        background-color: blue;
    }
`;

export default Beacon;
