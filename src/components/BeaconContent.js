import BeaconDiv from './BeaconDiv';

const BeaconContent = ({ major, minor, beaconSize, isActive, message }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 40 + '%'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ margin: 10 }}>Beacon Status</h2>
                <BeaconDiv
                    top={0}
                    left={0}
                    beaconSize={beaconSize}
                    isActive={isActive}
                    style={{ position: 'relative' }}
                ></BeaconDiv>
            </div>
            <h3>{`major: ${major}  | minor: ${minor}`}</h3>
        </div>
        <div style={{ with: 60 + '%', marginLeft: 2 + 'rem', overflow: 'auto' }}>
            <pre>{message}</pre>
        </div>
    </div>
);

export default BeaconContent;
