import React from 'react';
import StreamedianPlayer from './StreamedianPlayer';
import styled from 'styled-components';

const PlayerDiv = styled.div`
    padding: 10px;
    border: 1px solid black;
`;

const App = ({ id, url, remove }) => (
    <PlayerDiv
        className="player"
        onClick={() => {
            console.log('onClick', id);
        }}
    >
        <StreamedianPlayer id={id} url={url} remove={remove}>
            <source src={url} type="application/x-rtsp" />
        </StreamedianPlayer>
    </PlayerDiv>
);

export default App;
