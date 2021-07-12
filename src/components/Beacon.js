import React from 'react';
import styled from 'styled-components';

const Beacon = styled.div`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    width: 1rem;
    height: 1rem;
    background: green;
    border-radius: 50%;
    z-index: 5;
`;

export default Beacon;
