import Modal from './Modal';
import React, { useState } from 'react';
import styled from 'styled-components';
import Streamedian from '../Streamedian';
const StyledDiv = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    align-items: center;
    width: 100%;
    height: 100%
    justify-content: center;
`;
const Camera = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <button
                className="beaconAPI-reload-btn"
                style={{
                    position: 'fixed',
                    top: 50,
                    left: 425 + 'px',
                    margin: 20 + 'px',
                    zIndex: 20
                }}
                onClick={openModal}
            >
                Live Streaming
            </button>
            {modalOpen && (
                <Modal
                    children={
                        <div>
                            <Streamedian
                                id="test"
                                url={
                                    'rtsp://admin:admin1234@218.153.209.100:501/cam/realmonitor?channel=8&subtype=1'
                                }
                            ></Streamedian>
                            <StyledDiv>
                                <button>button up</button>
                            </StyledDiv>
                        </div>
                    }
                    isLayoutScrollEnabled={true}
                    onClickClose={closeModal}
                ></Modal>
            )}
        </>
    );
};

export default Camera;
