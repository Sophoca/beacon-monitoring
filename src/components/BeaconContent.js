import styled from 'styled-components';
import BeaconDiv from './BeaconDiv';

const StyledH3 = styled.h3`
    margin: 3px;
`;

const BeaconContent = ({ major, minor, beaconSize, isActive, message, isAbnormal }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 35 + '%'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ margin: 10 }}>Beacon Status</h2>
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
                <StyledH3>{`major: ${major}`}</StyledH3>
                <StyledH3>{`minor: ${minor}`}</StyledH3>
            </div>
        </div>
        <div
            style={{
                width: 60 + '%',
                marginLeft: 2 + 'rem'
            }}
        >
            {message}
        </div>
    </div>
);

export default BeaconContent;
