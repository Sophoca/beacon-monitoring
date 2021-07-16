import React from 'react';
import './TodoItem.css';

const RestBeacon = ({ restKey }) => {
    return (
        <div className="todo-item">
            <div className="todo-text">
                <div>{restKey}</div>
            </div>
        </div>
    );
};

export default RestBeacon;
