import React from 'react';
import StreamedianPlayer from './StreamedianPlayer';

const App = ({ id, url }) => (
    <div>
        <StreamedianPlayer id={id} url={url}>
            {<source src={url} type="application/x-rtsp" />}
        </StreamedianPlayer>
    </div>
);

export default App;
