import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import OverviewContent from '../components/OverviewContent';

const OverviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    padding: 20px;
    word-break: keep-all;
    min-width: 620px;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const Overview = ({ slotURL }) => {
    const [lists, setLists] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getLists = async () => {
        setIsLoading(true);
        const URLs = Object.values(slotURL).map(el => el.slotUrl);
        const responses = await Promise.all(URLs.map(el => axios.get(el)));
        setLists(responses.map(response => response.data.lists));
    };
    useEffect(() => {
        getLists();
        const interval = setInterval(() => getLists(), 10000);
        return () => clearInterval(interval);
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
        // lists(slotUrl로부터 받아온 data)와 지역 정보 통합
        if (Object.keys(slotURL).length === lists.length) {
            const response = Object.keys(slotURL).map((location, idx) => ({
                key: location,
                title: slotURL[location].title,
                data: getTime(calcTime(lists[idx]))
            }));
            setData(response);
            setIsLoading(false);
        }
    }, [slotURL, lists]);

    return (
        <OverviewContainer>
            <div>
                <TitleContainer>
                    <h3>Overview</h3>
                    {isLoading && <CircularProgress size={20} thickness={5} color="primary" />}
                </TitleContainer>
            </div>
            {data.map((el, idx) => (
                <OverviewContent key={idx} el={el} />
            ))}
        </OverviewContainer>
    );
};

export default Overview;
