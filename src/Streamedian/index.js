import React from 'react';
import StreamedianPlayer from './StreamedianPlayer';
import styled from 'styled-components';

const PlayerDiv = styled.div.attrs(props => ({
    style: {
        border: '2px solid ' + (props.isActive ? 'rgba(63, 81, 181, 0.4)' : 'black')
    }
}))`
    padding: 10px;
    width: 400px;
    height: 265px;
    z-index: 80;
    &:hover {
        background-color: rgba(63, 81, 181, 0.2);
    }
`;

const App = ({ id, camNum, url, onRemove, toggleCurrent, current }) => (
    <PlayerDiv
        className="player"
        onClick={() => {
            toggleCurrent(id);
        }}
        // eslint-disable-next-line
        isActive={Number(id) === current}
    >
        {/* {console.log('check', id == current)} */}
        {url && (
            <StreamedianPlayer id={id} camNum={camNum} url={url} remove={onRemove}>
                <source src={url} type="application/x-rtsp" />
            </StreamedianPlayer>
        )}
    </PlayerDiv>
);

export default App;
