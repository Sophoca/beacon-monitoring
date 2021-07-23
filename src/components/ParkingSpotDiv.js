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
    z-index: 10;
    &:hover {
        background-color: red;
    }
`;

export default ParkingSpotDiv;
