import styled from 'styled-components';

const CameraDiv = styled.div.attrs(props => ({
    style: {
        top: props.top,
        left: props.left,
        transform: `rotate(${props.degree}deg)`
    }
}))`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default CameraDiv;
