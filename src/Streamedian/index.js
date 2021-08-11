import React from 'react';
import StreamedianPlayer from './StreamedianPlayer';
import styled from 'styled-components';

const PlayerDiv = styled.div.attrs(props => ({
    style: {
        border: '1px solid ' + (props.isActive ? 'blue' : 'black')
    }
}))`
    padding: 10px;
    width: 400px;
    height: 265px;
`;

const App = ({ id, camNum, url, onRemove, toggleCurrent, current }) => (
    <PlayerDiv
        className="player"
        onClick={() => {
            toggleCurrent(id);
        }}
        isActive={id == current}
    >
        {console.log('check', id == current)}
        {url && (
            <StreamedianPlayer id={id} camNum={camNum} url={url} remove={onRemove}>
                <source src={url} type="application/x-rtsp" />
            </StreamedianPlayer>
        )}
    </PlayerDiv>
);

export default App;
