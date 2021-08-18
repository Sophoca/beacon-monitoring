import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Overview = ({ slotURL }) => {
    const [lists, setLists] = useState([]);
    const [data, setData] = useState([]);

    const getLists = async () => {
        const URLs = Object.values(slotURL);
        const responses = await Promise.all(URLs.map(el => axios.get(el)));
        setLists(responses.map(response => response.data.lists));
    };
    useEffect(() => {
        getLists();
        console.log('slotURL', slotURL);

        // const interval = setInterval(() => getLists(), 10000);
        // return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);
    console.log('lists', lists);

    const calcTime = slotInfo =>
        slotInfo.reduce((obj, slot) => {
            obj[slot.modified_on] = (obj[slot.modified_on] || 0) + 1;
            return obj;
        }, {});

    const getTime = timeInfo => {
        const time = Object.keys(timeInfo).sort();
        return [time[0], time.length > 1 ? time[time.length - 1] : null];
    };

    useEffect(() => {
        if (Object.keys(slotURL).length === lists.length) {
            const response = Object.keys(slotURL).map((location, idx) => ({
                location: location,
                data: calcTime(lists[idx])
            }));
            setData(response);
            console.log('data', response);
        }
    }, [slotURL, lists]);

    return (
        <div style={{ display: 'flex', overflow: 'auto', flexDirection: 'column' }}>
            overview
            {/* {console.log(getChartData(data))} */}
        </div>
    );
};

export default Overview;
