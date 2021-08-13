import React, { useState, useEffect } from 'react';
import axios from 'axios';

// async function getLists({ URLs }) {
//     axios.all(URLs.map(URL))
//     const response = await axios.get(URL);
//     return response.data;
// }

const Overview = ({ slotURL }) => {
    const [lists, setLists] = useState([]);

    const getLists = async () => {
        const URLs = Object.values(slotURL);
        const promises = URLs.map(el => axios.get(el));
        const responses = await Promise.all(promises);
        setLists(responses.map(response => response.data.lists));
    };
    useEffect(() => {
        getLists();
    }, []);
    // console.log(slotURL['Cheonho']);
    // Promise.all(Object.values(slotURL).map(url => fetch(url)))
    //     .then(responses => {
    //         Promise.all(responses.map(response => response.json()));
    //     })
    //     .then(data => setData(data))
    //     .catch(e => console.log(e));

    // useEffect(() => {
    //     (async () => {
    //         // const locations = Object.keys(slotURL);
    //         const data1 = getLists(slotURL['Cheonho']);
    //         const data2 = await axios.get('https://jsonplaceholder.typicode.com/todos/2');
    //         setData({ data1, data2 });
    //     })();
    // }, []);

    console.log('data', lists);
    return (
        <div>
            overview
            {/* {Object.keys(slotURL).map(location => {
                return (
                    <div key={location}>
                        {location}: {slotURL[location]}
                    </div>
                );
            })} */}
        </div>
    );
};

export default Overview;
