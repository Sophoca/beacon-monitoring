import React from 'react';
import './TodoItem.css';

const RestBeacon = ({ restKey, msg }) => {
    return (
        <div className="todo-item" onClick={() => alert(msg)}>
            <div className="todo-text">
                <div>{restKey}</div>
            </div>
        </div>
    );
};

export default RestBeacon;
