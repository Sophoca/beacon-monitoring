import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import StyledBackground from '../components/StyledBackground';
import { CircularProgress } from '@material-ui/core';
import OverviewContent from '../components/OverviewContent';

const OverviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    padding: 50px;
`;

const Overview = ({ slotURL }) => {
    const [lists, setLists] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getLists = async () => {
        setIsLoading(true);
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
                data: getTime(calcTime(lists[idx]))
            }));
            setData(response);
            setIsLoading(false);
            console.log('data', response);
        }
    }, [slotURL, lists]);

    console.log(isLoading);

    return isLoading ? (
        <StyledBackground>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress color="inherit" />
                <p>Overview</p>
            </div>
        </StyledBackground>
    ) : (
        <OverviewContainer>
            {data.map(el => (
                <OverviewContent el={el} />
            ))}
        </OverviewContainer>
    );
};

export default Overview;
