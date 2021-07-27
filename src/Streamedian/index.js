import React from 'react';
import StreamedianPlayer from './StreamedianPlayer';
import './index.css';

const App = ({ url, id }) => (
    <div>
        <StreamedianPlayer id={id}>
            <source src={url} type="application/x-rtsp" />
        </StreamedianPlayer>
    </div>
);

export default App;
