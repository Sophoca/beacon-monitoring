import styled from 'styled-components';

const ParkingSpotDiv = styled.div.attrs(props => ({
    style: {
        top: props.top * props.heightRatio,
        left: props.left * props.heightRatio,
        width: props.size.width * props.heightRatio,
        height: props.size.height * props.heightRatio,
        borderRadius: props.size.radius * props.heightRatio,
        minWidth: props.beaconSize,
        minHeight: props.beaconSize,
        transform: `rotate(${props.rotate}deg)`
    }
}))`
    background-color: grey;
    position: absolute;
    transform-origin: top left;
    z-index: 80;
    opacity: 0.3;
    &:hover {
        background-color: red;
    }
`;

export default ParkingSpotDiv;
