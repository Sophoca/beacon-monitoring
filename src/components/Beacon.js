import React, { useState } from 'react';
import Modal from './Modal';
import BeaconDiv from './BeaconDiv';
import BeaconContent from './BeaconContent';

const Beacon = ({ top, left, beaconSize, isActive, major, minor, message }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <BeaconDiv
                top={top}
                left={left}
                beaconSize={beaconSize}
                isActive={isActive}
                isAbnormal={false}
                onClick={openModal}
            />
            {modalOpen && (
                <Modal
                    className="modal-popup"
                    children={
                        <BeaconContent
                            major={major}
                            minor={minor}
                            beaconSize={beaconSize}
                            isActive={isActive}
                            isAbnormal={false}
                            message={message}
                        ></BeaconContent>
                    }
                    isLayoutScrollEnabled={true}
                    onClickClose={closeModal}
                ></Modal>
            )}
        </>
    );
};

export default Beacon;
