import Modal from './Modal';
import React, { useState } from 'react';
import Streamedian from '../Streamedian';

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
                    top: 0,
                    left: 425 + 'px',
                    margin: 20 + 'px',
                    zIndex: 20
                }}
                onClick={openModal}
            >
                Beacon
            </button>
            {modalOpen && (
                <Modal
                    children={
                        <div>
                            <Streamedian
                                id="test"
                                url={`rtsp://admin:admin1234@218.153.209.100:501/cam/realmonitor?channel=8&subtype=1`}
                            ></Streamedian>
                        </div>
                    }
                    onClickClose={closeModal}
                ></Modal>
            )}
        </>
    );
};

export default Camera;
