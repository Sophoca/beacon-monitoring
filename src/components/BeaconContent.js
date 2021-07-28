import styled from 'styled-components';
import BeaconDiv from './BeaconDiv';

const StyledH3 = styled.h3`
    margin: 3px;
`;

const BeaconContent = ({ major, minor, beaconSize, isActive, message, isAbnormal }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            width: 100 + '%'
        }}
    >
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 2
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ flex: 1, margin: 10 }}>Beacon Status</h2>
                <BeaconDiv
                    top={0}
                    left={0}
                    beaconSize={beaconSize}
                    isActive={isActive}
                    isAbnormal={isAbnormal}
                    style={{ position: 'relative' }}
                ></BeaconDiv>
            </div>
            <div>
                <StyledH3>{`Major: ${major}`}</StyledH3>
                <StyledH3>{`Minor: ${minor}`}</StyledH3>
            </div>
        </div>
        <div
            style={{
                flex: 3,
                marginLeft: 2 + 'rem'
            }}
        >
            {message}
        </div>
    </div>
);

export default BeaconContent;
