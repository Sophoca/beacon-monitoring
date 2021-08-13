import React from 'react';

const Overview = ({ slotURL }) => {
    console.log(Object.keys(slotURL));
    return (
        <div>
            overview
            {Object.keys(slotURL).map(location => {
                return (
                    <div key={location}>
                        {location}: {slotURL[location]}
                    </div>
                );
            })}
        </div>
    );
};

export default Overview;
