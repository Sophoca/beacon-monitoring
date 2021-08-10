import React from 'react';
import StreamedianPlayer from './StreamedianPlayer';

const App = ({ id, url, remove }) => (
    <div>
        <StreamedianPlayer id={id} url={url} remove={remove}>
            <source src={url} type="application/x-rtsp" />
        </StreamedianPlayer>
    </div>
);

export default App;
