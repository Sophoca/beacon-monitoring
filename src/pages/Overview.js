import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyResponsiveLine from '../components/MyResponsiveLine';

// async function getLists({ URLs }) {
//     axios.all(URLs.map(URL))
//     const response = await axios.get(URL);
//     return response.data;
// }

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
        // const interval = setInterval(() => getLists(), 10000);
        // return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    const calcTime = slotInfo =>
        slotInfo.reduce((obj, slot) => {
            obj[slot.modified_on.split(':')[0]] = (obj[slot.modified_on.split(':')[0]] || 0) + 1;
            // obj[slot.modified_on] = (obj[slot.modified_on] || 0) + 1;
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
            // console.log(response);
        }
    }, [slotURL, lists]);

    // const getChartData = timeInfo => {
    //     const response = timeInfo.map(el => {
    //         const data = Object.keys(el.data).map(el2 => ({ x: el2, y: el.data[el2] }));
    //         return { id: el.location, data: data };
    //     });
    //     console.log(response);
    //     return response;
    // };
    const getChartData = el => {
        const data = Object.keys(el.data).map(el2 => ({ x: el2, y: el.data[el2] }));
        return [{ id: el.location, data: data }];
    };

    // console.log('data', data);
    return (
        <div style={{ display: 'flex', overflow: 'auto', flexDirection: 'column' }}>
            overview
            {data.map(el => {
                return (
                    <div style={{ height: 500 + 'px' }}>
                        <MyResponsiveLine key={el.location} data={getChartData(el)}>
                            {/* {el.location}: {getTime(el.data)} */}
                        </MyResponsiveLine>
                    </div>
                );
            })}
            {/* {console.log(getChartData(data))} */}
            {/* <MyResponsiveLine data={getChartData(data)} /> */}
        </div>
    );
};

export default Overview;
