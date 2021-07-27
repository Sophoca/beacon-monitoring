import React, { useState } from 'react';
import Modal from './Modal';
import BeaconContent from './BeaconContent';
import './TodoItem.css';

const RestBeacon = ({ major, minor, beaconSize, msg }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            <div className="todo-item" onClick={openModal}>
                <div>{major}</div>
                <div>{minor}</div>
            </div>
            {modalOpen && (
                <Modal
                    children={
                        <BeaconContent
                            major={major}
                            minor={minor}
                            beaconSize={beaconSize}
                            isAbnormal={true}
                            message={msg}
                        ></BeaconContent>
                    }
                    onClickClose={closeModal}
                ></Modal>
            )}
        </>
    );
};

export default RestBeacon;
