import React from 'react';
import styled from 'styled-components';

const Beacon = styled.div`
    position: absolute;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    width: ${props => props.beaconSize}px;
    height: ${props => props.beaconSize}px;
    background-color: green;
    border-radius: 50%;
    z-index: 10;
    appearnace: auto;
`;

export default Beacon;
