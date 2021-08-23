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
    min-width: 630px;
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
        // url 정보만 추출
        const URLs = Object.values(slotURL).map(el => el.slotUrl);
        // 추출한 url을 동시에 get 요청
        const responses = await Promise.all(URLs.map(el => axios.get(el)));
        // API response에서 필요한 데이터만 lists에 저장
        setLists(responses.map(response => response.data.lists));
    };
    useEffect(() => {
        // 컴포넌트 로드 시, 실행
        getLists();
        // 10초마다 API 호출
        const interval = setInterval(() => getLists(), 10000);
        // 컴포넌트 해제 시, interval 해제
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    // 중복되는 시간 카운팅
    const calcTime = slotInfo =>
        slotInfo.reduce((obj, slot) => {
            obj[slot.modified_on] = (obj[slot.modified_on] || 0) + 1;
            return obj;
        }, {});

    // calcTime의 결과값에서 최신/오래된 시간 배열형태로 추출
    // 만약 시간 값이 하나밖에 없다면 배열의 2번째 값은 null
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
