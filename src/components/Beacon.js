import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const BeaconDiv = styled.div.attrs(props => ({
    style: {
        top: props.top,
        left: props.left,
        width: props.beaconSize,
        height: props.beaconSize,
        background: props.isActive ? 'green' : 'red'
    }
}))`
    position: absolute;
    border-radius: 50%;
    z-index: 10;
`;

const Beacon = props => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const content = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ margin: '0' }}>Beacon Status</h2>
                <h3 style={{ margin: '10' }}>
                    {' '}
                    {`major: ${props.major}  | minor: ${props.minor}`}
                </h3>
            </div>

            <pre>{props.message}</pre>
        </div>
    );
    return (
        <>
            <BeaconDiv
                top={props.top}
                left={props.left}
                beaconSize={props.beaconSize}
                isActive={props.isActive}
                onClick={openModal}
            />
            {modalOpen && (
                <Modal className={props.minor} children={content} onClickClose={closeModal}></Modal>
            )}
        </>
    );
};

export default Beacon;
