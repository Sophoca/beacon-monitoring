import styled from 'styled-components';

const BeaconDiv = styled.div.attrs(props => ({
    style: {
        top: props.top,
        left: props.left,
        width: props.beaconSize,
        height: props.beaconSize,
        minWidth: props.beaconSize,
        minHeight: props.beaconSize,
        background: props.isAbnormal ? 'orange' : props.isActive ? 'green' : 'red'
    }
}))`
    position: absolute;
    border-radius: 50%;
    z-index: 10;
`;

export default BeaconDiv;
