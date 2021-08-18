import React, { useState, useEffect } from 'react';
import axios from 'axios';

// async function getLists({ URLs }) {
//     axios.all(URLs.map(URL))
//     const response = await axios.get(URL);
//     return response.data;
// }

const Overview = ({ slotURL }) => {
    const [lists, setLists] = useState([]);
    const [data, setData] = useState([]);
    const slotLen = Object.keys(slotURL).length;

    const getLists = async () => {
        const URLs = Object.values(slotURL);
        const responses = await Promise.all(URLs.map(el => axios.get(el)));
        setLists(responses.map(response => response.data.lists));
    };
    useEffect(() => {
        getLists();
        // const interval = setInterval(() => getLists(), 10000);
        // return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    const calcTime = slotInfo => {
        const calc = slotInfo.reduce((obj, slot) => {
            obj[slot.modified_on] = (obj[slot.modified_on] || 0) + 1;
            return obj;
        }, {});
        console.log('calc', calc);
        // return [res[0], len > 1 ? res[len - 1] : null];
    };

    useEffect(() => {
        if (Object.keys(slotURL).length === lists.length) {
            const response = Object.keys(slotURL).map((location, idx) => ({
                location: location,
                data: calcTime(lists[idx])
            }));
            setData(response);
            console.log(response);
        }
    }, [slotURL, lists]);

    console.log('data', lists, slotLen);
    return (
        <div>
            overview
            {data.map(el => {
                return (
                    <div key={el.location}>
                        {el.location}: {el.data}
                    </div>
                );
            })}
        </div>
    );
};

export default Overview;
