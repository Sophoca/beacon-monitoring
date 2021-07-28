import React from 'react';
import StreamedianPlayer from './StreamedianPlayer';

const App = ({ id, url }) => (
    <div>
        <StreamedianPlayer id="test_video">
            {<source src={url} type="application/x-rtsp" />}
        </StreamedianPlayer>
    </div>
);

export default App;
